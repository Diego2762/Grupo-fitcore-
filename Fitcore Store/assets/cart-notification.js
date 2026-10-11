class CartNotification extends HTMLElement {
  constructor() {
    super();

    this.notification = document.getElementById('cart-notification');
    this.header = document.querySelector('sticky-header');
    this.onBodyClick = this.handleBodyClick.bind(this);

    this.notification.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
    this.querySelectorAll('button[type="button"]').forEach((closeButton) =>
      closeButton.addEventListener('click', this.close.bind(this))
    );

    // Cierre automático: el banner se oculta solo pasados unos segundos.
    // Si el cliente pasa el mouse por encima, se pausa para que pueda leer/hacer clic.
    this.autoCloseDelay = 2500;
    this.autoCloseTimer = null;
    this.notification.addEventListener('mouseenter', () => this.cancelAutoClose());
    this.notification.addEventListener('mouseleave', () => this.scheduleAutoClose(2000));
  }

  scheduleAutoClose(delay) {
    this.cancelAutoClose();
    this.autoCloseTimer = setTimeout(() => this.close(), delay || this.autoCloseDelay);
  }

  cancelAutoClose() {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
      this.autoCloseTimer = null;
    }
  }

  open() {
    this.notification.classList.add('animate', 'active');

    this.notification.addEventListener(
      'transitionend',
      () => {
        this.notification.focus();
        trapFocus(this.notification);
      },
      { once: true }
    );

    document.body.addEventListener('click', this.onBodyClick);

    this.dispatchCartViewEvent();
    this.updateFreeShip();
    this.scheduleAutoClose();
  }

  // Muestra dentro del banner el progreso hacia el envío gratis local.
  // Al superar el umbral avisa que el cliente ya lo tiene.
  async updateFreeShip() {
    const bar = document.getElementById('cart-notification-freeship');
    if (!bar) return;
    const threshold = parseInt(bar.getAttribute('data-threshold'), 10) || 4500;
    try {
      const response = await fetch(`${routes.cart_url}.js`);
      const cart = await response.json();
      const total = cart.total_price; // en centavos
      const money = (cents) => '$' + (cents / 100).toFixed(2);
      if (total >= threshold) {
        bar.classList.add('is-free');
        bar.innerHTML =
          '<span class="cart-notification-freeship__check">&#10003;</span> ' +
          '<span>&iexcl;Genial! Ya tienes <b>env&iacute;o gratis</b> en Valera.</span>';
      } else {
        bar.classList.remove('is-free');
        bar.innerHTML =
          '<span>Te faltan <b>' +
          money(threshold - total) +
          '</b> para <b>env&iacute;o gratis</b> local en Valera.</span>';
      }
      bar.hidden = false;
      this.updatePromo3x2(cart);
    } catch (e) {
      // informativo; si falla, no mostramos la barra
    }
  }

  // Banner "Lleva 3, paga solo 2" (Nature's Bounty) con cuenta regresiva. Solo existe si la promo esta activa.
  updatePromo3x2(cart) {
    const box = document.getElementById('cart-notification-3x2');
    if (!box) return;
    let n = 0;
    (cart.items || []).forEach((i) => {
      if (i.vendor === "Nature's Bounty") n += i.quantity;
    });
    clearInterval(this.promoTimer);
    if (!n) {
      box.hidden = true;
      return;
    }
    const r = n % 3;
    const msg = box.querySelector('[data-3x2-msg]');
    const btn = box.querySelector('[data-3x2-btn]');
    if (r === 0) {
      msg.textContent = '¡Lo tienes! Cada grupo de 3 te sale por el precio de 2.';
      btn.textContent = 'Agregar otro grupo';
    } else if (r === 1) {
      msg.textContent = 'Agrega 2 más y llévate 3 pagando solo 2.';
      btn.textContent = 'Ver elegibles';
    } else {
      msg.textContent = '¡Te falta 1! Agrégalo y paga solo 2 de los 3.';
      btn.textContent = 'Agregar 1 más';
    }
    box.hidden = false;
    const end = new Date(box.getAttribute('data-end')).getTime();
    const clock = box.querySelector('[data-3x2-time]');
    const pad = (x) => (x < 10 ? '0' : '') + x;
    const paint = () => {
      const d = end - Date.now();
      if (isNaN(end) || d <= 0) {
        clock.textContent = '';
        return;
      }
      const days = Math.floor(d / 864e5);
      const h = Math.floor((d % 864e5) / 36e5);
      const m = Math.floor((d % 36e5) / 6e4);
      const sec = Math.floor((d % 6e4) / 1e3);
      clock.textContent = 'Termina en ' + (days ? days + 'd ' : '') + pad(h) + ':' + pad(m) + ':' + pad(sec);
    };
    paint();
    this.promoTimer = setInterval(paint, 1000);
  }

  // The notification's outer element is server-rendered once at page load, so
  // its `cart` Liquid object reflects the pre-add state. The morphed children
  // (inserted from the /cart/add.js sections response in renderContents) are
  // post-add, but they don't expose the full cart shape we need for the event
  // payload. So we keep an explicit /cart.json fetch on open. Migrating to the
  // factory + filter would require re-rendering the notification element
  // itself in sections, which is out of scope for this PR.
  async dispatchCartViewEvent() {
    const { CartViewEvent } = window.StandardEvents || {};
    if (!CartViewEvent) return;

    try {
      const response = await fetch(`${routes.cart_url}.json`);
      const cart = await response.json();
      if (!cart?.currency) return;

      this.dispatchEvent(
        new CartViewEvent({
          context: 'dialog',
          cart: CartViewEvent.createCartFromAjaxResponse(cart),
        })
      );
    } catch (e) {
      // cart:view is informational; swallow fetch errors
    }
  }

  close() {
    this.cancelAutoClose();
    this.notification.classList.remove('active');
    document.body.removeEventListener('click', this.onBodyClick);

    removeTrapFocus(this.activeElement);
  }

  renderContents(parsedState) {
    this.cartItemKey = parsedState.key;
    this.getSectionsToRender().forEach((section) => {
      document.getElementById(section.id).innerHTML = this.getSectionInnerHTML(
        parsedState.sections[section.id],
        section.selector
      );
    });

    if (this.header) this.header.reveal();
    this.open();
  }

  getSectionsToRender() {
    return [
      {
        id: 'cart-notification-product',
        selector: `[id="cart-notification-product-${this.cartItemKey}"]`,
      },
      {
        id: 'cart-notification-button',
      },
      {
        id: 'cart-icon-bubble',
      },
    ];
  }

  getSectionInnerHTML(html, selector = '.shopify-section') {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  handleBodyClick(evt) {
    const target = evt.target;
    if (target !== this.notification && !target.closest('cart-notification')) {
      const disclosure = target.closest('details-disclosure, header-menu');
      this.activeElement = disclosure ? disclosure.querySelector('summary') : null;
      this.close();
    }
  }

  setActiveElement(element) {
    this.activeElement = element;
  }
}

customElements.define('cart-notification', CartNotification);
