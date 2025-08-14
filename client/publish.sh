#!/bin/bash

# Install .NET SDK
curl -sSL https://dot.net/v1/dotnet-install.sh | bash /dev/stdin --channel 8.0
export PATH="$HOME/.dotnet:$PATH"

# Publish the application
dotnet publish -c Release -o publish

# Copy wwwroot to the output directory expected by Vercel
cp -r publish/wwwroot/* ./
