# Deploy en Dokploy

## Requisitos previos

1. **MongoDB Atlas** - Base de datos externa (no se deploya en Dokploy)
   - Crear cluster en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Obtener connection string: `mongodb+srv://<user>:<password>@cluster.mongodb.net/nicole-trend-shop`
   - Whitelist `0.0.0.0/0` o la IP del servidor de Dokploy

2. **Dokploy** instalado y funcionando

## Deploy en Dokploy

### 1. Crear aplicación en Dokploy

1. Ir a **Applications** → **Create Application**
2. Name: `nicole-srl`
3. Source: **Git Repository**
4. Repository URL: `https://github.com/TU_USUARIO/nicole-srl.git`
5. Branch: `main`

### 2. Configurar Docker Compose

En la sección de **Docker Compose** del proyecto, usar el `docker-compose.yml` del repo.

### 3. Variables de entorno

Configurar en Dokploy → Application → Environment Variables:

| Variable | Descripción | Ejemplo |
|---|---|---|
| `MONGODB_URI` | Connection string de MongoDB Atlas | `mongodb+srv://user:pass@cluster.mongodb.net/nicole-trend-shop` |
| `JWT_SECRET` | Clave secreta para JWT tokens | `clave-larga-aleatoria-123` |
| `VITE_API_URL` | URL del backend | `https://api.tudominio.com` |

### 4. Puertos

- **Server**: exponer puerto `3001`
- **Frontend**: exponer puerto `80`

### 5. Deploy

1. Click en **Deploy**
2. Verificar logs:
   - Server: debe mostrar `✅ MongoDB conectado` y `🚀 Servidor en http://localhost:3001`
   - Frontend: debe iniciar nginx correctamente

## Estructura del stack

```
┌─────────────┐     ┌──────────────┐     ┌──────────────────┐
│  Frontend   │────▶│   Server     │────▶│  MongoDB Atlas   │
│  Nginx:80   │     │  Node:3001   │     │  (externo)       │
└─────────────┘     └──────────────┘     └──────────────────┘
     Puerto 80            Puerto 3001        Cloud
```

## CI/CD con Webhook

1. Dokploy genera un webhook URL para la aplicación
2. Configurar en GitHub → Repo → Settings → Webhooks:
   - Payload URL: `<webhook-url-de-dokploy>`
   - Content type: `application/json`
   - Events: `Just the push event`

```bash
git add .
git commit -m "descripcion"
git push
# Dokploy redeploy automático
```

### 3. MongoDB

MongoDB se ejecuta **fuera** del contenedor:

**MongoDB Atlas** (recomendado):
- `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/nicole`

**Contenedor separado**:
```bash
# Logs desde Dokploy dashboard
# O via SSH al servidor:
docker logs nicole-server
docker logs nicole-frontend
docker ps
```

## Troubleshooting

| Problema | Solución |
|---|---|
| Server no conecta a MongoDB | Verificar `MONGODB_URI` y IP whitelist en Atlas |
| Frontend no conecta al server | Verificar `VITE_API_URL` y rebuild del frontend |
| Healthcheck falla | Esperar 30s, verificar logs del server |
