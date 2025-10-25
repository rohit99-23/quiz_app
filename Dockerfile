# Step 1: Use your existing Docker image as base
FROM errohit07/rohit

# Step 2: Copy updated website files into container
COPY . /usr/share/nginx/html

# Step 3: Expose container port 80 (Nginx default)
EXPOSE 80

# Step 4: Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
