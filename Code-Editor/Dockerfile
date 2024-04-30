# Usage:
#
#    Build image:
#    docker build -t jojozhuang/code-editor-web .
#
#    Run image (on localhost:9010):
#    docker run -d --name code-editor-web -p 9010:80 jojozhuang/code-editor-web
#
#    Run image as virtual host (read more: https://github.com/nginx-proxy/nginx-proxy):
#    docker run -e VIRTUAL_HOST=code-editor-web --name code-editor-web jojozhuang/code-editor-web

# Stage 1, based on Node.js, to build and compile Angular
# Docker

# Build for production. All the compiled html files and js files will be generated in dist.
# npm run build

# Create image with nginx for frontend.
# docker build -t jojozhuang/code-editor-web .

# Create image with node for backend.
# docker build -t jojozhuang/code-editor-server . -f Dockerfile-server

# Create container.
# docker run --name code-editor-web -p 9010:80 -d jojozhuang/code-editor-web
# docker run --name code-editor-server -p 9011:80 -d jojozhuang/code-editor-server

FROM node:16.13.1-alpine as builder

WORKDIR /react-app

COPY package*.json webpack*.js .babelrc ./
COPY ./src/client ./src/client
COPY ./public ./public

RUN npm install --force && npm ci --quiet && npm run build

# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx

FROM nginx:1.19.8-alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /react-app/dist /usr/share/nginx/html