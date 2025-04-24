# Usa una imagen base con Node y Puppeteer
FROM ghcr.io/puppeteer/puppeteer:latest

# Crea directorio de trabajo
WORKDIR /app

# Copia archivos del proyecto
COPY . .

# Instala dependencias
RUN npm install

# Expone el puerto 8080 (el que Railway espera)
EXPOSE 8080

# Comando para arrancar la app
CMD ["npm", "start"]
