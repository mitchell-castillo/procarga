# Historial de autorización y publicación privada

La primera entrega quedó local porque la delegación inicial prohibía crear credenciales y el registro de Sites devuelve una credencial efímera de escritura de fuente. No se intentó registrar ni desplegar en aquella fase.

Juan autorizó posteriormente crear la credencial temporal, limitada al repositorio de Pro Carga, para publicar la web privada. El padre transmitió la autorización específica y pidió continuar. Se mantuvieron las restricciones: no otras credenciales, cuentas, cambios de permisos, dominios, gastos, repos públicos o envíos de WhatsApp.

## Identidad registrada

- Site: `appgprj_6acec4214ed481918c3f171ee3031956`.
- Slug: `pro-carga-preview-oct2026`.
- Manifest persistido atómicamente con el helper oficial: `.openai/hosting.json`.
- Acceso comprobado antes de subir fuente: propietario solamente; ninguna persona externa, editor o grupo adicional.
- La credencial efímera permanece en memoria de sesión; se entrega únicamente por stdin al helper oficial para esta web. No se guarda en archivos ni se imprime.

## Fuente y despliegue

La web estática ya pasó 7 pruebas unitarias y 22 verificaciones locales de navegador. Se emplea `site-workflow.mjs` para preparar el repositorio del Site, subir un commit exacto y generar el paquete estático. No se despliega un commit distinto del que respalda el paquete.

Se usa la operación de publicación privada. El estado terminal, commit, versión, ID de despliegue, URL y verificación posterior se conservan en `evidence/deployment-final.json` al completar. Ese registro local de resultado no se incluye en el commit para evitar afirmar el éxito antes de que ocurra.

Si alguna fase falla, conservar el mismo Site, versión o despliegue retornados. Nunca volver a registrar otro Site ni ampliar la audiencia para resolver el fallo.
