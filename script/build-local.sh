docker build -f script/Dockerfile -t social-idp:local .

docker stop social-idp || true
docker rm social-idp || true

docker run -d -p 3050:3001 --restart always --name social-idp --network pruebaslocal social-idp:local