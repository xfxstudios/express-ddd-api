cd ~/$REMOTE_PATH/script

echo "::::::::::::: DOCKER LOGIN :::::::::::::"
sudo docker login --username $DOCKER_HUB_USERNAME --password $DOCKER_HUB_PASSWORD

echo "::::::::::::: GET DOCKER IMAGE :::::::::::::"
sudo docker pull $IMAGE_NAME


echo "::::::::::::: DELETE SERVICE :::::::::::::"
if [[ $(docker ps | grep "${CONTAINER_NAME}") == *"${CONTAINER_NAME}"* ]]; then
  echo "Eliminando Servicio"
  sudo docker stop "${CONTAINER_NAME}"
  sudo docker rm "${CONTAINER_NAME}"
fi

echo "::::::::::::: RUN SERVICE :::::::::::::"
docker run -d -p 3010:3001 --env-file .env --restart always --name $CONTAINER_NAME $IMAGE_NAME