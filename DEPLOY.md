# Deploy con Portainer

## Arquitectura

```
┌──────────────────────────────────┐
│         Contenedor único          │
│  ┌──────────┐  ┌───────────────┐ │
│  │  Nginx   │  │   Express     │ │
│  │  Puerto  │  │   Puerto      │ │
│  │    80    │  │    3001       │ │
│  │(frontend)│  │  (API)        │ │
│  └──────────┘  └───────────────┘ │
└──────────────────────────────────┘
```

- **Nginx:80** → Frontend estático (SPA con gzip + cache)
- **Express:3001** → API REST + MongoDB
- **Supervisord** → Gestiona ambos procesos

## Portainer — Deploy automático

### 1. Configurar Application

1. Portainer → **Applications** → **Add application** → **Git Repository**
2. Name: `nicole-srl`
3. Repository URL: tu repo
4. Branch: `main`
5. **Dockerfile**: `Dockerfile`
6. **Build args**: `VITE_API_URL=http://TU_DOMINIO:3001`
7. **Environment variables**:

| Variable | Descripción |
|---|---|
| `MONGODB_URI` | Connection string MongoDB (Atlas o externo) |
| `JWT_SECRET` | Clave secreta JWT |

8. **Publish ports**: `80` y `3001`
9. ✅ **Activate webhooks**
10. **Deploy**

### 2. Webhook en GitHub

GitHub → Settings → Webhooks → Add webhook:
- Payload URL: URL del webhook de Portainer
- Content type: `application/json`
- Events: Just the push event

### 3. MongoDB

MongoDB se ejecuta **fuera** del contenedor:

**MongoDB Atlas** (recomendado):
- `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/nicole`

**Contenedor separado**:
```bash
docker run -d --name nicole-mongo \
  -p 27017:27017 \
  -v mongo-data:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=tu-password \
  --restart unless-stopped \
  mongo:7.0
```

## Desarrollo local

```bash
docker compose up -d --build
```

- Frontend: `http://localhost:80` (Vite hot-reload)
- Backend: `http://localhost:3001` (nodemon)
- Mongo Express: `http://localhost:8081`

## Estructura de archivos

```
├── Dockerfile              # Producción (multi-stage + supervisord)
├── docker-compose.yml      # Desarrollo local
├── Dockerfile.server.dev   # Dev server con nodemon
├── Dockerfile.frontend.dev # Dev frontend con Vite
├── nginx.conf              # Config Nginx producción
├── supervisord.conf        # Gestor de procesos (nginx + server)
├── .dockerignore           # Excluye archivos del build
└── DEPLOY.md               # Esta guía
```
