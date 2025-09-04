#!/bin/bash

# Build script for Vercel frontend deployment
echo "Building TOOLBAY Frontend..."

# Install dependencies
npm ci

# Build the project
npm run build

# Copy build files to output directory
echo "Build completed successfully!"