# Deploy Automático con Portainer

## Configuración inicial (una sola vez)

### 1. Portainer → Git Repository

1. Portainer → **Environments** → tu entorno
2. **Stacks** → **Add stack**
3. Name: `nicole-srl`
4. **Build method**: Git repository
5. Repository URL: `https://github.com/TU_USUARIO/nicole-srl.git`
6. Repository reference: `main` (o tu rama)
7. Compose path: `docker-compose.yml`
8. **Environment variables**:

| Variable | Valor | Descripción |
|---|---|---|
| `MONGO_PASSWORD` | `TuPasswordSeguro` | Password de MongoDB |
| `JWT_SECRET` | `clave-larga-aleatoria` | Secret para JWT tokens |
| `VITE_API_URL` | `http://TU_IP_O_DOMINIO:3001` | URL del backend |

9. ✅ **Activate webhooks** → copia el webhook URL
10. **Deploy the stack**

### 2. Configurar webhook en GitHub

```bash
# En GitHub → Repo → Settings → Webhooks → Add webhook
# Payload URL: <webhook-url-de-portainer>
# Content type: application/json
# Events: Just the push event
```

## Flujo de trabajo

```bash
# Hacer cambios
git add .
git commit -m "descripcion"
git push

# Portainer detecta el push via webhook → rebuild automático → deploy
```

## Verificar deploy

```bash
# Logs en Portainer → nicole-server → Logs
# O via SSH:
docker compose logs -f server
docker compose ps
```

## Estructura del stack

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Frontend   │────▶│   Server     │────▶│    Mongo     │
│  Nginx:80   │     │  Node:3001   │     │   mongo:7.0  │
└─────────────┘     └──────────────┘     └──────────────┘
     Puerto 80            Puerto 3001        Volumen persistente
```

- **Frontend**: Nginx Alpine, estáticos con gzip + cache
- **Server**: Node 22 Alpine, solo deps de producción
- **Mongo**: 7.0 con healthcheck antes de iniciar server

## Variables de entorno

Todas tienen valores por defecto. Para producción, configura en Portainer:

| Variable | Default | Requerido |
|---|---|---|
| `MONGO_USER` | `admin` | No |
| `MONGO_PASSWORD` | `Nicole2024!` | **Sí** |
| `JWT_SECRET` | `your-super-secret-key...` | **Sí** |
| `VITE_API_URL` | `http://localhost:3001` | **Sí** (IP/dominio real) |
