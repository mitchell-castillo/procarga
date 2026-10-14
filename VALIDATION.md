# Validación de esta entrega

> Validación histórica de la versión inicial. La verificación del rediseño actual está en [REDESIGN.md](REDESIGN.md).

Resultado funcional local: **7 pruebas unitarias y 22 verificaciones de navegador aprobadas**. Este registro describe el QA anterior al despliegue; la identidad de Sites se conserva en `.openai/hosting.json` y el resultado de publicación se registra por separado en `evidence/deployment-final.json`.

## Ejecución observada

- Fecha: 13 de octubre de 2026, 23:02 UTC.
- Node.js `24.18.0`; Playwright `1.62.1`.
- Chromium headless `148.0.7778.96`, instalado previamente en el equipo, con contexto aislado, sin perfil personal.
- Servidor HTTP efímero en `127.0.0.1`, respuesta inicial `200`. Se cerró al terminar la prueba.
- Las pruebas pasaron después de usar el ejecutable existente y permitir la navegación a loopback fuera de la restricción de red del sandbox. No hubo rechazo del auto-review.
- Registro detallado: `evidence/browser-report.json`.

## Pruebas unitarias

1. Obligatoriedad y espacios en blanco.
2. Fecha actual, pasada, formato y fechas imposibles; año bisiesto.
3. Pasajeros: cero, negativos, fracciones, exponenciales, infinito y enteros inseguros rechazados. Sin capacidad de flota inventada.
4. Normalización, origen/destino iguales, longitudes y servicio inválido.
5. Borrador ES/EN, fecha explícita y aviso de que no confirma reserva.
6. Codificación y recuperación exacta de acentos, signos y saltos de línea en URL de WhatsApp.
7. Calendario de República Dominicana para visitantes internacionales.

Comando ejecutado: `node --test tests/quote.test.mjs`. Resultado: 7 aprobadas, 0 fallidas, 0 omitidas.

## Pruebas en navegador

- Navegación real por servicios, experiencia y contacto; todos los destinos de enlaces internos existen.
- Enlace de cada servicio preselecciona el tipo de consulta y despliega detalles opcionales.
- Validación real de formulario vacío, foco en primer error, errores accesibles; rechazo de cero/fracción de pasajeros, fecha pasada y ruta duplicada.
- Cambio ES/EN traduce etiquetas, metadatos, errores y mensaje preparado. `?lang=en` se conserva al recargar.
- Formulario válido muestra revisión local. El número del enlace es exactamente `18092532740`; el payload decodificado coincide con el texto visible.
- HTML sintético en notas se muestra como texto; no crea imágenes ni ejecuta scripts.
- Editar conserva campos, servicio y notas.
- Links de contacto apuntan al mismo número; nueva pestaña con `noopener noreferrer`.
- Menú móvil abre, cierra al navegar y responde a Escape.
- Formulario móvil inglés funciona hasta la revisión del mensaje.
- Sin desbordamiento horizontal: escritorio ES/EN `1440px`, móvil ES/EN `390px`, móvil pequeño EN `320px`, tablet EN `768px` y revisión móvil.
- FAQ abre y explica que no hay reserva confirmada.
- Cero peticiones externas, cero errores de navegador. No se abrió Instagram o WhatsApp ni se enviaron mensajes.

## Inspección visual

Se revisaron las capturas completas de escritorio ES y móvil ES. Jerarquía editorial, espaciado, portada SVG, formulario, filas de servicios, pasos, FAQ y pie se ven completos. Capturas de escritorio EN y revisión móvil EN también se generaron para QA.

Las capturas quedan en `evidence/` como evidencia local de QA y no se suben a Library. El paquete entregable incluye fuente, documentación y reporte JSON, sin capturas de navegador.

## Límites

- No probado con una cuenta real de WhatsApp, envío real, llamada, precio o disponibilidad de Pro Carga.
- No ejecutado en Safari/iOS o Firefox; se probaron tamaños de viewport, no dispositivos físicos.
- No auditoría completa WCAG; hay controles etiquetados, foco visible, navegación de teclado básica y consideración de movimiento reducido.
- Esta ejecución local no verifica el control de acceso de Sites. Esa verificación corresponde al registro separado del despliegue. `noindex` no sustituye autenticación.
- El navegador integrado no pudo inicializar en este entorno; las pruebas de desarrollo usaron Chromium headless ya instalado.

Ver `HOSTING_PENDING.md` para el historial de autorización y el flujo privado de publicación.
