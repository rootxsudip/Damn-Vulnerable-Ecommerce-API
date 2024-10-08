# Use Node.js official image
FROM node:18

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000 for the app
EXPOSE 5001

# Set an environment variable for MongoDB connection
ENV MONGODB_URI=mongodb://mongo:27017/damn_vulnerable_ecommerce

# Start the Node.js app
CMD ["node", "src/index.js"]
