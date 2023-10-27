cd ~/$REMOTE_PATH/script

sudo sed -i "s|image-name|$IMAGE_NAME|g" ./environment/$ENVIRONMENT/docker-compose.yml
sudo sed -i "s|port-in|$PORT_IN|g" ./environment/$ENVIRONMENT/docker-compose.yml
sudo sed -i "s|port-out|$PORT_OUT|g" ./environment/$ENVIRONMENT/docker-compose.yml
sudo sed -i "s|app-network|$NETWORK|g" ./environment/$ENVIRONMENT/docker-compose.yml
sudo sed -i "s|env-file|$ENVFILE|g" ./environment/$ENVIRONMENT/docker-compose.yml

sudo sed -i "s|app-volume|$SUBE_VOLUME|g" ./environment/$ENVIRONMENT/docker-compose.yml
sudo sed -i "s|app-logs|$SUBE_LOGS|g" ./environment/$ENVIRONMENT/docker-compose.yml

sudo sed -i "s|db_name|$DB_NAME|g" ./environment/$ENVIRONMENT/docker-compose.yml
sudo sed -i "s|db_host|$DB_HOST|g" ./environment/$ENVIRONMENT/docker-compose.yml
sudo sed -i "s|db_port|$DB_PORT|g" ./environment/$ENVIRONMENT/docker-compose.yml
sudo sed -i "s|db_user|$DB_USER|g" ./environment/$ENVIRONMENT/docker-compose.yml
sudo sed -i "s|db_password|$DB_PASSWORD|g" ./environment/$ENVIRONMENT/docker-compose.yml

echo "::::::::::::: DOCKER LOGIN :::::::::::::"
sudo docker login --username $DOCKER_HUB_USERNAME --password $DOCKER_HUB_PASSWORD

echo "::::::::::::: GET DOCKER IMAGE :::::::::::::"
sudo docker pull $IMAGE_NAME


echo "::::::::::::: DELETE SERVICE :::::::::::::"
if [[ $(docker service ls | grep "${CONTAINER_NAME}_api") == *"${CONTAINER_NAME}_api"* ]]; then
  echo "Eliminando Servicio"
  sudo docker service rm "${CONTAINER_NAME}_api"
  sudo docker stack rm "${CONTAINER_NAME}_api"
fi

echo "::::::::::::: RUN SERVICE :::::::::::::"
sudo docker stack deploy -c ./environment/$ENVIRONMENT/docker-compose.yml $CONTAINER_NAME