FROM worleydl/nginx-grunt:v2

# Add the code
ADD . /code
WORKDIR /code

# Install dependencies
RUN npm install
RUN bower --allow-root install -g

# Build and deploy
RUN grunt build:dist

RUN rm -rf /usr/share/nginx/html/*
RUN cp -r dist/* /usr/share/nginx/html/.

# Start nginx
ENTRYPOINT ["/usr/sbin/nginx",  "-g", "daemon off;"] 
