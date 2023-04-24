#!/bin/bash
git pull origin $(git rev-parse --abbrev-ref HEAD)
npm run build
pm2 restart ecosystem.config.js
