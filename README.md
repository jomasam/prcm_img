# prcm_img
Obtiene todas las imágenes desde una lista alojada en prcm.jp

## Para extraer:

- Desde el navegador, acceda a la lista a descargar, siguiendo el formato `https://prcm.jp/list/{keyword}`
- Abra el inspector de elementos -> consola y copie el codigo del script. Recomiendo modificar `maxPages` para que se ajuste al total de paginas existentes.
- Guarde la respuesta dentro de un txt. Si aun existen img con formato _xxxXxxx, puede limpiarlos con la expresion regular `_\d{3}x\d{3}`.

## Para descargar:

Puede utilizar el script adjunto dentro de la carpeta `Download`. Solo copie el txt creado con anterioridad a la raiz del script. Las imagenes se guardarán dentro de la carpeta "imagenes_descargadas".

Asegúrese de tener instalado python y la libreria requests


`pip install requests`

`python download_img.py`

## Agradecimientos

Thanks @LoveyouMojang for the codebase: 

https://www.reddit.com/r/DataHoarder/comments/1depgw6/need_help_figuring_how_do_archive_part_of_a/
