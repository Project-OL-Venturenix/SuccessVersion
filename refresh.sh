chmod +x refresh.sh
mvn -f ./backend_oscar clean install

docker-compose build
docker-compose up -d