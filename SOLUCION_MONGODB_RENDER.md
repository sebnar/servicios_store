# 🔧 Solución al Error de MongoDB en Render

## ❌ Error Actual
```
MongoDB desconectado
❌ Error conectando a MongoDB: MongooseServerSelectionError: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017
```

## 🔍 Causa del Problema

El error ocurre porque:
1. **La aplicación está intentando conectarse a `localhost:27017`** (base de datos local)
2. **En Render necesitas usar la base de datos MongoDB** que creaste en Render
3. **La variable de entorno `MONGODB_URI`** no está configurada en Render

## ✅ Solución Rápida

### 1. Crear Base de Datos MongoDB en Render

1. **Ve a [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" → "Database"**
3. **Configura:**
   - **Name**: `servicios-store-db`
   - **Database**: `MongoDB`
   - **Plan**: `Free`
4. **Click "Create Database"**

### 2. Obtener la URI de Conexión

1. **Ve a tu base de datos** en Render Dashboard
2. **Click en "Connect"**
3. **Copia la "External Connection String"**
4. **Debería verse así:**
   ```
   mongodb://admin:password@dpg-xxxxx-a.oregon-postgres.render.com:27017/servicios_store
   ```

### 3. Configurar Variable de Entorno

1. **Ve a tu servicio de backend** en Render Dashboard
2. **Click en "Environment"**
3. **Agregar variable:**
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb://admin:password@dpg-xxxxx-a.oregon-postgres.render.com:27017/servicios_store`
4. **Click "Save Changes"**

### 4. Redesplegar

1. **Click "Manual Deploy" → "Deploy latest commit"**
2. **O simplemente espera** a que se redesplegue automáticamente

## 🔧 Configuración Alternativa (Usando render.yaml)

Si prefieres usar `render.yaml`, agrega esto a tu archivo:

```yaml
services:
  - type: web
    name: servicios-store-backend
    env: docker
    dockerfilePath: ./Dockerfile
    plan: free
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
      - key: MONGODB_URI
        fromDatabase:
          name: servicios-store-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true

databases:
  - name: servicios-store-db
    plan: free
    databaseName: servicios_store
    user: admin
```

## 🚀 Verificación de la Configuración

### 1. Verificar Variables de Entorno
En Render Dashboard, ve a tu servicio → Environment, deberías ver:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://admin:password@dpg-xxxxx-a.oregon-postgres.render.com:27017/servicios_store
JWT_SECRET=tu_jwt_secret_aqui
```

### 2. Verificar Logs
En Render Dashboard, ve a tu servicio → Logs, deberías ver:
```
✅ MongoDB conectado: dpg-xxxxx-a.oregon-postgres.render.com
📊 Base de datos: servicios_store
```

## 🐛 Solución de Problemas

### Error: "MONGODB_URI not defined"
- **Causa**: Variable de entorno no configurada
- **Solución**: Agregar `MONGODB_URI` en Environment del servicio

### Error: "Authentication failed"
- **Causa**: Credenciales incorrectas
- **Solución**: Verificar que la URI de conexión sea correcta

### Error: "Connection timeout"
- **Causa**: Base de datos no creada o inactiva
- **Solución**: Verificar que la base de datos esté activa en Render

## 📝 Notas Importantes

1. **Render Free Plan**:
   - Base de datos se duerme después de 90 días de inactividad
   - Límite de 1GB de almacenamiento
   - Solo 1 base de datos gratuita

2. **Para producción** considera:
   - MongoDB Atlas (más confiable)
   - Planes pagos de Render
   - Backup automático

3. **Monitoreo**:
   - Usar logs de Render para debug
   - Configurar alertas de conexión
   - Monitorear uso de recursos

## 🎯 Resultado Esperado

Después de aplicar estos cambios:
- ✅ **Conexión exitosa** a MongoDB en Render
- ✅ **Base de datos funcionando** correctamente
- ✅ **API accesible** sin errores de conexión
- ✅ **Datos persistentes** en la base de datos

## 🚀 ¡Listo!

El error de conexión a MongoDB se ha solucionado. Tu aplicación ahora debería conectarse correctamente a la base de datos en Render.

¿Necesitas ayuda con algún paso específico?
