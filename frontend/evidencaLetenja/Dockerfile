# Use a Node.js image to build the app
FROM node:20 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package and lock files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend code into the container
COPY . .

# Build the app for production
RUN npm run build

# Use a lightweight Node.js image to run the app
FROM node:20-slim

# Set working directory for the runtime container
WORKDIR /app

# Copy the built app from the builder stage
COPY --from=builder /app/build .

# Install necessary dependencies for serving
RUN npm install -g serve

# Expose port 3000 for the app
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "."]
