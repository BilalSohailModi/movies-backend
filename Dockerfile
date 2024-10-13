# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

RUN npm install -g @nestjs/cli

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port on which the NestJS app will run
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
