# Deploy con Portainer

## Dockerfile (producción)

Un solo contenedor que incluye frontend + backend:

```bash
docker build --build-arg VITE_API_URL=http://TU_DOMINIO:3001 -t nicole-srl .
docker run -d -p 3001:3001 \
  -e MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/nicole \
  -e JWT_SECRET=tu-clave-secreta \
  --name nicole-srl \
  nicole-srl
```

## Portainer — Deploy automático con Git

### 1. Configurar Stack

1. Portainer → **Stacks** → **Add stack**
2. Name: `nicole-srl`
3. **Build method**: Git repository
4. Repository URL: tu repo
5. Branch: `main`
6. **Environment variables**:

| Variable | Descripción |
|---|---|
| `MONGODB_URI` | Connection string de MongoDB (Atlas o externo) |
| `JWT_SECRET` | Clave secreta para tokens JWT |
| `VITE_API_URL` | URL del servidor (ej: `http://TU_IP:3001`) |

7. ✅ **Activate webhooks** → copia la URL
8. **Deploy the stack**

### 2. Webhook en GitHub

GitHub → Settings → Webhooks → Add webhook:
- Payload URL: URL del webhook de Portainer
- Content type: `application/json`
- Events: Just the push event

### 3. MongoDB

MongoDB se ejecuta **fuera** del contenedor:

**MongoDB Atlas** (recomendado):
- Configura `MONGODB_URI` con tu connection string

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

- Frontend: `http://localhost:80` (Vite con hot-reload)
- Backend: `http://localhost:3001` (nodemon)
- Mongo Express: `http://localhost:8081`

## Estructura de archivos

```
├── Dockerfile              # Producción (multi-stage)
├── docker-compose.yml      # Desarrollo local
├── Dockerfile.server.dev   # Dev server con nodemon
├── Dockerfile.frontend.dev # Dev frontend con Vite
├── .dockerignore           # Excluye archivos del build prod
└── DEPLOY.md               # Esta guía
```
