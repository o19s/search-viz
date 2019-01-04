# search-viz

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## To run in docker
`docker build -t search-viz .`

`docker run -d -p 8080:80 --name=search-viz search-viz`

or just run `run-it.sh`

## To deploy on digital ocean
Login to harbor.dev.o19s.com (insecure registry setting may need to be set)
`docker-compose up -d -f docker-compose.digitalocean.yml`

## Testing

Running `grunt test` will run the unit tests with karma.
