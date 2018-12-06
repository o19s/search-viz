docker build -t search-viz .
docker run -d -p 8080:80 --name=search-viz search-viz
