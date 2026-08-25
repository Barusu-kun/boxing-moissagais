import os
import re
import urllib.parse
import urllib.request

# Dossier où stocker les fichiers
OUTPUT_DIR = "assets"
HTML_FILE = "index.html"
UPDATED_HTML_FILE = "index.html"

os.makedirs(OUTPUT_DIR, exist_ok=True)

with open(HTML_FILE, "r", encoding="utf-8") as f:
    content = f.read()

# Expression régulière pour détecter les ressources externes
pattern = r'https?://[^"\'\s\)><]+?\.(?:png|jpg|jpeg|webp|gif|svg|mp4|pdf|docx|woff2|woff|ttf|css|js)(?:\?[^"\'\s\)><]*)?'

urls = set(re.findall(pattern, content, re.IGNORECASE))

# Cas particulier : liens de téléchargement de documents encodés
encoded_docs = set(re.findall(r'downloadDigitalFile\.php\?url=(https%3A%2F%2F[^"\'\s><]+)', content))
for enc_url in encoded_docs:
    urls.add(urllib.parse.unquote(enc_url))

print(f"Trouvé {len(urls)} ressources à télécharger...")

headers = {'User-Agent': 'Mozilla/5.0'}

url_map = {}

for url in urls:
    try:
        clean_url = urllib.parse.unquote(url)
        parsed = urllib.parse.urlparse(clean_url)
        filename = os.path.basename(parsed.path)

        if not filename:
            continue

        # Nettoyage du nom de fichier
        filename = re.sub(r'[^\w\-_\.]', '_', filename)
        local_path = os.path.join(OUTPUT_DIR, filename)

        # Téléchargement
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(local_path, 'wb') as out_file:
            out_file.write(resp.read())

        # URL relative pour le HTML
        relative_path = f"./{OUTPUT_DIR}/{filename}"
        url_map[url] = relative_path
        print(f" [OK] {filename}")
    except Exception as e:
        print(f" [ERREUR] {url} -> {e}")

# Remplacement des URLs dans le HTML
for old_url, new_path in url_map.items():
    content = content.replace(old_url, new_path)

# Nettoyer les liens de redirection vers le script PHP de téléchargement
content = re.sub(r'https?://www\.boxing-moissagais\.com/versions/2/wizard/modules/fileManager/downloadDigitalFile\.php\?url=', '', content)

with open(UPDATED_HTML_FILE, "w", encoding="utf-8") as f:
    f.write(content)

print("\nTerminé ! Ton index.html a été mis à jour avec les fichiers locaux dans le dossier 'assets/'.")