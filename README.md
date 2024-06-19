# prcm_img
Obtiene todas las imágenes contenidas en una lista

## Para extraer:

- Desde el navegador, acceda a la lista a descargar, siguiendo el formato `https://prcm.jp/list/{keyword}`
- Abra el inspector de elementos y copie el codigo del script. Recomiendo modificar `maxPages` para que se ajuste al total de paginas existentes.
- Guarde la respuesta dentro de un txt. Puede limpiar el formato _200x300 con la expresion regular `_\d{2}x\d{3}`

## Para descargar:

Puede utilizar el script python adjunto. Solo copie el txt creado con anterioridad a la raiz del script. Las imagenes se guardarán dentro de la carpeta "imagenes_descargadas".
