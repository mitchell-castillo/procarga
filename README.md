# Pro Carga — transporte y logística

Diseño y verificación vigentes: [VISUAL-POLISH.md](VISUAL-POLISH.md); estructura de servicio: [SERVICE-EXPERIENCE.md](SERVICE-EXPERIENCE.md). La web usa el logo original de marca, azul marino, celeste y blanco, con Manrope alojada localmente. [MEDIA-UPDATE.md](MEDIA-UPDATE.md), [CLIENT-REFRESH.md](CLIENT-REFRESH.md), [BRAND-UPDATE.md](BRAND-UPDATE.md) y [REDESIGN.md](REDESIGN.md) documentan versiones anteriores.

Web estática ES/EN para organizar traslados de aeropuerto, turismo, Pro Luxury, eventos, flete, carga y mudanzas en República Dominicana. Presenta los servicios según la ocasión del visitante, con carruseles de fotos y tres videos visibles en la página. El formulario prepara un mensaje que el visitante revisa y decide abrir y enviar por WhatsApp al **+1 809 253 2740**. Carga no requiere pasajeros ni vehículo de pasajeros.

## Demo y código

Repositorio público: https://github.com/mitchell-castillo/procarga

Demo en GitHub Pages: https://mitchell-castillo.github.io/procarga/

El workflow `.github/workflows/pages.yml` verifica las solicitudes de cotización y publica exclusivamente `dist/` cuando cambia `main`. En Settings → Pages, la fuente debe ser **GitHub Actions**. No hay compilación ni dependencias necesarias para publicar.

La demo es pública y no pide cuenta, contraseña ni 2FA a los visitantes. El propietario autorizó hacer público el repositorio el 14 de octubre de 2026. `netlify.toml` y `exports/NETLIFY.txt` documentan la alternativa anterior; Netlify no es necesario para esta demo.

## Ejecutar

Requiere Node.js 20 o superior. No se necesitan dependencias para servir la web o ejecutar pruebas unitarias.

```powershell
cd Procarga
npm start
```

Abrir `http://127.0.0.1:4173`. El servidor solo escucha en loopback. Para ver inglés directamente: `http://127.0.0.1:4173/?lang=en`.

Los archivos listos para un host estático están en `dist/`. Usar HTTP para cargar módulos; abrir `index.html` con `file://` no es el flujo soportado.

## Probar

```powershell
npm test
npm install
npx playwright install chromium
npm run test:browser
```

Playwright está fijado a `1.62.1` para reproducir la herramienta de pruebas. La web no incluye Playwright ni depende de él. Para usar una instalación existente de QA se aceptan `PLAYWRIGHT_MODULE_PATH` y `TEST_BROWSER_EXECUTABLE`; no se instalan navegadores en el equipo durante esta entrega.

Las pruebas de navegador levantan su propio servidor efímero en `127.0.0.1`, lo cierran al terminar, bloquean toda petición externa y utilizan datos sintéticos. **No abren WhatsApp ni envían mensajes.** Comprueban el destino y el texto de los enlaces de forma local.

## Comportamiento

- Navegación por secciones y menú móvil con `aria-expanded`, cierre al navegar y Escape.
- Idioma ES/EN, títulos, metadatos, textos, etiquetas, validación y mensajes. El idioma se conserva en la URL; los datos de la ruta no se guardan en almacenamiento persistente.
- Origen, destino, fecha y pasajeros obligatorios. Fecha de referencia: calendario de República Dominicana. Rechaza fechas pasadas/imposibles, lugares vacíos o idénticos y pasajeros no enteros positivos.
- Servicio y detalles opcionales; la preferencia de vehículo está dentro de los detalles. Los enlaces de servicios preparan la solicitud sin borrar la ruta. La capacidad de 19 pasajeros del minibús es la proporcionada por el cliente; el formulario admite grupos de otros tamaños para consultar alternativas.
- Carruseles automáticos de fotos con bolitas y ampliación; dos exteriores y dos interiores del minibús. Los tres videos locales aparecen directamente en la página, con controles y sin reproducción automática. Se retiró el aviso de incorporación futura del minibús a petición del propietario, porque la página se lanzará cuando ya esté disponible.
- El visitante ve el borrador completo antes de continuar a WhatsApp. Editar conserva los campos; cambiar idioma traduce el borrador.
- Sin precios automáticos, pagos, cuentas, backend, analítica, cookies, reservas confirmadas ni solicitudes de red en segundo plano.

## Entrega y límites

Consultar `DECISIONS.md` para las fuentes y las decisiones de diseño, y `VALIDATION.md` para las pruebas efectivamente ejecutadas.

La publicación anterior en Sites conserva su configuración en `.openai/hosting.json`. `HOSTING_PENDING.md` documenta esa fase histórica; la demo actual usa GitHub Pages.

`noindex` es una indicación a buscadores y **no es un mecanismo de acceso privado**. Se conserva para esta demo pública. GitHub Pages no aplica el archivo `_headers`; la política de recursos y el referrer se declaran también en el HTML para conservarlas entre hosts.

DotBoard ya tiene proyecto y tarjeta; no fueron creados ni modificados aquí. No se accedió a Boardly, Philips ni repos ajenos.
