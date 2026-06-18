# /lead-magnet — Generador de Lead Magnets para Fitcore

Guía a Diego para crear un nuevo lead magnet completo (landing + entregable) para grupofitcore.com.

## Proceso

Haz estas preguntas **una por una** y espera respuesta antes de continuar:

1. **Tema del lead magnet**: ¿Sobre qué trata el recurso gratuito? (ej. "Guía de precios mayoristas", "Checklist de apertura de tienda")
2. **Audiencia objetivo**: ¿A quién va dirigido? (ej. "dueños de gimnasio", "nutricionistas")
3. **Título del recurso**: ¿Cómo se llama el entregable?
4. **Form ID de Kit**: ¿Cuál es el `data-sv-form` del nuevo formulario? (número)
5. **UID del formulario Kit**: ¿Cuál es el `data-uid`?
6. **Slug de la landing**: ¿Qué URL tendrá la página de captura? (ej. `guia-precios` → `/guia-precios`)
7. **Slug del entregable**: ¿Qué URL tendrá la página de descarga? (ej. `recursos-precios`)

## Archivos a generar

### A. `HTML Website/{slug}.html` — Landing page
- Clona `HTML Website/lead-magnet.html`
- Actualiza: H1, subtítulo, bullets de beneficios, eyebrow
- En `data-options` del form, cambia `data-sv-form`, `data-uid` y `redirect_url` al nuevo slug del entregable
- Actualiza `<title>`, `<meta description>`, `<link rel="canonical">`

### B. `HTML Website/{slug-entregable}.html` — Página del entregable
- Clona `HTML Website/recursos.html`
- Actualiza: título hero, subtítulo, los tres cards (Prompt, Skill, Guía)
- El Prompt debe ser específico al tema nuevo
- Mantén `<meta name="robots" content="noindex,nofollow">`
- Actualiza `<title>` y canonical

### C. Snippet para `index.html`
- Genera el bloque `<section class="gf-lm-promo">` con textos del nuevo tema
- No toques el archivo — muéstraselo a Diego para que lo inserte manualmente en posición deseada

## Reglas de estilo

- Todos los textos con `data-es` y `data-en` en el mismo nodo
- Fuentes: Bricolage Grotesque (títulos) + Archivo (cuerpo)
- Prefijo CSS: `gf-lm-*` (no crear nuevos prefijos)
- CSS vars: `--navy #0B1840`, `--purple #3B1F6B`, `--muted #65708a`, `--line #e6e9f0`, `--soft #f6f7fa`
- Estilos en `<style>` dentro del HTML, NO tocar `assets/style.css`
- Script de Kit al final del `<body>`, antes del script de idioma
- Script de idioma: copiar bloque `applyLang`/`toggleLang` de `index.html` (sin la parte de counters)

## Checklist de verificación

Al terminar, muestra este checklist:

- [ ] Form ID y UID de Kit coinciden con el nuevo formulario en app.kit.com
- [ ] `redirect_url` en `data-options` apunta al slug del entregable correcto
- [ ] Ambas páginas tienen `<link rel="canonical">` con URL absoluta
- [ ] La página de entregable tiene `<meta name="robots" content="noindex,nofollow">`
- [ ] Todos los textos visibles tienen `data-es` y `data-en`
- [ ] El script de Kit está cargado al final del body, antes del script de idioma
- [ ] El snippet para index.html incluye textos en ambos idiomas
