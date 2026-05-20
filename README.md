# Nicole SRL - Proyectos

## Estructura

```
nicole/
├── nicole-srl-server/     # Backend API (Express + MongoDB)
├── nicole-srl-frontend/   # Frontend (React + Vite)
└── docker-compose.prod.yml # Deploy conjunto (producción)
```

## Deploy en Portainer

### Opción A: Stack completo (recomendado)

1. Portainer → **Stacks** → **Add stack** → **Git Repository**
2. Repository URL: tu repo
3. Branch: `main`
4. Compose path: `docker-compose.prod.yml`
5. **Environment variables**:

| Variable | Descripción | Ejemplo |
|---|---|---|
| `MONGODB_URI` | Connection string MongoDB | `mongodb+srv://user:pass@cluster.mongodb.net/nicole` |
| `JWT_SECRET` | Clave para tokens JWT | `clave-larga-aleatoria` |
| `VITE_API_URL` | URL del backend | `http://TU_DOMINIO:3001` |

6. ✅ **Activate webhooks**
7. **Deploy the stack**

### Opción B: Proyectos separados

Ver `nicole-srl-server/DEPLOY.md` y `nicole-srl-frontend/DEPLOY.md`

## Desarrollo local

### Backend
```bash
cd nicole-srl-server
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd nicole-srl-frontend
cp .env.example .env
npm install
npm run dev
```
