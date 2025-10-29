# 1️⃣ Base Image
FROM node:18-alpine

# 2️⃣ Set Working Directory
WORKDIR /app

# 3️⃣ Copy package.json first (for caching)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install --only=production

# 5️⃣ Copy everything else (index.js + src/)
COPY . .

# 6️⃣ Expose port
EXPOSE 8001

# 7️⃣ Set environment
ENV NODE_ENV=production

# 8️⃣ Start server
CMD ["node", "index.js"]
