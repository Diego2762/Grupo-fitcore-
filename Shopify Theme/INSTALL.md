# FitCore Store · Guía de instalación del tema

Código del website B2C para Shopify (cuenta `rkytuq-2h.myshopify.com`), construido para pegarse sobre un tema base **Dawn**. Cada archivo trae sus propias instrucciones. Tú controlas qué se publica.

## Antes de empezar (una sola vez)
1. **Instala el tema Dawn** (si no lo tienes): Online Store > Themes > Add theme > buscar "Dawn" > Add. Trabaja sobre una copia, no sobre el tema live, hasta que estés conforme: en el tema, botón "..." > Duplicate.
2. **Editor de código**: Online Store > Themes > en tu tema, "..." > **Edit code**. Ahí pegas los archivos.

---

## 1. Sección de inicio (homepage) — `sections/fitcore-home.liquid`
Una sola sección con todo el inicio: hero, beneficios, categorías, "¿Cómo comprar?", envíos, pagos y ubicación.

**Instalar:**
1. Edit code > carpeta **Sections** > **Add a new section** > nombre: `fitcore-home` (sin `.liquid`, Shopify lo agrega).
2. Borra el contenido por defecto que crea Shopify y pega **todo** el contenido de `Shopify Theme/sections/fitcore-home.liquid`. Guardar.
3. Ponla en la home: Online Store > Themes > **Customize** > arriba selecciona la plantilla **Home page** > **Add section** > busca **"FitCore Inicio"** > agrégala. Sube/baja para ordenarla y elimina las secciones de Dawn que no quieras.
4. Edita textos, número de WhatsApp y colores desde el panel derecho del editor. Guardar.

> Las tarjetas de categoría enlazan a `/collections/proteinas`, `/aminoacidos`, `/pre-entrenos`, `/vitaminas`, `/salud-y-bienestar`, `/accesorios`. Esas colecciones ya existen en tu tienda.

---

## 2. Página de categoría — `sections/fitcore-collection-banner.liquid` + `templates/collection.json`
Banner de marca arriba (breadcrumb + título + descripción de la categoría) y debajo la grilla de productos de Dawn con **filtros en la barra lateral izquierda**.

**Instalar:**
1. Edit code > **Sections** > **Add a new section** > nombre: `fitcore-collection-banner` > borra lo de Shopify y pega `Shopify Theme/sections/fitcore-collection-banner.liquid`. Guardar.
2. Edit code > **Templates** > abre `collection.json` (si no existe, **Add a new template** > tipo `collection` > formato `json`). Reemplaza TODO su contenido por `Shopify Theme/templates/collection.json`. Guardar.
3. Listo: todas las páginas de categoría (`/collections/proteinas`, etc.) usan este diseño. El banner toma solo el título y la descripción de cada colección, así que sirve para las 6 por igual.

> Los filtros laterales (`filter_type: vertical`) aparecen automáticamente cuando las colecciones tengan productos con variantes/etiquetas. Mientras no haya productos, la barra de filtros se ve vacía: es normal.

---

## 3. Página de producto — `sections/fitcore-product-fit.liquid` + `templates/product.json`
Galería con zoom/lightbox, selección de variante en botones, comprar, descripción, compartir, productos relacionados, y debajo el **mini-dashboard "Conveniencia por objetivo"** (Keto / Definición / Volumen / Mantenimiento), con la misma lógica que el website estático.

**Instalar:**
1. Edit code > **Sections** > **Add a new section** > nombre: `fitcore-product-fit` > borra lo de Shopify y pega `Shopify Theme/sections/fitcore-product-fit.liquid`. Guardar.
2. Edit code > **Templates** > abre `product.json` (o **Add a new template** > tipo `product` > `json`). Reemplaza TODO por `Shopify Theme/templates/product.json`. Guardar.

**Cargar los macros (para que aparezca el dashboard):**
- Ya creé en tu tienda los campos de producto (metafields, namespace `fitcore`): **Calorías, Proteína, Carbohidratos, Azúcar, Grasa, Tamaño de porción, Servicios por envase** (todos por servicio).
- Al editar un producto, baja a la sección **Metafields** y llena esos campos con los datos verificados de la etiqueta.
- El dashboard solo se muestra si el producto tiene al menos Calorías / Proteína / Carbohidratos cargados. Sin datos, simplemente no aparece (no se rompe nada).
- NUNCA inventes macros: usa solo los de la tabla nutricional real del envase.

---

## 4. Carrito — `sections/fitcore-cart-help.liquid` + `templates/cart.json`
Carrito nativo de Dawn (con nota de pedido y botón de checkout) y debajo una banda de confianza con marca: métodos de pago, opciones de envío y botón de ayuda por WhatsApp.

**Instalar:**
1. Edit code > **Sections** > **Add a new section** > nombre: `fitcore-cart-help` > borra lo de Shopify y pega `Shopify Theme/sections/fitcore-cart-help.liquid`. Guardar.
2. Edit code > **Templates** > abre `cart.json` (o **Add a new template** > tipo `cart` > `json`). Reemplaza TODO por `Shopify Theme/templates/cart.json`. Guardar.

> El checkout al que lleva el botón es el nativo de Shopify (ver límites de Basic abajo). El número de WhatsApp se edita desde el editor de temas en la sección "FitCore Ayuda carrito".

---

## 5. Páginas de contenido — Cómo comprar · Envíos · Nosotros · FAQ
Las 4 páginas **ya están creadas y publicadas** en tu tienda (Admin > Online Store > Pages), cada una con su plantilla asignada. El menú principal y el footer **ya apuntan a ellas**. Solo falta instalar las secciones y plantillas para que tengan el diseño de marca.

**Secciones a crear** (Edit code > Sections > Add a new section, pega el archivo del mismo nombre):
- `fitcore-como-comprar`  ← `Shopify Theme/sections/fitcore-como-comprar.liquid`
- `fitcore-faq`           ← `Shopify Theme/sections/fitcore-faq.liquid`
- `fitcore-page`          ← `Shopify Theme/sections/fitcore-page.liquid` (sirve para Envíos y Nosotros)

**Plantillas a crear** (Edit code > Templates > Add a new template > tipo `page` > formato `json`; el nombre debe ser EXACTO):
- `page.como-comprar.json` ← contenido de `Shopify Theme/templates/page.como-comprar.json`
- `page.faq.json`          ← `Shopify Theme/templates/page.faq.json`
- `page.envios.json`       ← `Shopify Theme/templates/page.envios.json`
- `page.nosotros.json`     ← `Shopify Theme/templates/page.nosotros.json`

> Las páginas ya tienen asignada su plantilla (`como-comprar`, `faq`, `envios`, `nosotros`). Apenas crees los archivos de plantilla con esos nombres, cada página toma su diseño automáticamente. Antes de eso, la página se ve con el texto simple de respaldo (no se rompe).

## Navegación (ya configurada en tu tienda)
- **Menú principal:** Inicio · Tienda (con las 6 categorías) · Cómo comprar · Envíos · Nosotros · FAQ.
- **Footer:** columna Categorías (6) · columna Ayuda (Cómo comprar, Envíos, FAQ) · columna Fitcore Store (Sobre nosotros).
- Se editan en Admin > Online Store > Navigation.

---

## Límites del plan Basic (importante)
- El **checkout de 4 pasos** de la referencia NO se puede personalizar en Shopify Basic (requiere Shopify Plus o apps de checkout). El checkout nativo de Shopify es el que se usa.
- **Precio dual USD/Bs** a tasa BCV+25% necesita una app de conversión o código adicional. Lo vemos aparte.
- **Métodos de pago manuales** (Zelle, USDT, Pago Móvil, transferencia, efectivo): se activan en Settings > Payments > Manual payment methods. No se configuran por código. Los textos listos para pegar (nombre, detalles e instrucciones de cada método) están en `Shopify Theme/PAGOS.md`.

## Pendientes de esta carpeta (próximas entregas)
- [x] Página de categoría con filtros laterales (banner + plantilla de colección).
- [x] Página de producto con mini-dashboard de conveniencia.
- [x] Carrito con banda de confianza.
- [x] Páginas: Cómo comprar, Envíos, Nosotros, FAQ (creadas en la tienda + diseño).
- [x] Menú de navegación y footer (configurados en la tienda).
