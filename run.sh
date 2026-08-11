#!/usr/bin/env sh
set -e

IMAGE="zomahefaranaivo/portfolio"
TAG="${1:-latest}"
DATA_DIR="$(pwd)/data"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker n'est pas installe. Installe-le d'abord."
  exit 1
fi

if [ ! -f .env.local ]; then
  echo ""
  echo "Fichier .env.local introuvable."
  echo "Cree-le avec :"
  echo "  ADMIN_PASSWORD=ton_mot_de_passe"
  echo "  GROQ_API_KEY=ta_cle_groq"
  echo ""
  exit 1
fi

mkdir -p "${DATA_DIR}"

echo "Pull de l'image ${IMAGE}:${TAG}..."
docker pull "${IMAGE}:${TAG}"

echo ""
echo "Lancement du conteneur sur http://localhost:3000"
echo ""
echo "Commandes utiles :"
echo "  docker stop zm-portfolio   -> arreter le conteneur"
echo "  docker start zm-portfolio  -> relancer le conteneur"
echo "  docker rm zm-portfolio     -> supprimer le conteneur (apres stop)"
echo ""

docker rm -f zm-portfolio 2>/dev/null || true

docker run --name zm-portfolio \
  -p 3000:3000 \
  -v "${DATA_DIR}:/app/data" \
  --env-file .env.local \
  "${IMAGE}:${TAG}"
