# Use the lightweight Nginx Alpine image
FROM nginx:alpine

# Copy all static project files to the default Nginx HTML directory
COPY . /usr/share/nginx/html/

# Expose port 80 for access
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
