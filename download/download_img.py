import os
import requests
import ast

# Nombre del archivo con las URLs
file_name = 'links.txt'

# Carpeta de destino
script_dir = os.path.dirname(os.path.abspath(__file__))
output_folder = os.path.join(script_dir, 'imagenes_descargadas')

# Crea la carpeta si no existe
if not os.path.exists(output_folder):
    os.makedirs(output_folder)


def download_image(url, folder):
    try:
        response = requests.get(url)
        response.raise_for_status() 
        image_name = os.path.basename(url)
        image_path = os.path.join(folder, image_name)
        with open(image_path, 'wb') as file:
            file.write(response.content)
        print(f'Imagen descargada: {image_name}')
    except requests.exceptions.RequestException as e:
        print(f'Error descargando {url}: {e}')

# Lee las URLs del txt y las descarga
try:
    with open(file_name, 'r') as file:
        urls_str = file.read()
        urls_list = ast.literal_eval(urls_str)  # convierte el texto a una lista
        for url in urls_list:
            if url.startswith("http"):  # Verifica que la URL comience con http
                download_image(url, output_folder)
            else:
                print(f'URL no válida: {url}')
except FileNotFoundError:
    print(f'No se encontró el archivo: {file_name}')
except ValueError as ve:
    print(f'Error al leer el archivo: {ve}')

print('Descarga de imagenes completada.')
