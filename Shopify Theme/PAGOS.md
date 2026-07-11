# FitCore Store · Métodos de pago manuales (textos para el checkout)

Shopify Basic no tiene pasarela automática, así que se usan **métodos de pago manuales**. El cliente elige uno en el checkout, hace el pago por su cuenta y luego confirma. Aquí están los textos listos para pegar.

## Dónde se configura
Admin > **Settings** > **Payments** > sección **Manual payment methods** > **Add manual payment method** > **Create custom payment method**.

Cada método tiene 3 campos:
- **Custom payment method name**: el nombre que ve el cliente.
- **Additional details**: se muestra en el checkout al elegir el método (instrucciones para pagar).
- **Payment instructions**: se muestra en la página de confirmación del pedido (qué hacer después de comprar).

> IMPORTANTE: reemplaza cada `[PLACEHOLDER]` con tus datos reales antes de publicar. No publiques con placeholders.

---

## 1. Zelle (USD)
**Nombre:** Zelle (dólares)

**Additional details:**
```
Paga en dólares por Zelle a:
Titular: [PLACEHOLDER NOMBRE]
Correo / teléfono Zelle: [PLACEHOLDER]
Monto: el total de tu pedido en USD.
Al finalizar, te escribimos por WhatsApp para confirmar el pago y coordinar la entrega.
```

**Payment instructions:**
```
¡Gracias por tu pedido! Para completarlo:
1. Envía el monto total por Zelle a [PLACEHOLDER correo/teléfono] (Titular: [PLACEHOLDER NOMBRE]).
2. Envíanos el comprobante por WhatsApp al +58 424 621-8863, indicando tu número de pedido.
3. Verificamos el pago y despachamos. Tiempo de verificación: [PLACEHOLDER, ej: hasta 1 hora hábil].
```

---

## 2. Pago Móvil (Bs)
**Nombre:** Pago Móvil (bolívares)

**Additional details:**
```
Paga en bolívares por Pago Móvil a:
Banco: [PLACEHOLDER]
Teléfono: [PLACEHOLDER]
Cédula / RIF: [PLACEHOLDER]
El monto en bolívares se calcula a la tasa del día. Te confirmamos el monto exacto por WhatsApp antes de pagar.
```

**Payment instructions:**
```
¡Gracias por tu pedido! Para completarlo:
1. Escríbenos por WhatsApp al +58 424 621-8863 con tu número de pedido para confirmar el monto en bolívares a la tasa del día.
2. Realiza el Pago Móvil a: Banco [PLACEHOLDER], Teléfono [PLACEHOLDER], Cédula/RIF [PLACEHOLDER].
3. Envíanos la captura por WhatsApp. Verificamos y despachamos.
```

---

## 3. Transferencia bancaria (Bs)
**Nombre:** Transferencia bancaria (bolívares)

**Additional details:**
```
Transferencia en bolívares a:
Banco: [PLACEHOLDER]
Tipo de cuenta: [PLACEHOLDER]
Número de cuenta: [PLACEHOLDER]
Titular: [PLACEHOLDER]
Cédula / RIF: [PLACEHOLDER]
El monto se calcula a la tasa del día. Te confirmamos el total por WhatsApp.
```

**Payment instructions:**
```
¡Gracias por tu pedido! Para completarlo:
1. Escríbenos por WhatsApp al +58 424 621-8863 con tu número de pedido para confirmar el monto a la tasa del día.
2. Transfiere a la cuenta indicada (Banco [PLACEHOLDER], Cuenta [PLACEHOLDER], Titular [PLACEHOLDER]).
3. Envíanos el comprobante por WhatsApp. Verificamos y despachamos.
```

---

## 4. USDT (cripto)
**Nombre:** USDT (criptomoneda)

**Additional details:**
```
Paga con USDT:
Red: [PLACEHOLDER, ej: TRC20]
Dirección de billetera: [PLACEHOLDER]
Monto: el total de tu pedido en USD (1 USDT = 1 USD).
Confirma siempre la red antes de enviar. Te asistimos por WhatsApp.
```

**Payment instructions:**
```
¡Gracias por tu pedido! Para completarlo:
1. Envía el total en USDT por la red [PLACEHOLDER] a la dirección [PLACEHOLDER].
2. Envíanos el hash o captura de la transacción por WhatsApp al +58 424 621-8863 con tu número de pedido.
3. Verificamos en la red y despachamos.
```

---

## 5. Efectivo / Retiro en el kiosco
**Nombre:** Efectivo (retiro en tienda)

**Additional details:**
```
Paga en efectivo al retirar tu pedido en nuestro kiosco del CC Plaza, Valera.
Aceptamos dólares y bolívares. Te avisamos por WhatsApp cuando tu pedido esté listo para retirar.
```

**Payment instructions:**
```
¡Gracias por tu pedido! Lo preparamos para retiro en el kiosco del CC Plaza, Valera.
1. Te escribimos por WhatsApp al +58 424 621-8863 cuando esté listo.
2. Pasa a retirarlo y paga en efectivo (dólares o bolívares).
Horario de atención: [PLACEHOLDER].
```

---

## Recomendado: activar "Pago al confirmar" en el checkout
Con métodos manuales, el cliente completa el pedido SIN pagar en línea y queda como **pendiente**. El flujo real (coordinar monto en Bs a la tasa, recibir captura, verificar) ocurre por WhatsApp. Por eso todos los textos remiten al WhatsApp +58 424 621-8863.

## Pendientes que dependen de ti (datos reales)
- Cuenta Zelle (titular + correo/teléfono).
- Datos Pago Móvil (banco, teléfono, cédula/RIF).
- Cuenta bancaria en bolívares (banco, número, titular, RIF).
- Billetera USDT (red + dirección).
- Horario de atención del kiosco.
- Tasa de cambio que usarás (BCV, BCV+%, paralelo) y cómo la comunicas.
