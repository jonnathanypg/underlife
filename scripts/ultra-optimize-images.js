const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const RECURSOS_DIR = path.join(PUBLIC_DIR, 'recursos_opt');

async function optimizeImages() {
  console.log('=== ULTRA HIGH EFFICIENCY IMAGE RESIZING & WEBP ENCODING ===');
  
  // 1. Gallery images (ninos, hiphop, hackathon, talleres) - target max 500w for 300x350 cards
  const galleryFolders = ['ninos', 'hiphop', 'hackathon', 'talleres', 'cdi-amiguitos-a-jugar', 'cdi-caritas-alegres', 'cdi-gotitas-del-saber', 'cdi-pedacitos-de-amor'];
  
  for (const folder of galleryFolders) {
    const dirPath = path.join(RECURSOS_DIR, folder);
    if (!fs.existsSync(dirPath)) continue;
    
    const files = fs.readdirSync(dirPath).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      
      const image = sharp(filePath);
      const metadata = await image.metadata();
      
      const webpPath = filePath.endsWith('.webp') ? filePath : filePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      const buffer = await sharp(filePath)
        .resize({ width: 500, withoutEnlargement: true })
        .webp({ quality: 75, effort: 6 })
        .toBuffer();
        
      fs.writeFileSync(webpPath, buffer);
      console.log(`✓ ${folder}/${file}: ${(stat.size/1024).toFixed(1)}KB -> ${(buffer.length/1024).toFixed(1)}KB`);
    }
  }

  // 2. Video posters (hero-bg-poster, impacto-1-poster, etc.) - max 800w
  const videosDir = path.join(RECURSOS_DIR, 'Videos');
  if (fs.existsSync(videosDir)) {
    const posterFiles = fs.readdirSync(videosDir).filter(f => f.includes('poster') && /\.(jpg|jpeg|png|webp)$/i.test(f));
    for (const poster of posterFiles) {
      const posterPath = path.join(videosDir, poster);
      const stat = fs.statSync(posterPath);
      const buffer = await sharp(posterPath)
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 75, effort: 6 })
        .toBuffer();
        
      const webpPoster = posterPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      fs.writeFileSync(webpPoster, buffer);
      // Also overwrite the jpg with compressed version for compatibility
      if (posterPath.endsWith('.jpg')) {
        const jpgBuffer = await sharp(posterPath)
          .resize({ width: 800, withoutEnlargement: true })
          .jpeg({ quality: 75, mozjpeg: true })
          .toBuffer();
        fs.writeFileSync(posterPath, jpgBuffer);
      }
      console.log(`✓ Poster ${poster}: ${(stat.size/1024).toFixed(1)}KB -> ${(buffer.length/1024).toFixed(1)}KB`);
    }
  }
  
  // 3. Logos in public/logos/
  const logosDir = path.join(PUBLIC_DIR, 'logos');
  if (fs.existsSync(logosDir)) {
    const logoFiles = fs.readdirSync(logosDir).filter(f => /\.(png|jpg|webp)$/i.test(f));
    for (const logo of logoFiles) {
      const logoPath = path.join(logosDir, logo);
      const stat = fs.statSync(logoPath);
      const buffer = await sharp(logoPath)
        .resize({ width: 400, withoutEnlargement: true })
        .webp({ quality: 85, effort: 6 })
        .toBuffer();
      const webpLogo = logoPath.replace(/\.(png|jpg)$/i, '.webp');
      fs.writeFileSync(webpLogo, buffer);
      console.log(`✓ Logo ${logo}: ${(stat.size/1024).toFixed(1)}KB -> ${(buffer.length/1024).toFixed(1)}KB`);
    }
  }
  
  console.log('\n=== ALL IMAGES RESIZED AND COMPRESSED TO ULTRA HIGH PERFORMANCE ===');
}

optimizeImages();
