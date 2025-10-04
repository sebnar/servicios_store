# 🐳 Servicios Store - Despliegue Simple con Docker

## 🚀 Despliegue en un Solo Archivo

Esta configuración te permite desplegar toda la aplicación (Frontend, Backend, Base de Datos) con un solo Dockerfile.

## 📋 Prerrequisitos

- Docker instalado
- Al menos 4GB de RAM disponible
- Puertos 3000, 5000 y 27017 libres

## ⚡ Inicio Rápido

### Windows
```bash
# Ejecutar el script de construcción y ejecución
build-and-run.bat
```

### Linux/Mac
```bash
# Hacer ejecutables los scripts
chmod +x build-and-run.sh stop.sh logs.sh

# Ejecutar el script de construcción y ejecución
./build-and-run.sh
```

### Manual
```bash
# Construir la imagen
docker build -t servicios-store .

# Ejecutar el contenedor
docker run -d \
  --name servicios-store \
  -p 3000:3000 \
  -p 5000:5000 \
  -p 27017:27017 \
  -v servicios-store-data:/data/db \
  -v servicios-store-uploads:/app/uploads \
  servicios-store
```

## 🌐 URLs de Acceso

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017

## 📊 Comandos Útiles

### Ver estado del contenedor
```bash
docker ps
```

### Ver logs en tiempo real
```bash
# Windows
logs.bat

# Linux/Mac
./logs.sh

# Manual
docker logs -f servicios-store
```

### Detener la aplicación
```bash
# Windows
stop.bat

# Linux/Mac
./stop.sh

# Manual
docker stop servicios-store
```

### Reiniciar la aplicación
```bash
docker restart servicios-store
```

## 🔧 Gestión de Datos

### Backup de la base de datos
```bash
# Crear backup
docker exec servicios-store mongodump --out /data/backup

# Copiar backup al host
docker cp servicios-store:/data/backup ./backup
```

### Restaurar backup
```bash
# Copiar backup al contenedor
docker cp ./backup servicios-store:/data/backup

# Restaurar
docker exec servicios-store mongorestore /data/backup
```

## 🐛 Solución de Problemas

### Error: Puerto en uso
```bash
# Verificar qué proceso usa el puerto
netstat -ano | findstr :3000
netstat -ano | findstr :5000
netstat -ano | findstr :27017

# Detener el proceso o cambiar el puerto en el comando docker run
```

### Error: No se puede conectar a la aplicación
```bash
# Verificar que el contenedor esté ejecutándose
docker ps

# Ver logs para identificar el problema
docker logs servicios-store
```

### Error: Base de datos no inicializada
```bash
# Reiniciar el contenedor
docker restart servicios-store

# Ver logs de inicialización
docker logs servicios-store | grep "Inicializando"
```

## 🧹 Limpieza

### Detener y eliminar contenedor
```bash
docker stop servicios-store
docker rm servicios-store
```

### Eliminar imagen
```bash
docker rmi servicios-store
```

### Limpiar volúmenes
```bash
docker volume rm servicios-store-data servicios-store-uploads
```

### Limpieza completa
```bash
docker system prune -a
```

## 📝 Estructura del Proyecto

```
servicios_store/
├── Dockerfile                 # Dockerfile único
├── start-all.sh              # Script de inicio de todos los servicios
├── init-database.js          # Script de inicialización de BD
├── build-and-run.bat        # Script de construcción (Windows)
├── build-and-run.sh         # Script de construcción (Linux/Mac)
├── stop.bat                 # Script de parada (Windows)
├── stop.sh                  # Script de parada (Linux/Mac)
├── logs.bat                 # Script de logs (Windows)
├── logs.sh                  # Script de logs (Linux/Mac)
├── backend/                 # Código del backend
└── frontend/                # Código del frontend
```

## 🔒 Configuración de Seguridad

### Cambiar credenciales por defecto
1. Edita el archivo `start-all.sh`
2. Cambia las variables de entorno:
   ```bash
   export JWT_SECRET=tu_clave_secreta_aqui
   export MONGODB_URI=mongodb://localhost:27017/tu_base_datos
   ```
3. Reconstruye la imagen: `docker build -t servicios-store .`

## 📈 Monitoreo

### Ver uso de recursos
```bash
docker stats servicios-store
```

### Ver información del contenedor
```bash
docker inspect servicios-store
```

### Conectar al contenedor
```bash
docker exec -it servicios-store bash
```

## 🚀 Despliegue en Producción

### 1. Configurar variables de entorno
Edita `start-all.sh` con valores de producción.

### 2. Configurar dominio
Cambia `localhost` por tu dominio en la configuración.

### 3. Configurar SSL/TLS
Usa un proxy reverso como nginx o traefik.

### 4. Configurar backup automático
```bash
# Script de backup diario
docker exec servicios-store mongodump --out /data/backup/$(date +%Y%m%d)
```

## 📝 Notas Importantes

- **Todos los servicios** están en un solo contenedor
- **Los datos** se almacenan en volúmenes persistentes
- **La aplicación** se inicializa automáticamente
- **Los archivos subidos** se almacenan en `/app/uploads`

## 🆘 Soporte

Si tienes problemas:

1. **Verifica Docker**: `docker --version`
2. **Revisa logs**: `docker logs servicios-store`
3. **Verifica puertos**: Asegúrate de que estén libres
4. **Limpia sistema**: `docker system prune -a` (¡cuidado!)

## 🎉 ¡Listo!

Tu aplicación Servicios Store está lista para ejecutarse con un solo comando:

**Windows**: `build-and-run.bat`
**Linux/Mac**: `./build-and-run.sh`

¡Disfruta de tu aplicación containerizada! 🚀
