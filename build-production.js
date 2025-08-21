#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Iniciando build para producción...\n');

// Verificar que existe el archivo .env
if (!fs.existsSync('.env')) {
  console.error('❌ Error: No se encontró el archivo .env');
  console.log('📝 Crea un archivo .env con tus credenciales de EmailJS:');
  console.log('   VITE_EMAILJS_SERVICE_ID=tu_service_id');
  console.log('   VITE_EMAILJS_TEMPLATE_ID=tu_template_id');
  console.log('   VITE_EMAILJS_PUBLIC_KEY=tu_public_key\n');
  process.exit(1);
}

// Leer y validar variables de entorno
const envContent = fs.readFileSync('.env', 'utf8');
const requiredVars = [
  'VITE_EMAILJS_SERVICE_ID',
  'VITE_EMAILJS_TEMPLATE_ID', 
  'VITE_EMAILJS_PUBLIC_KEY'
];

let missingVars = [];
requiredVars.forEach(varName => {
  if (!envContent.includes(varName) || envContent.includes(`${varName}=your_`)) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.error('❌ Error: Faltan configurar estas variables en .env:');
  missingVars.forEach(varName => console.log(`   - ${varName}`));
  console.log('\n📝 Asegúrate de que tengan valores reales, no placeholders.\n');
  process.exit(1);
}

try {
  // Limpiar build anterior
  if (fs.existsSync('dist')) {
    console.log('🧹 Limpiando build anterior...');
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Ejecutar build
  console.log('⚡ Construyendo aplicación...');
  execSync('npm run build', { stdio: 'inherit' });

  // Verificar que se generó el build
  if (!fs.existsSync('dist')) {
    throw new Error('No se generó la carpeta dist');
  }

  console.log('\n✅ Build completado exitosamente!');
  console.log('📁 Los archivos están en la carpeta "dist/"');
  console.log('\n📤 Pasos siguientes:');
  console.log('   1. Comprime la carpeta "dist/" en un ZIP');
  console.log('   2. Sube el contenido al File Manager de Namecheap');
  console.log('   3. Extrae los archivos en la carpeta public_html/');
  console.log('\n🌐 Tu sitio estará disponible en tu dominio!');

} catch (error) {
  console.error('\n❌ Error durante el build:', error.message);
  process.exit(1);
}
