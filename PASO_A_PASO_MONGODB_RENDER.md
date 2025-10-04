# 🔧 Configurar MongoDB en Render - Paso a Paso

## ❌ Error Actual
```
MongoDB desconectado
❌ Error conectando a MongoDB: MongooseServerSelectionError: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017
```

## 🔍 Diagnóstico del Problema

El error indica que la aplicación está usando `localhost:27017` en lugar de la base de datos de Render. Esto significa que la variable `MONGODB_URI` no está configurada.

## ✅ Solución Paso a Paso

### PASO 1: Crear Base de Datos MongoDB en Render

1. **Ve a [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" → "Database"**
3. **Configura:**
   - **Name**: `servicios-store-db`
   - **Database**: `MongoDB`
   - **Plan**: `Free`
4. **Click "Create Database"**
5. **Espera a que se cree** (puede tomar unos minutos)

### PASO 2: Obtener la URI de Conexión

1. **Ve a tu base de datos** en Render Dashboard
2. **Click en "Connect"**
3. **Copia la "External Connection String"**
4. **Debería verse así:**
   ```
   mongodb://admin:password@dpg-xxxxx-a.oregon-postgres.render.com:27017/servicios_store
   ```

### PASO 3: Configurar Variable de Entorno

1. **Ve a tu servicio de backend** en Render Dashboard
2. **Click en "Environment"** (pestaña en la parte superior)
3. **Click "Add Environment Variable"**
4. **Configura:**
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb://admin:password@dpg-xxxxx-a.oregon-postgres.render.com:27017/servicios_store`
5. **Click "Save Changes"**

### PASO 4: Redesplegar el Servicio

1. **Ve a tu servicio de backend**
2. **Click "Manual Deploy" → "Deploy latest commit"**
3. **O simplemente espera** a que se redesplegue automáticamente

### PASO 5: Verificar la Configuración

1. **Ve a "Logs"** en tu servicio
2. **Deberías ver:**
   ```
   🔍 Intentando conectar a MongoDB...
   🔗 URI: mongodb://***:***@dpg-xxxxx-a.oregon-postgres.render.com:27017/servicios_store
   ✅ MongoDB conectado: dpg-xxxxx-a.oregon-postgres.render.com
   📊 Base de datos: servicios_store
   ```

## 🐛 Solución de Problemas

### Error: "MONGODB_URI not defined"
- **Causa**: Variable de entorno no configurada
- **Solución**: Verificar que `MONGODB_URI` esté en Environment del servicio

### Error: "Authentication failed"
- **Causa**: Credenciales incorrectas
- **Solución**: Verificar que la URI de conexión sea correcta

### Error: "Connection timeout"
- **Causa**: Base de datos no creada o inactiva
- **Solución**: Verificar que la base de datos esté activa en Render

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
