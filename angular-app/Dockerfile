# Step 1: Build the Angular app
FROM node:20 AS build
WORKDIR /app
COPY ./* ./
RUN npm install
COPY . .
RUN npm run build --prod

# Step 2: Serve the app with NGINX
FROM nginx:alpine
COPY --from=build /app/dist/mangodb-angualr/browser /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
