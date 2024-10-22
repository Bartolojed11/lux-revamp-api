# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of the project files into the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# -d "node_modules" - If true, it will start run start, otherwise install packages and run dev
CMD [ -d "node_modules" ] && npm run start || npm install && npm run start
