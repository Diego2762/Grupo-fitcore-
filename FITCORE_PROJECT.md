# Grupo FitCore — Contexto del Proyecto para Claude Code

> **Última actualización:** 25 junio 2026  
> Este archivo sirve como brief maestro para cualquier trabajo de desarrollo en los sistemas digitales de Grupo FitCore. Léelo completo antes de empezar cualquier tarea de programación.

---

## 1. Estructura del Negocio (Holding)

**Grupo FitCore** es un holding con dos líneas de negocio:

| Empresa | Tipo | Estado |
|---|---|---|
| **Distribuidora FitCore** | B2B mayorista | Prioridad inmediata — lanzar en ~5 meses desde jun 2026 |
| **FitCore Stores** | Retail B2C (kioscos físicos + online) | Segunda fase |

**Fitcore Group LLC (EE.UU.)** — Entidad en US que maneja cuentas bancarias en dólares, facilita importaciones y permite transacciones internacionales. Evita las limitaciones del sistema financiero venezolano.

**Primera tienda física:** Kiosco en CC Plaza Valera, Estado Trujillo, Venezuela.

**Modelo de envíos retail:** Entrega mismo día en ciudades con tienda física. Envío nacional vía MRW y Tealca.

---

## 2. Tech Stack Acordado

| Herramienta | Uso |
|---|---|
| **CloudCode** | Desarrollo de portales B2B y B2C |
| **CloudDesign** | Interfaces y diseño |
| **Google Workspace** | Documentos, Drive, correo |
| **Asana** | Gestión de operaciones |
| **Supabase** | Base de datos (PostgreSQL) |
| **Next.js / React** | Framework frontend recomendado |
| **PWA** | App móvil (basada en el website) — ver sección 6 |

---

## 3. Sistema #1 — Portal B2B (Distribuidora FitCore)

### Descripción
Portal exclusivo para clientes mayoristas (farmacias, tiendas de suplementos, gimnasios, revendedores). No es público. Los clientes se registran/aprueban manualmente.

### Funcionalidades requeridas

**Portal del cliente (frontend):**
- Catálogo online con fotos, descripciones, precios mayoristas por volumen
- Inventario en tiempo real (disponible / agotado / próxima llegada)
- Carrito de compras B2B con cantidades mínimas
- Checkout con generación automática de factura PDF
- Dashboard del cliente: historial de órdenes, estado de envío, cuenta corriente
- Perfil editable: datos de empresa, RIF/NIT, contacto, dirección de entrega

**Panel de administración (backend):**
- Gestión de clientes (aprobar, suspender, editar condiciones)
- Gestión de inventario (stock, costos, precios, variantes de presentación)
- Gestión de órdenes (crear, editar, marcar enviado, cancelar)
- Generación de facturas PDF (formato venezolano con RIF, datos fiscales)
- Dashboard de métricas: ventas, clientes activos, productos top
- Integración con Asana (crear tarea automáticamente al recibir orden)
- Exportación a Google Sheets (reporte semanal de órdenes)

### Pagos aceptados
- Wire transfer a cuenta de **Fitcore Group LLC** (US) — principal para clientes grandes
- Transferencia o pago en efectivo en Venezuela (fuera del sistema bancario formal)
- **No hay pasarela de pago online en la primera fase** — el sistema registra la orden, el pago se confirma manualmente

### Estructura de precios
- Precios en USD
- Posibles niveles de descuento por volumen (definir con el equipo)
- Mínimo de compra por definir

---

## 4. Sistema #2 — FitCore Store (Retail B2C)

### Descripción
Tienda online pública + app para consumidores finales. Vende suplementos deportivos y vitaminas al detal. Se complementa con las tiendas físicas (kioscos).

### Funcionalidades requeridas

**Tienda online / app:**
- Catálogo público con filtros por categoría (proteínas, creatina, vitaminas, pre-workout, etc.)
- Buscador de productos
- Fichas de producto con fotos, descripción, ingredientes, precios en USD y/o Bs
- Carrito + checkout
- Selección de método de entrega:
  - **Entrega mismo día** (disponible si hay tienda física en la ciudad del cliente)
  - **Envío nacional** vía MRW o Tealca
- Rastreo básico del pedido (confirmado → preparando → enviado → entregado)
- Registro de usuario / perfil de cliente
- Historial de compras

**Panel de administración:**
- Gestión de productos y stock
- Gestión de órdenes (igual que B2B pero para detal)
- Reportes de ventas

### Pagos aceptados (B2C)
- Pago móvil Venezuela (Zelle venezolano)
- Transferencia bancaria Venezuela
- Divisas (efectivo o Zelle US)
- A futuro: posible integración con Cashea (BNPL venezolano — competidor FUSFIT lo usa)

---

## 5. Base de Datos (Supabase)

### Tablas principales sugeridas

```
products          → SKU, nombre, marca, categoría, presentación, stock, costo_usd, precio_detal, precio_mayor
brands            → id, nombre, país_origen, sitio_web, distribuidor_us
categories        → id, nombre, slug
orders            → id, tipo (b2b/b2c), cliente_id, fecha, estado, total_usd, factura_pdf_url
order_items       → orden_id, product_id, cantidad, precio_unitario
clients_b2b       → id, empresa, rif, contacto, email, tel, ciudad, estado, aprobado, nivel_descuento
clients_b2c       → id, nombre, email, tel, ciudad, dirección
inventory_log     → product_id, fecha, tipo (entrada/salida/ajuste), cantidad, notas
```

### Consideraciones
- Supabase ofrece autenticación built-in (usar para ambos portales)
- Row Level Security (RLS) para separar data B2B vs B2C
- Storage para fotos de productos y facturas PDF

---

## 6. App Móvil — Enfoque PWA

### Recomendación: Progressive Web App (PWA)

**No se necesita construir una app nativa separada.** El website de FitCore Store (Next.js) se convierte en PWA con:
- `manifest.json` — nombre, ícono, colores de la app
- Service Worker — caché offline, push notifications
- HTTPS — requerido (Vercel lo provee automáticamente)

**Resultado:** Los usuarios pueden instalar la "app" directamente desde el browser (Chrome/Safari) sin pasar por App Store ni Google Play. Se comporta como app nativa: ícono en pantalla de inicio, pantalla de carga, modo sin barra de navegador.

**Ventajas para FitCore:**
- Un solo codebase para web + app
- Sin comisión del 30% de Apple/Google
- Sin proceso de aprobación de tiendas
- Actualizaciones instantáneas
- Costo de desarrollo ~40-50% menor que app nativa

**Cuándo considerar app nativa (React Native/Expo):**
- Si se necesita acceso a cámara para scanner de barras
- Si se quieren push notifications más robustas en iOS
- Si la base de usuarios crece y pide la app en las tiendas oficiales

**Stack recomendado para PWA:**
```
Next.js 14+ (App Router)
Tailwind CSS
Supabase (auth + DB + storage)
next-pwa (librería para service worker)
Vercel (hosting)
```

---

## 7. Información de Mercado — Venezuela

### Competidores principales (Caracas / Valencia)

| Competidor | Mínimo Mayor | Fortaleza |
|---|---|---|
| Suplementos Venezuela | $2,500 | Volumen, 25% dto divisas |
| FUSFIT | $500 | Rep. ZUMUB, Cashea, SEO fuerte |
| Energy Fit / Supl. Valencia | $200 | Mejor precio mayor del mercado |
| SuplemFit C.A. | 100 productos | Acepta BCV |
| Fitlab | Solo detal | Vendedor autorizado MuscleTech |
| SuplemVE (Valencia) | N/D | Mejor precio detal del mercado |
| Total Supplements VE | N/D | Solo detal, Caracas |

### Sobreprecios Venezuela vs US Retail (ciudades del interior)
- Vitaminas (Centrum): +85% a +175%
- Creatina: +40% a +90%
- Proteínas Whey: +45% a +80%
- Isolates: +44% a +93%
- Mass Gainers: hasta +255%

### SEO — Oportunidad
- Competencia "Baja" en casi todas las keywords de suplementos en Venezuela
- FUSFIT domina orgánicamente pero es vulnerable
- Keywords de mayor volumen: "vitaminas" (~50K/mes), "creatina" (~5K/mes), "proteína para gym" (~1K/mes)
- Palabras B2B (distribuidora, mayor, proveedor) tienen competencia prácticamente nula

### Marcas sin presencia en Venezuela (oportunidad de distribución exclusiva)
- Create Wellness (Creatine Gummies) — $46.8M/año Amazon
- Bloom Nutrition (Energy Drinks) — $67.9M/año Amazon
- Liquid I.V. — $119M/año Amazon
- LMNT — $116M/año Amazon
- Ghost (Energy/Pre-workout) — $65.8M/año Amazon
- Sports Research — $261M/año Amazon
- Natrol (Vitaminas) — $49.2M/año Amazon

---

## 8. Distribuidores US — Estado de Contacto (jun 2026)

| Distribuidor | Marcas principales | Status |
|---|---|---|
| SND (Sports Nutrition Distributors) | MuscleTech, Dymatize, C4, BSN, ON | Contactado 20/06 |
| NYB Distributors | Variadas | Contactado 20/06 |
| Distribution Gate | MuscleTech, NOW, Redcone1 | Contactado 21/06 |
| **Muscle Food USA** | Bucked Up, Dymatize, Celsius | **✅ Cuenta aperturada 21/06** |

**Próximo paso:** Recibir listas de precios de los 3 distribuidores pendientes para calcular márgenes reales.

---

## 9. Archivos Clave en Google Drive

| Archivo | Drive ID |
|---|---|
| Estudio Caracas/Valencia (crudo agencia) | `1uV-QVQTSaXVNh3ef2vBl6soTc8-Ad7ZQ` |
| Competidores — Tabla Maestra | `1Ym2SRpozguuYkLjXTY8y7WB-v2gZmwouFxFy3A5vi7Q` |
| Mérida/Valera vs US Retail | `18wzgJbVCOGBHeu4aSYRGEmxsBioGqlg34ceuSVUwXHA` |
| Marcas US — Análisis Amazon | `1E4ZWccmENp8zgr3YSO_yyR4P41bibiFPjurDMyvOp88` |
| Distribuidores US | `1f8ItiOx7zXI59P6VfYlNrA2JGnIld6zZrVzkPjYFxOA` |

**Carpeta principal Drive:** https://drive.google.com/drive/folders/1RjHP-3RObB4Zhe__CqW7Et1HVgBzUvus  
**Radar de Competencia PDF:** https://drive.google.com/file/d/1yPLxxIFlKzcZ9KbUpjF-Z27aPlJkl4LM/view

---

## 10. Archivos Locales Generados

| Archivo | Descripción |
|---|---|
| `FitCore_Precios_VZ_vs_US.xlsx` | Tabla maestra de precios VZ vs US por marca. 8 tabs, 7 competidores, 296 fórmulas. |
| `FitCore_Propuesta_Inversion.pdf` | Propuesta de inversión para FitCore Store Valera. Dos opciones: A = 15% equity, B = 10% ganancias netas (3 o 5 años). Capital requerido: $10,000. |

---

## 11. Asana — Proyectos

| Proyecto | URL | Estado |
|---|---|---|
| Grupo Fitcore – Plan de Lanzamiento (B2B) | https://app.asana.com/1/1210257610652957/project/1214593570206267 | Activo — 32 tareas pendientes |
| FitCore Store Valera — Plan de Lanzamiento | https://app.asana.com/1/1210257610652957/project/1216024525701265 | Activo — creado 25/06/2026 |

**Los proyectos están separados:** B2B (Distribuidora) tiene su propio proyecto. FitCore Store Valera (kiosco + tienda online) tiene el suyo con 6 fases: Legal → Kiosco → Finanzas/Pagos → Inventario → Shopify → Lanzamiento.

---

## 12. Prioridades de Desarrollo

**Fase 1 (inmediata):**
1. Portal B2B — Distribuidora FitCore
   - Catálogo + inventario en tiempo real
   - Sistema de órdenes + facturas PDF
   - Dashboard admin básico

**Fase 2:**
2. Tienda B2C + PWA — FitCore Store
   - Website tienda con catálogo público
   - Checkout + selección de envío
   - Perfil de cliente + historial

**Fase 3:**
3. Integraciones avanzadas
   - Notificaciones push (PWA)
   - Integración Asana automática
   - Reportes Google Sheets

---

## 13. Contacto / Owner del Proyecto

**Diego Rojas** — Fundador, Grupo FitCore  
diego@ecomlogisticsus.com  
*(También fundador de Ecom Logistics — empresa separada de freight/logistics en USA)*
