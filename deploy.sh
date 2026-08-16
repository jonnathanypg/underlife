#!/usr/bin/env bash

# ==============================================================================
# FUNDACIÓN UNDERLIFE — Zero-Downtime Production Deployment Script (deploy.sh)
# ==============================================================================
# Empaqueta, compila y despliega el sitio web Next.js en producción
# utilizando PM2 para ejecución persistente, alta disponibilidad y cero latencia.
# ==============================================================================

set -e

APP_NAME="underlife-prod"
PORT="${PORT:-3000}"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 [1/5] Iniciando despliegue de producción para: $APP_NAME"
echo "📂 Directorio: $PROJECT_DIR"
echo "🔌 Puerto objetivo: $PORT"

cd "$PROJECT_DIR"

# 1. Asegurar dependencias y Prisma Client
echo "📦 [2/5] Generando Prisma Client y verificando dependencias..."
npx prisma generate

# 2. Compilar Build Optimizado de Producción
echo "⚡ [3/5] Creando build de producción optimizado (Next.js)..."
rm -rf .next
npm run build

# 3. Liberar puerto si está ocupado por procesos huérfanos
echo "🧹 [4/5] Limpiando procesos previos en el puerto $PORT..."
if command -v lsof >/dev/null 2>&1; then
  PID=$(lsof -ti :$PORT || true)
  if [ -n "$PID" ]; then
    echo "⚠️  Liberando puerto $PORT (PID: $PID)..."
    kill -9 $PID 2>/dev/null || true
  fi
fi

# 4. Iniciar / Recargar con PM2 o Fallback nativo
echo "🚀 [5/5] Levantando servidor de producción con PM2..."
if command -v pm2 >/dev/null 2>&1; then
  pm2 delete "$APP_NAME" 2>/dev/null || true
  pm2 start ecosystem.config.js --env production
  pm2 save
  echo "✅ Aplicación corriendo con PM2: http://localhost:$PORT"
  pm2 status "$APP_NAME"
else
  echo "⚠️  PM2 no detectado globalmente. Iniciando en segundo plano con node server.js..."
  NODE_ENV=production PORT=$PORT nohup node server.js > /tmp/underlife-production.log 2>&1 &
  echo "✅ Servidor de producción iniciado en segundo plano (PID: $!)."
  echo "📄 Logs en: /tmp/underlife-production.log"
fi

echo "=============================================================================="
echo "🎉 ¡DESPLIEGUE COMPLETADO CON ÉXITO!"
echo "🌐 URL Local: http://localhost:$PORT"
echo "=============================================================================="
