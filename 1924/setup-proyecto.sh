#!/bin/bash

echo "🚀 Iniciando setup de entorno para tu proyecto Nunjucks + Express + MongoDB..."

# 1. Inicializar proyecto si no hay package.json
if [ ! -f "package.json" ]; then
  echo "📝 No se encontró package.json, creando uno..."
  yarn init -y
else
  echo "✅ package.json ya existe, continuando..."
fi

# 2. Agregar dependencias (solo si no están)
echo "📦 Instalando dependencias principales..."

add_if_missing() {
  PACKAGE=$1
  DESC=$2
  if ! yarn list --pattern "$PACKAGE" | grep "$PACKAGE" > /dev/null 2>&1; then
    echo "➕ Instalando $PACKAGE ($DESC)"
    yarn add "$PACKAGE"
  else
    echo "✅ $PACKAGE ya está instalado"
  fi
}

# Dependencias normales
add_if_missing express "Servidor web"
add_if_missing nunjucks "Motor de plantillas"
add_if_missing mongoose "ODM para MongoDB"
add_if_missing cors "Permite peticiones cruzadas"
add_if_missing dotenv "Manejo de variables de entorno"
add_if_missing jsonwebtoken "JWT auth"
add_if_missing express-session "Manejo de sesiones"
add_if_missing connect-mongo "Sesiones guardadas en MongoDB"
add_if_missing bcrypt "Encriptado de contraseñas"
add_if_missing bcryptjs "Alternativa a bcrypt (más compatible)"
add_if_missing socket.io "Sockets en el servidor"
add_if_missing socket.io-client "Sockets en el cliente"
add_if_missing ws "WebSockets puro"

# Dev dependencies
echo "🧪 Instalando dependencias de desarrollo..."
yarn add -D @babel/core @babel/preset-env @babel/preset-react babel-loader \
  babel-plugin-module-resolver chokidar connect-livereload css-loader \
  livereload nodemon style-loader webpack webpack-cli webpack-dev-server

echo "✅ Setup completo. ¡Listo para arrancar!"

# 3. Crear script start si no existe
if ! grep -q "\"start\":" package.json; then
  echo "⚙️ Añadiendo script start en package.json..."
  npx json -I -f package.json -e 'this.scripts={...this.scripts, "start":"nodemon server.js"}'
fi

echo "🟢 Ahora puedes correr: yarn start"
