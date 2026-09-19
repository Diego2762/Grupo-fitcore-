# Fitcore Store · Handoff / Estado de trabajo

> Documento de traspaso para retomar el trabajo de **Fitcore Store** (tienda B2C/DTC en Shopify) en otra sesión / cowork / con otro equipo o AI.
> Última actualización: 18 sep 2026. Autor: sesiones de trabajo con Claude.

---

## 0. ALCANCE — separar bien DTC de B2B (leer primero)

Este repo aloja **dos negocios distintos** del holding Grupo Fitcore. No mezclarlos.

| Negocio | Qué es | Dónde vive | Público |
|---|---|---|---|
| **Fitcore Store (DTC/B2C)** ← ESTE doc | Tienda retail al consumidor final: online (Shopify) + tienda física CC Plaza, Valera | Carpeta **`Fitcore Store/`** (tema Shopify) · dominio **fitcore.com.ve** | Atleta / cliente final |
| **Distribuidora (B2B mayorista)** | Venta al por mayor a gimnasios, farmacias, revendedores | Carpeta **`Grupo Fitcore Website/`** (sitio estático) · dominio **grupofitcore.com** · Portal B2B en Next.js+Supabase (aparte) | Dueño de negocio / comprador |

Reglas de separación:
- **Voz:** Fitcore Store le habla al CONSUMIDOR FINAL (cercana, directa). El website B2B le habla al negocio. `brand.md` está scopeado a B2B; para la tienda, la voz B2C manda.
- **Fuente de verdad del tema Fitcore Store = Shopify (vía MCP), NO GitHub.** La carpeta `Fitcore Store/` del repo es un espejo de referencia y puede divergir del tema live. Para cambiar la tienda se edita en Shopify (MCP) o se sube un tema staged; git NO despliega la tienda.
- **grupofitcore.com sí se despliega desde git** (push → Vercel). Eso es B2B, no la tienda.
- **Supabase NO es parte del storefront** de Fitcore Store. Solo lo toca el flujo de validación de pagos/comprobantes, que se maneja en un CHAT APARTE (ver §12). Para trabajar tema/catálogo/copy de la tienda, no hace falta Supabase.

> **NOTA DE VIGENCIA:** el estado más reciente está en la **§12 (Estado actual · sep 2026)** al final. Donde una sección vieja contradiga a la §12, manda la §12. El modelo de precios (§4) y envíos (§6) fueron reestructurados en la §11.

---

## 1. Qué es FitCore Store

- Línea **retail B2C** del holding **Grupo Fitcore** (suplementos deportivos y vitaminas, Venezuela).
- Tienda online en **Shopify** + tienda física en **CC Plaza, Valera, Edo. Trujillo**.
- Estado: **pre-lanzamiento** (~nov 2026). Se previsualiza con Shopify CLI (`shopify theme dev`) en `http://127.0.0.1:9292`.
- Voz B2C: directa, cercana, orientada a que el cliente final compre con confianza. (Ojo: el website `grupofitcore.com` es B2B mayorista; la tienda Shopify es B2C. Son públicos distintos.)

### Datos de la tienda
| Dato | Valor |
|---|---|
| Store | `rkytuq-2h.myshopify.com` |
| Plan | Basic |
| Tema | Dawn v15.5.0 + secciones custom FitCore |
| Moneda | USD |
| WhatsApp | `584246218863` |
| Colores marca | navy `#0B1840`, navy-dark `#071631`, purple `#3B1F6B`, purple-light `#5a2fa0`, verde `#19C37D` |

---

## 2. Carpetas y deploy (IMPORTANTE para no romper nada)

Repo root: `/Users/diegorojas/Desktop/Grupo Fitcore/Website Deploy`
GitHub: `https://github.com/Diego2762/Grupo-fitcore-.git`

Contenido del repo root (carpetas renombradas jul 2026):
- **`Grupo Fitcore Website/`** (antes `HTML Website`) → website estático B2B `grupofitcore.com`. Se despliega en Vercel.
- **`Fitcore Store/`** (antes `Shopify Live Theme`) → tema de FitCore Store (Shopify B2C). **Esta es la que editamos.**
- **`Shopify Theme/`** → carpeta de tema anterior/secundaria (no es la activa de trabajo).
- `vercel.json`, `CLAUDE.md`, `FITCORE_PROJECT.md`, `MARKET_RESEARCH.md`, `brand.md`, `TASTE.md`, `SEO/`, `references/`.

### Reglas al renombrar carpetas
- `vercel.json` tiene `"outputDirectory": "Grupo Fitcore Website"`. **Si renombras esa carpeta, actualiza esa línea o el deploy de grupofitcore.com se cae.** Las rutas internas de las páginas son relativas (`assets/...`) y no se rompen.
- Renombrar `Fitcore Store` **no rompe la tienda** (el tema vive en la nube de Shopify; la carpeta local es copia sincronizada por CLI). Solo cambia el nombre que usas al hacer `cd` para `shopify theme dev`.
- Si renombras cualquier carpeta, **actualiza las rutas absolutas en `CLAUDE.md`** y en las notas de memoria, o las próximas sesiones de Claude buscarán la carpeta vieja y se confunden.

### Deploy
- Website estático: `git push` a GitHub → auto-deploy en Vercel. Host canónico `https://grupofitcore.com` (URLs sin `.html`, `cleanUrls=true`).
- Tema Shopify: se sube con Shopify CLI. `shopify theme dev` para preview local.

---

## 3. Productos cargados (6) — estado actual

Los 6 están **ACTIVE**, en su colección, con imágenes en CDN, y **publicados en el canal "Tienda online"** (verificado 2026-07-11: los 6 tienen `onlineStoreUrl`, visibles en el catálogo).

| Producto | GID Shopify | Colección | Divisa (paga el cliente) | Precio lista (tachado) | Fuente precio |
|---|---|---|---|---|---|
| Dymatize ISO100 · Fruity Pebbles | `9472399769858` | Proteínas | **$45.75** | $61.00 | Pre-existente (revisar fuente antes de reusar) |
| MuscleTech Cell-Tech (2 sabores × 2 tamaños) | `9484433490178` | Creatina | **$44.50** (3lb) / **$71.50** (6lb) | $59.34 / $95.34 | Estudio detal Caracas |
| MuscleTech Platinum Creatine Monohydrate (3 sabores) | `9484435161346` | Creatina | **$40.12** | $53.50 | Estudio detal Caracas |
| MuscleTech Platinum Creatine Capsules (1 formato) | `9484436603138` | Creatina | **$29.89** | $39.86 | US retail $22.99 + 30% |
| Forfit Pesas Muñeca/Tobillo Triangulares | `9484433555714` | Accesorios | **$29.99** | $39.99 | Regla Diego ($29.99 divisa) |
| Forfit Pesas Muñeca/Tobillo Rectangulares | `9484433621250` | Accesorios | **$29.99** | $39.99 | Regla Diego ($29.99 divisa) |

**SKUs:** Cell-Tech `CELLTECH-FP-3LB / -FP-6LB / -CP-3LB / -CP-6LB`; Monohydrate `PLAT-CREA-UNF / -GRP / -RB`; Cápsulas `PLAT-CREA-CAPS`; Pesas Forfit `FF-PMT-001` (triangular) / `FF-PMT-002` (rectangular).

Fuente del código/imágenes de cada ficha: carpeta `Grupo Fitcore Website/` (páginas `producto-*.html`) e imágenes en `Grupo Fitcore Website/assets/img/catalogo/` y `.../Forfit/`.

---

## 4. Modelo de precios "divisa" (dual price) — CLAVE

- Snippet: `Fitcore Store/snippets/fitcore-divisa-price.liquid`.
- El **precio guardado en Shopify = precio LISTA** (tachado). La tienda muestra la **divisa = lista × 0.75** (le resta 25%). Matemática entera: `price_cents | times: 75 | divided_by: 100` (división truncada).
- **Para que el cliente pague un precio X exacto en divisa, se guarda `X ÷ 0.75` como precio lista** (≈ +33%, NO +25%: revertir un −25% exige dividir entre 0.75).
  - Ej.: quiero divisa $29.99 → guardo $39.99. Quiero divisa $44.50 → guardo $59.34.
- Regla de negocio acordada: **los precios "detal Caracas" del estudio ES lo que paga el cliente en divisa.** Por eso se guardan multiplicados (÷0.75), no directos.

### Reglas de precio por fuente
1. Suplementos que estén en el estudio `analisis_mercado_regional.html` → usar **precio detal Caracas** (como divisa).
2. Lo que no esté en el estudio → sacarlo del Google Sheet `1Dz4Qhto7qytVIJHIVi2DMXkI6-4KzoqDCcx5O7xCXsg` (leer pestañas con endpoint gviz `gviz/tq?tqx=out:csv&sheet=<Tab>`, porque `export?format=csv` solo da la primera pestaña).
3. Lo que no esté en ninguno → **US retail × 1.30** (ej. cápsulas: MuscleTech.com $22.99 × 1.30 = $29.89).
4. Pesas Forfit → **$29.99 en divisa** (ambas).

**Pendiente de confirmar con Diego:** si el "+30%" de las cápsulas debía ser sobre el detal u otra base, y si prefiere el factor exacto +33% (divisa = detal clavado) o +25% literal (divisa ~6% bajo el detal). En esta sesión se dejó cuadrando EXACTO al detal (÷0.75).

---

## 5. Gotchas técnicos de Shopify (aprendidos en esta sesión)

- **Publicación:** los productos creados por API/MCP quedan ACTIVE pero **NO publicados en ningún canal** → no aparecen en el catálogo ni en el preview. Hay que publicarlos con `publishablePublish` en el canal **"Tienda online"** = `gid://shopify/Publication/200617623810`. (Otros canales: "Shop" `200617656578`, "Point of Sale" `200617689346`.)
- **Imágenes:** el MCP de Shopify NO tiene `upload-image`. Las imágenes entran solo por **URL pública HTTPS** en el array `images` de create-product. Host que funciona: `https://www.grupofitcore.com/assets/img/catalogo/<archivo>.jpg` (con **www**; el apex `grupofitcore.com` falla, y el alias viejo de Vercel quedó tras login SSO). La primera imagen del array = featured. Se adjuntan async (~5-10s): create-product devuelve `images:[]`, luego `search_products` ya las muestra en `cdn.shopify.com`.
- **Metafields de macros** (panel de "conveniencia por objetivo", sección `fitcore-product-fit.liquid`): namespace `fitcore`, keys `calorias/proteina/carbohidratos/azucar/grasa` (+ opcional `porcion`), tipo `number_integer`, vía mutation `metafieldsSet`. La sección renderiza si `calorias|proteina|carbohidratos != blank`. **Todo en 0 = caso neutro** ("sin aporte calórico, encaja en cualquier fase") → usar para creatina/aminoácidos puros.
- **create-product** (MCP) NO acepta metafields directo: se setean aparte con `metafieldsSet`. Sí acepta title, vendor, productType, status, descriptionHtml, tags, options (array de strings), variants (price/sku/optionValues/inventoryItem), images, collectionId.
- Card subtitle en el catálogo = "Marca · Categoría" = **vendor · productType**.
- Templates JSON del tema (`templates/*.json`, `index.json`) son JSONC: tienen bloque comentado `/* auto-generated */` al inicio → `json.load` falla; quitar comentarios con `re.sub(r'/\*.*?\*/','',s,flags=re.S)` antes de parsear.

---

## 6. Envíos — modelo de 3 niveles (ya aplicado en todo el sitio)

1. **GRATIS**: Valera y sus alrededores, en compras **desde $30**, entrega el mismo día.
2. **MISMO DÍA (con costo fuera de Valera)**: todo el Edo. Trujillo.
3. **NACIONAL (con costo)**: todo el país por **MRW o Tealca**.
4. **Retiro en tienda** (sin costo): CC Plaza, Valera.

Archivos que llevan este texto: `sections/fitcore-home.liquid`, `sections/fitcore-como-comprar.liquid`, `sections/fitcore-cart-help.liquid`, `templates/index.json`, `templates/page.envios.json`, `templates/page.faq.json`, `snippets/fitcore-seo.liquid`.

---

## 7. Datos NAP / SEO de la tienda (en `snippets/fitcore-seo.liquid`)

- Nombre: **FitCore Store** · Tel `+584246218863` · email `contacto@grupofitcore.com`
- Dirección: Avenida 6, Calles 25 y 25A, C.C. Plaza, Puente Nivel Comercio, Valera, Trujillo 3101, VE
- Geo: `9.297655, -70.617916`
- Schema.org: WebSite + Store/HealthAndBeautyBusiness + LocalBusiness (NAP). Pagos: Zelle, USDT, Pago Móvil, Transferencia, Efectivo.

---

## 8. Reglas de estilo / voz (no romper)

- **Sin guiones largos (—) nunca.** Usar comas, puntos, dos puntos o paréntesis.
- Siempre **"FitCore Store"** (no "Fitcore store"); holding **"Grupo Fitcore"**.
- La tienda física es **"tienda"**, nunca "kiosco".
- **No inventar** datos (precios, stats, testimonios, calorías): marcar `[PLACEHOLDER]` o dejar pendiente.
- Precios en **USD**.
- Shopify primero: no proponer desarrollo custom salvo que Shopify no lo soporte.

---

## 9. Pendientes (para próximas sesiones)

- [ ] **Confirmar precio de las cápsulas** (+30% ¿sobre qué base?) y decidir factor divisa (+33% exacto vs +25% literal).
- [ ] Cargar el resto del catálogo (más productos MuscleTech y otras marcas) con el mismo flujo: crear → metafields → publicar en "Tienda online".
- [ ] Confirmar **email definitivo** (¿fitcore.com.ve?) y actualizar NAP en `fitcore-seo.liquid`.
- [ ] Confirmar **horario de tienda** (tentativo L-V 10-18h, Sáb 11-19h) para el schema/LocalBusiness.
- [ ] Fila de **bestsellers** en el home una vez haya catálogo cargado.
- [ ] Corregir en admin el SEO title del home "Fitcore Store" → **"FitCore Store"**.
- [ ] Verificar vista **mobile** de las fichas.
- [ ] (Opcional) Push a un tema draft de respaldo antes de tocar el tema live.

---

## 10. Cómo retomar en cowork (checklist rápido)

1. Abrir repo `/Users/diegorojas/Desktop/Grupo Fitcore/Website Deploy` (o el nombre nuevo si renombraste; ver §2).
2. Leer `CLAUDE.md` (instrucciones del proyecto) y este archivo.
3. Para preview de la tienda: `cd "Fitcore Store"` → `shopify theme dev` → `http://127.0.0.1:9292`.
4. Para crear/editar productos: usar el MCP de Shopify (crear → `metafieldsSet` → `publishablePublish` en "Tienda online").
5. Imágenes: subirlas a `Grupo Fitcore Website/assets/img/...`, hacer push (deploy Vercel), y referenciarlas con `https://www.grupofitcore.com/assets/img/...`.

---

## 12. Estado actual (sep 2026) — MANDA sobre lo anterior

### Datos vigentes
| Dato | Valor |
|---|---|
| Store Shopify | `rkytuq-2h.myshopify.com` |
| Dominio público | **fitcore.com.ve** (con **password gate** a propósito hasta el lanzamiento; el scraper de links solo ve `/password`) |
| Teléfono oficial | **0422-038-4328** (intl `+58 422-038-4328` · `wa.me/584220384328`) |
| Email de contacto | **info@grupofitcore.com** |
| Host de imágenes para Shopify | `https://www.grupofitcore.com/assets/img/...` (con **www**; el apex no sirve assets) |
| Lanzamiento estimado | ~oct-nov 2026 (kiosco CC Plaza Valera + online) |

### Pipeline de temas (CRÍTICO — el MCP NO puede escribir ni publicar el tema LIVE)
- Flujo estándar: **editar local → commit → push → `themeDuplicate` del tema MAIN → `themeFilesUpsert` al duplicado (unpublished) → verificar `checksumMd5` → Diego publica manual en admin.** Publicar un tema NO expone la tienda (sigue tras el gate); el público entra solo cuando Diego quita la contraseña = lanzamiento.
- Nunca editar directo el tema en vivo por MCP: la política de seguridad lo bloquea ("targets the live theme").
- **Temas (revisar en admin por si cambian los roles):** la línea de temas va `artistic-look` → v1.7 → v1.8 (SEO local NAP+geo) → **v1.9 "OG image branded"** (staged con la imagen de link compartido). Diego publica el más nuevo cuando aprueba. Los IDs concretos cambian cada vez que se duplica; leerlos con una query de temas antes de asumir.

### Catálogo
- **~56 productos cargados** (ON, Dymatize, MuscleTech, C4/Cellucor/XTEND, Nutrex, Ghost, Forfit) ACTIVE + publicados en "Tienda online". Proceso estándar de carga obligatorio en §11 / project note (vendor=marca, tag categoría Title-Case, precio divisa base=ceil(PV/0.75), metafields fitcore, inventario `tracked:false`+`CONTINUE`).
- **AVISO:** el filtro marca/objetivo del catálogo es client-side y `products_per_page`=50. Con 56 productos ya se pasó el umbral → pendiente migrar a **facets nativos** o carga incremental antes de seguir cargando.

### SEO / compartir link (OG)
- `snippets/fitcore-seo.liquid` = JSON-LD WebSite+Store/LocalBusiness+geo (pin real GBP `9.2975443,-70.6152509`, CID 911554535815498653), horario visible, hasOfferCatalog.
- **Imagen OG branded** `assets/fitcore-og.png` (navy 1200x630, logo Fitcore Store) + `snippets/meta-tags.liquid` + `layout/password.liquid` con bloque OG inline → el preview del link se ve con marca y descripción aun con la tienda gateada. (Recomendado: reemplazar en Preferencias la "imagen para compartir" por la navy.)
- **Checklist de lanzamiento** (cuando se quite el gate, ~1 mes): quitar password gate · Rich Results Test · Search Console + sitemap `fitcore.com.ve/sitemap.xml` · confirmar que el Perfil de Google Business apunta a fitcore.com.ve.

### Fuera de alcance de ESTE chat (viven en otro chat/negocio)
- **Validación de pagos / comprobantes** (comprobante → Supabase `diego-fitness-os` `kmkqcfyqtaqpgyyynpno` → match Gmail `pagos@` + Shopify + Asana). Es un flujo operativo que se lleva en un **CHAT APARTE**, no en el de código de la tienda. WhatsApp automático del link de comprobante = app Whatomation (número propio 0422-038-4328).
- **Portal B2B / Distribuidora** (Next.js + Supabase) = otro negocio (ver §0).

### Qué leer para tener contexto de Fitcore Store (para otro equipo / AI)
1. **Este archivo** (`FITCORE_STORE_HANDOFF.md`) — estado y decisiones DTC.
2. `FITCORE_PROJECT.md` §4 — brief técnico de la tienda.
3. `TASTE.md` — reglas de estilo (sin guiones largos, "Fitcore" con c minúscula, no inventar datos).
4. `brand.md` — voz (ojo: escrito para B2B; la tienda es B2C).
5. Complementarios según tarea: `Shopify Theme/PAGOS.md` (textos de pago), `MARKET_RESEARCH.md` (mercado), `references/offer.md` (oferta).
- **Fuente de verdad de la tienda = MCP de Shopify.** GitHub = contexto de lectura. Supabase = solo para el flujo de pagos (otro chat).
