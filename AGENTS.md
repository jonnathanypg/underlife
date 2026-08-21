# AGENTS.md — Fundación Underlife
## Reglas Maestras para Agentes de IA (Gemini / Claude / Cursor / Copilot)

> **LEER ANTES DE TOCAR CUALQUIER ARCHIVO**  
> Este documento contiene las reglas de oro del proyecto. Ignorarlas rompe producción.

---

## 1. Stack y Arquitectura

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | **Next.js 15.5.9** (App Router) | Usar solo convenciones de App Router, NO pages/ |
| Lenguaje | TypeScript 5 | `ignoreBuildErrors: true` — el build NO valida tipos |
| Runtime | Node.js con **custom server.js** | NO usar `next start`, siempre `node server.js` |
| Process Manager | **PM2** (`ecosystem.config.js`) | Ver `deploy.sh` para el proceso completo |
| DB ORM | **Prisma 6.19.3** + SQLite en Hostinger | Siempre `npx prisma generate` antes de build |
| Hosting | **Hostinger** con Apache/LiteSpeed + **hcdn** (Hostinger CDN Edge) | El CDN es la principal fuente de problemas de caché |
| i18n | **LanguageContext** propio (`src/lib/LanguageContext.tsx`) | NO usar next-intl para routing — solo para traducciones |
| Pagos | **PayPal v2 Orders API** (`src/components/sections/DonationSection.tsx`) | SDK cargado en layout.tsx vía `<Script afterInteractive>` |
| Widget AI | **Aikrofy** (ID: `3e502c00-45ae-4d6e-9bf6-5d60dab2ba46`) | Script global en layout.tsx |

---

## 2. ⚠️ REGLAS CRÍTICAS DE CACHÉ — EL ERROR MÁS PELIGROSO

### El problema que DESTRUYÓ producción (2026-08-17):
Configurar `ExpiresDefault "access plus 1 year"` en `.htaccess` causó que el CDN de Hostinger
cacheara el **documento HTML** por 1 año. Al hacer un nuevo deploy, Next.js genera nuevos
hashes para los chunks de JS/CSS, pero el CDN seguía sirviendo el HTML viejo con los hashes
anteriores. Resultado: **ChunkLoadError** en todos los navegadores.

### Regla de Oro:
```
✅ /_next/static/*      → Cache inmutable 1 año (tienen hash en el nombre)
✅ /logos/*             → Cache 1 año
✅ /recursos_opt/*      → Cache 1 año  
✅ /icons/*             → Cache 1 año
❌ / (HTML root)        → NUNCA cachear en CDN — max-age=0, must-revalidate
❌ /contacto (HTML)     → NUNCA cachear en CDN
❌ /primeros-1000-dias  → NUNCA cachear en CDN
❌ /api/*               → NUNCA cachear
```

### Lo que NO debes hacer NUNCA:
```apache
# ❌ PROHIBIDO — destruye producción al hacer deploy
ExpiresDefault "access plus 1 year"
```

### Lo que SÍ debes hacer:
```apache
# ✅ CORRECTO — default seguro
ExpiresDefault "access plus 0 seconds"
# Luego define SOLO los tipos específicos con hash en filename
ExpiresByType image/webp "access plus 1 year"
```

---

## 3. Protocolo de Deploy — SIEMPRE seguir este orden

### En el servidor de producción:
```bash
# 1. Pull del código más reciente
git pull origin main

# 2. Ejecutar el script de deploy (incluye build + reinicio PM2)
bash ./deploy.sh

# 3. ⚠️ OBLIGATORIO: Purgar caché del CDN de Hostinger
# Ir a: hPanel → Performance → CDN → Purge All Cache
# SIN ESTE PASO los usuarios verán ChunkLoadError hasta que el caché expire
```

### Verificación post-deploy:
```bash
# Confirmar que los chunks nuevos responden 200 (no 404)
NEW_CHUNK=$(ls .next/static/chunks/app/layout-*.js | head -1 | xargs basename)
curl -I "https://fundacionunderlife.org/_next/static/chunks/app/$NEW_CHUNK" | grep "HTTP/2"
```

---

## 4. Arquitectura de Componentes (Server vs Client)

```
src/app/layout.tsx          → Server Component (metadata, fonts, providers)
src/app/page.tsx            → Server Component (metadata SEO, JSON-LD)
src/app/HomeClient.tsx      → Client Component ('use client') — toda la UI interactiva
src/app/*/page.tsx          → Server Component por defecto (metadata)
src/components/sections/*   → Client Components ('use client') — usan hooks, GSAP, Swiper
src/components/layout/*     → Client Components (Header, Footer)
src/components/ui/*         → Mixto — verificar archivo por archivo
```

**Regla de hidratación:**
- Si usa `useState`, `useEffect`, `useContext`, GSAP, Swiper → `'use client'`
- Si solo renderiza JSX estático → puede ser Server Component
- `suppressHydrationWarning` en `<html>` es correcto y necesario (tema dark/light)

---

## 5. Sistema i18n

El proyecto usa un `LanguageContext` propio (NO `next-intl` routing con segmentos `/es/`, `/en/`):

```typescript
// Acceder a traducciones
import { useLanguage } from '@/lib/LanguageContext';
const { texts } = useLanguage();
```

**Cuando agregues textos nuevos — actualizar los 3 archivos:**
1. `src/messages/es.json` (español — base)
2. `src/messages/en.json` (inglés)
3. `src/messages/pt.json` (portugués)

**Nunca dejes claves sin traducir en los 3 idiomas.**

---

## 6. Antes de Hacer Cualquier Cambio — Checklist Pre-Task

```bash
# Verificar estado limpio del proyecto
npm run build  # Debe pasar sin errores

git status     # Debe estar en un estado conocido
```

---

## 7. Antes de Hacer Commit — Checklist Post-Task

```bash
# 1. Build limpio OBLIGATORIO
npm run build

# 2. Verificar rutas críticas accesibles localmente:
#    - / (home)
#    - /contacto
#    - /primeros-1000-dias
#    - /privacidad
#    - /transparencia

# 3. Sin errores de hidratación en consola del navegador

# 4. DESPUÉS del commit+push → deploy.sh en servidor → Purgar CDN hPanel
```

---

## 8. Rutas de la Aplicación

| Ruta | Archivo | Tipo |
|---|---|---|
| `/` | `src/app/page.tsx` + `HomeClient.tsx` | Static + Client |
| `/contacto` | `src/app/contacto/page.tsx` | Static |
| `/primeros-1000-dias` | `src/app/primeros-1000-dias/page.tsx` | Static |
| `/privacidad` | `src/app/privacidad/page.tsx` | Static |
| `/transparencia` | `src/app/transparencia/page.tsx` | Static |
| `/api/contact` | `src/app/api/contact/route.ts` | Dynamic (POST) |
| `/api/donations` | `src/app/api/donations/route.ts` | Dynamic (POST) |
| `/api/donations/capture` | `src/app/api/donations/capture/route.ts` | Dynamic (POST) |

---

## 9. Archivos Críticos — Impacto de cada uno

| Archivo | Impacto |
|---|---|
| `.htaccess` | ⚠️ ALTO — Caché Hostinger. Error aquí → ChunkLoadError en producción |
| `next.config.ts` | ⚠️ ALTO — Headers HTTP, redirects, output mode |
| `server.js` | ⚠️ ALTO — Custom HTTP server para PM2 |
| `src/lib/LanguageContext.tsx` | 🔶 MEDIO — i18n global. Afecta TODOS los componentes |
| `src/app/layout.tsx` | ⚠️ ALTO — Scripts globales, fuentes, metadata root |
| `ecosystem.config.js` | 🔶 MEDIO — Configuración PM2 |
| `deploy.sh` | 🔶 MEDIO — Script de deploy |
| `prisma/schema.prisma` | ⚠️ ALTO — Cambios requieren `prisma migrate` |

---

## 10. Errores Conocidos y Soluciones

### ChunkLoadError en producción
**Síntoma:** `Refused to execute script ... MIME type ('text/plain')`  
**Causa:** CDN de Hostinger sirviendo HTML cacheado con hashes de chunks viejos  
**Solución:**  
1. `bash ./deploy.sh` en el servidor
2. **hPanel → Performance → CDN → Purge All Cache** ← OBLIGATORIO

### Hydration mismatch
**Síntoma:** Warning de React sobre diferencias servidor/cliente  
**Causa:** Server Component usando hooks o `window`/`document`  
**Solución:** Agregar `'use client'` al componente

### PayPal buttons not rendering
**Síntoma:** Botones de PayPal no aparecen  
**Causa:** SDK no cargado cuando el componente intentó montarlos  
**Solución:** Verificar ciclo de retry con polling de `window.paypal` en `DonationSection.tsx`

---

## 11. Comandos de Referencia Rápida

```bash
npm run dev              # Desarrollo local
npm run build            # Build de producción
NODE_ENV=production node server.js  # Servidor manual
bash ./deploy.sh         # Deploy completo
pm2 logs underlife-prod  # Ver logs
pm2 status               # Estado PM2
pm2 restart underlife-prod  # Reiniciar
npx prisma generate      # Generar Prisma client
npx prisma studio        # DB GUI
```

---

*Última actualización: 2026-08-21 — Auditoría de producción (ChunkLoadError post-deploy)*  
*Mantenido por: jonnathanypg / WLT Team*

---

## 14. Reglas de Performance (PageSpeed) — Actualizado 2026-08-21

### Caché de Imágenes de Galería
Todas las carpetas de imágenes públicas DEBEN estar listadas en:
- `server.js` → `IMMUTABLE_PREFIXES` array
- `next.config.ts` → `headers()` function

Al agregar una nueva carpeta de imágenes en `/public/`, siempre añadir su entrada en ambos archivos.

### Script PayPal SDK
- **Estrategia:** `lazyOnload` (no `afterInteractive`)
- El SDK está en `src/app/layout.tsx`
- `DonationSection.tsx` ya tiene un ciclo de retry/polling para `window.paypal` — es seguro usar `lazyOnload`
- Nunca cambiar a `beforeInteractive` — bloquearía el render crítico

### Imágenes de Galería
- Las imágenes del carrusel (`GalleriesSection.tsx`) usan `loading="lazy"` — NO cambiar a `eager`
- Las imágenes LCP (logo, hero poster) usan `fetchPriority="high"` y `loading="eager"`
- El preloading de galería se hace con `requestIdleCallback` — no modificar

### Animaciones
- Usar siempre `transform` y `opacity` para animaciones (composited)
- Evitar animar `width`, `height`, `top`, `left`, `margin`, `padding` — causan forced reflow
- Las animaciones que usa GSAP en el proyecto ya son composited — no cambiar

### ARIA Roles en Divs Interactivos
- Cualquier `<div>` con `onClick` y `aria-label` DEBE tener también `role="button"` y `tabIndex={0}` y `onKeyDown`
- El patrón correcto:
```tsx
<div
  role="button"
  tabIndex={0}
  onClick={handler}
  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handler()}
  aria-label="Descripción"
/>
```

### Contraste de Color (WCAG AA)
- Links sobre fondos claros: usar `var(--color-primary)` (#0055FF) — ratio 5.9:1 ✅
- PROHIBIDO usar `var(--color-teal)` (#26b49c) en texto sobre fondos claros — ratio ~2.4:1 ❌
- Verificar contraste en: https://webaim.org/resources/contrastchecker/

### llms.txt (3 Pasos para Optimización LLM)
El archivo `/public/llms.txt` sigue la estructura de 3 pasos del estándar llmstxt.org:
1. **Identidad y Misión** — Quiénes somos, estatus legal
2. **Programas e Impacto** — Qué hacemos, métricas verificadas
3. **Cómo Participar** — Donaciones, voluntariado, contacto

Al agregar nuevos programas o actualizar métricas de impacto, actualizar también `llms.txt`.

*Sección agregada: 2026-08-21 — Auditoría PageSpeed 68→objetivo 90+*
