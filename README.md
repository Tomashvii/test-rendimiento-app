# 📱 App Test de Rendimiento - Guía Completa

## 🎯 ¿Qué hace esta app?

Esta aplicación calcula el rendimiento y las pérdidas económicas por merma en productos alimenticios (vegetales y cárnicos), basada en las fórmulas del documento de la Universitaria Agustiniana.

### Funcionalidades:
- ✅ Calcula % de rendimiento automáticamente
- ✅ Calcula % de merma
- ✅ Calcula valor del kilo limpio
- ✅ Muestra pérdidas económicas
- ✅ Guarda historial de registros
- ✅ Diseño responsive (móvil y escritorio)
- ✅ Funciona offline (PWA)

---

## 📋 PASO A PASO - Generación del APK

### **PASO 1: Preparar los archivos** ✅ (YA HECHO)

Ya tienes estos archivos creados:
- `index.html` - Estructura de la app
- `styles.css` - Estilos y diseño
- `script.js` - Lógica y cálculos
- `manifest.json` - Configuración PWA

---

### **PASO 2: Crear el ícono de la app** 🎨

Tienes 2 opciones:

#### Opción A: Usar IA (Recomendado)
1. Ve a: https://www.canva.com/ai-image-generator/ o https://hotpot.ai/
2. Prompt sugerido: 
   ```
   "app icon, calculator with vegetables, carrot and scale, 
   green and purple gradient, modern flat design, simple, 512x512"
   ```
3. Descarga la imagen en 512x512px
4. Renombra como `icon-512.png`

#### Opción B: Descargar de Flaticon
1. Ve a: https://www.flaticon.com/
2. Busca: "vegetable scale" o "food calculator"
3. Descarga en PNG 512x512
4. Renombra como `icon-512.png`

**Crear la versión 192x192:**
- Usa https://www.iloveimg.com/resize-image
- Redimensiona a 192x192px
- Guarda como `icon-192.png`

---

### **PASO 3: Organizar archivos en una carpeta**

Crea una carpeta llamada `test-rendimiento` con esta estructura:

```
test-rendimiento/
├── index.html
├── styles.css
├── script.js
├── manifest.json
├── icon-192.png
└── icon-512.png
```

---

### **PASO 4A: Método WebView (Más Simple)** 🚀

Este método NO requiere instalar nada en tu computador.

1. **Subir archivos a un hosting gratuito:**
   
   - Ve a: https://app.netlify.com/drop
   - Arrastra TODA tu carpeta `test-rendimiento`
   - Netlify te dará una URL (ej: `https://tu-app-123456.netlify.app`)

2. **Usar WebView Online:**
   
   - Ve a: https://appsgeyser.com/
   - Selecciona "Website"
   - Pega tu URL de Netlify
   - Personaliza nombre y colores
   - Descarga el APK

3. **Alternativa - WebViewGold:**
   
   - Ve a: https://webviewgold.com/
   - Versión gratuita disponible
   - Sigue el asistente

---

### **PASO 4B: Método Capacitor (Más Profesional)** ⚡

Este método requiere instalar Node.js pero genera apps más nativas.

#### 1. Instalar Node.js:
- Descarga de: https://nodejs.org/ (versión LTS)
- Instala con opciones por defecto
- Verifica instalación:
  ```bash
  node --version
  npm --version
  ```

#### 2. Instalar Capacitor:
```bash
npm install -g @capacitor/cli @capacitor/core
npm install -g @capacitor/android
```

#### 3. Inicializar proyecto:
```bash
cd test-rendimiento
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init
```

Cuando pregunte:
- App name: `Test de Rendimiento`
- App ID: `com.tugrupo.rendimiento`
- Web asset directory: `.` (punto)

#### 4. Agregar plataforma Android:
```bash
npx cap add android
```

#### 5. Configurar ícono:
Coloca tus íconos en:
```
android/app/src/main/res/
├── mipmap-hdpi/ic_launcher.png (72x72)
├── mipmap-mdpi/ic_launcher.png (48x48)
├── mipmap-xhdpi/ic_launcher.png (96x96)
├── mipmap-xxhdpi/ic_launcher.png (144x144)
└── mipmap-xxxhdpi/ic_launcher.png (192x192)
```

Usa: https://icon.kitchen/ para generar todos los tamaños automáticamente

#### 6. Construir APK:

**Opción 1: Online (sin Android Studio)**
```bash
npx cap copy
npx cap sync
```
Luego sube la carpeta `android` a: https://apkbuilder.netlify.app/

**Opción 2: Con Android Studio (mejor calidad)**
- Instala Android Studio: https://developer.android.com/studio
- Abre la carpeta `android` desde Android Studio
- Build → Build Bundle(s) / APK(s) → Build APK(s)
- APK estará en: `android/app/build/outputs/apk/debug/`

---

### **PASO 5: Instalar el APK en tu celular** 📱

1. Transfiere el APK a tu celular (email, Drive, USB)
2. Habilita "Orígenes desconocidos" en Ajustes
3. Abre el APK desde el explorador de archivos
4. Instala la app
5. ¡Listo! 🎉

---

## 🧪 Probar la app localmente (antes del APK)

Para probar en tu navegador:

1. Abre el archivo `index.html` directamente en Chrome
2. O usa un servidor local:
   ```bash
   # Si tienes Python:
   python -m http.server 8000
   
   # Si tienes Node.js:
   npx http-server
   ```
3. Abre: `http://localhost:8000`

---

## 📊 Cómo usar la app

1. Ingresa el nombre del producto (ej: Zanahoria)
2. Ingresa el valor por kilo
3. Ingresa el peso bruto (producto completo)
4. Ingresa el peso neto (producto limpio)
5. Click en "Calcular Rendimiento"
6. Revisa los resultados
7. Click en "Guardar en Historial" para guardar
8. Consulta el historial cuando quieras

---

## 🎓 Criterios de evaluación cumplidos

✅ **Originalidad (0.2)**: App única de cálculo de rendimiento alimenticio
✅ **APK generado (0.2)**: Siguiendo cualquiera de los métodos
✅ **Ícono representativo (0.2)**: Ícono con tema de alimentos/balance
✅ **Trabajo en parejas (0.2)**: Colaboración en equipo

---

## 💡 Tips finales

- Prueba la app en el navegador primero
- Usa datos reales del documento PDF para verificar
- El método WebView es más rápido pero menos profesional
- El método Capacitor es más complejo pero genera mejores apps
- Documenta el proceso con screenshots para el informe
- Guarda el código fuente en un repositorio (GitHub)

---

## 🆘 Solución de problemas

**"No puedo instalar el APK"**
- Habilita instalación de fuentes desconocidas
- Verifica que el APK no esté corrupto

**"La app se cierra al abrirla"**
- Verifica que todos los archivos estén en la carpeta
- Revisa la consola del navegador por errores

**"No genera el APK con Capacitor"**
- Verifica que Node.js esté instalado correctamente
- Ejecuta `npm install` en la carpeta del proyecto
- Intenta el método WebView como alternativa

---

## 📞 Recursos útiles

- Netlify Deploy: https://app.netlify.com/drop
- Icon Generator: https://icon.kitchen/
- WebView Builder: https://appsgeyser.com/
- Capacitor Docs: https://capacitorjs.com/docs

---

**¡Éxito con tu proyecto! 🚀**
