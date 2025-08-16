FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker layer caching
COPY package*.json ./
COPY pnpm-lock.yaml* ./


# Install application dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy the rest of your application code
COPY . .

# Expose the port your Express app listens on
EXPOSE 5000

# Command to run your application
CMD ["pnpm", "run", "start:dev"]

