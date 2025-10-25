# Step 1: Use your existing Docker image as base
FROM errohit07/rohit:v1

# Step 2: Copy updated website files into container
COPY . /usr/share/nginx/html

ENV PATH="/usr/sbin:${PATH}"

# Step 3: Expose container port 80 (Nginx default)
EXPOSE 80

# Step 4: Start Nginx in foreground
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]

