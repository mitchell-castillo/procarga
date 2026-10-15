# Pro Carga · Carruseles y videos visibles

15 de octubre de 2026 · Actualización a partir de las nuevas observaciones del propietario.

## Imagen del interior

Se retiraron el emblema, el nombre y el lema superpuestos en la esquina inferior derecha mediante la herramienta integrada ImageGen. Se reconstruyó la zona de cuero y se conservó el interior, el techo panorámico y el encuadre. La salida seleccionada se optimizó a WebP; no se modificaron los originales del cliente.

- Recurso publicado: `dist/assets/fleet/suburban-panorama-clean.webp` (1280 × 1207, 100.676 bytes).
- Variante para móvil: `dist/assets/fleet/suburban-panorama-clean-640.webp` (640 × 603, 33.794 bytes).
- Prompt exacto: [scripts/prompts/suburban-logo-removal.txt](scripts/prompts/suburban-logo-removal.txt).

La portada de Pro Luxury, las miniaturas y la foto ampliada usan la versión limpia. El script histórico de conversión de medios conserva su función de optimizar los originales; no reproduce la edición generativa, cuyo prompt se guarda por separado.

## Carruseles

Se conservaron las dos composiciones divididas entre texto y fotografía. Pro Luxury alterna dos fotos; grupos alterna las cuatro del Toyota, dos exteriores y dos interiores. Las imágenes avanzan cada seis segundos cuando el carrusel está visible.

Cada carrusel incluye pausa/reanudación, flechas, indicadores y acceso a la foto completa. La rotación se detiene con el puntero o foco dentro de la galería, con una foto ampliada abierta, con la pestaña oculta o mientras se reproduce un video. Usar flechas o indicadores pausa la rotación hasta que el visitante la reanude. Con la preferencia de reducir movimiento empieza en pausa; el visitante puede iniciarlo explícitamente.

## Videos

Los tres clips ya no están dentro de un diálogo. Aparecen directamente en «Tu traslado, en movimiento», con póster, botón de reproducción y controles nativos. En escritorio se ven los tres; en móvil se presentan en una fila desplazable, con la siguiente tarjeta visible y una indicación de deslizar. Se conservan los clips optimizados del interior, la llegada al hotel y el exterior junto al mar.

No se descargan los MP4 al entrar a la página ni se reproducen por sí solos. Al reproducir uno se pausan los otros y los carruseles. Cambiar de pestaña pausa el video.

## Disponibilidad del minibús

La conversación del cliente indica una incorporación futura. La página ES/EN muestra «Incorporación prevista · diciembre de 2026» y lo aclara en la consulta de vehículos, sin afirmar una disponibilidad actual o una fecha de entrega garantizada.

## Validación

9 pruebas unitarias y 35 comprobaciones de navegador aprobadas: reproducción y decodificación de los tres videos visibles, pausa entre clips, avance automático real tras seis segundos, estabilidad al pausar, preferencia de reducir movimiento, cuatro fotos del Toyota, foto limpia en todas sus ubicaciones y flujo de cotización ES/EN. Sin desbordamiento a 320, 390, 768 y 1440 px; menú probado también al redimensionar 900 → 1200 → 900. Sin errores de consola ni peticiones externas durante las pruebas locales.

Informe: `evidence/browser-report.json`. Capturas locales: `evidence/media-*.png`. Las decisiones de estructura centrada en el servicio se conservan en [SERVICE-EXPERIENCE.md](SERVICE-EXPERIENCE.md).
