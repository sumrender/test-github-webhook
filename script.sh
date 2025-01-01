#!/bin/bash

# Enable verbose mode to log all commands
set -x

# Go back one directory
cd ..

# Navigate to blog-meme-backend directory
cd blog-memes-backend || { echo "Failed to enter blog-memes-backend directory"; exit 1; }

# Pull the latest changes from the main branch
echo "Pulling the latest changes from origin/main..."
git pull origin main || { echo "Failed to pull latest changes"; exit 1; }

# Bring down any existing Docker containers
echo "Bringing down existing Docker containers..."
docker compose down || { echo "Failed to bring down Docker containers"; exit 1; }

# Bring up the Docker containers
echo "Starting Docker containers..."
docker compose up -d || { echo "Failed to start Docker containers"; exit 1; }

# Script completed successfully
echo "Backend update process completed successfully."
