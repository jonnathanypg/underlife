const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execFileSync } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const RECURSOS_DIR = path.join(PUBLIC_DIR, 'recursos_opt');
const VIDEOS_DIR = path.join(RECURSOS_DIR, 'Videos');
const LOGOS_DIR = path.join(PUBLIC_DIR, 'logos');

function getAllFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function optimizeImages() {
  console.log('=== 1. OPTIMIZING ALL IMAGES TO NEXT-GEN WEBP ===');
  const allFiles = getAllFiles(RECURSOS_DIR).concat(getAllFiles(LOGOS_DIR)).concat([
    path.join(PUBLIC_DIR, 'icon.png'),
    path.join(PUBLIC_DIR, 'apple-icon.png'),
  ]);
  
  const imageFiles = allFiles.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f) && !f.includes('.DS_Store') && fs.existsSync(f));
  
  let originalBytes = 0;
  let optimizedBytes = 0;
  let processed = 0;

  for (const imgPath of imageFiles) {
    const stat = fs.statSync(imgPath);
    originalBytes += stat.size;

    try {
      const isLogo = imgPath.includes('/logos/');
      const isIcon = imgPath.includes('icon') || imgPath.includes('favicon');
      
      const image = sharp(imgPath);
      const metadata = await image.metadata();

      let pipeline = sharp(imgPath);
      const maxDim = isLogo ? 800 : (isIcon ? 512 : 1280);
      if (metadata.width && metadata.width > maxDim) {
        pipeline = pipeline.resize({ width: maxDim, withoutEnlargement: true });
      }

      // Generate next-gen WebP
      const webpBuffer = await pipeline
        .webp({ quality: isLogo ? 88 : 80, effort: 6 })
        .toBuffer();

      const webpPath = imgPath.endsWith('.webp') ? imgPath : imgPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      if (imgPath.endsWith('.webp')) {
        if (webpBuffer.length < stat.size) {
          fs.writeFileSync(imgPath, webpBuffer);
          optimizedBytes += webpBuffer.length;
        } else {
          optimizedBytes += stat.size;
        }
      } else {
        fs.writeFileSync(webpPath, webpBuffer);
        optimizedBytes += webpBuffer.length;
      }
      processed++;
    } catch (err) {
      console.error(`Error processing ${imgPath}:`, err.message);
      optimizedBytes += stat.size;
    }
  }

  console.log(`✓ Processed ${processed} images.`);
  console.log(`✓ Original images: ${(originalBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`✓ Optimized images: ${(optimizedBytes / (1024 * 1024)).toFixed(2)} MB`);
}

function optimizeVideos() {
  console.log('\n=== 2. OPTIMIZING ALL VIDEOS TO FASTSTREAM NEXT-GEN CODECS ===');
  if (!fs.existsSync(VIDEOS_DIR)) return;

  const videoConfigs = [
    {
      name: 'underlife-hero-bg',
      input: path.join(VIDEOS_DIR, 'underlife-hero-bg.mp4'),
      isHero: true,
      crfMp4: '26',
      crfWebm: '34',
    },
    {
      name: 'fundacion-underlife-video-impacto-1',
      input: path.join(VIDEOS_DIR, 'fundacion-underlife-video-impacto-1.mp4'),
      isHero: false,
      crfMp4: '26',
      crfWebm: '34',
    },
    {
      name: 'fundacion-underlife-video-impacto-2',
      input: path.join(VIDEOS_DIR, 'fundacion-underlife-video-impacto-2.mp4'),
      isHero: false,
      crfMp4: '26',
      crfWebm: '34',
    },
    {
      name: 'fundacion-underlife-video-impacto-3',
      input: path.join(VIDEOS_DIR, 'fundacion-underlife-video-impacto-3.mp4'),
      isHero: false,
      crfMp4: '26',
      crfWebm: '34',
    },
  ];

  for (const config of videoConfigs) {
    if (!fs.existsSync(config.input)) {
      console.warn(`Input video not found: ${config.input}`);
      continue;
    }

    const tempMp4 = path.join(VIDEOS_DIR, `${config.name}_opt.mp4`);
    const finalMp4 = path.join(VIDEOS_DIR, `${config.name}.mp4`);
    const tempWebm = path.join(VIDEOS_DIR, `${config.name}_opt.webm`);
    const finalWebm = path.join(VIDEOS_DIR, `${config.name}.webm`);

    console.log(`\nProcessing: ${config.name}...`);

    // 1. MP4 H.264 FastStart (crf 26, faststart flag for instant stream start)
    try {
      const argsMp4 = [
        '-y',
        '-i', config.input,
        '-c:v', 'libx264',
        '-crf', config.crfMp4,
        '-preset', 'medium',
        '-movflags', '+faststart',
        '-vf', 'scale=min(1280\\,iw):-2',
      ];
      if (config.isHero) {
        argsMp4.push('-an');
      } else {
        argsMp4.push('-c:a', 'aac', '-b:a', '128k');
      }
      argsMp4.push(tempMp4);

      console.log(`  [1/2] Encoding MP4 FastStart...`);
      execFileSync('ffmpeg', argsMp4, { stdio: 'inherit' });
      fs.renameSync(tempMp4, finalMp4);
      console.log(`  ✓ MP4 Ready: ${(fs.statSync(finalMp4).size / (1024 * 1024)).toFixed(2)} MB`);
    } catch (e) {
      console.error(`  ✕ Error encoding MP4 for ${config.name}:`, e.message);
    }

    // 2. WebM VP9 (crf 34, cpu-used 4, libopus)
    try {
      const argsWebm = [
        '-y',
        '-i', config.input,
        '-c:v', 'libvpx-vp9',
        '-crf', config.crfWebm,
        '-b:v', '0',
        '-deadline', 'good',
        '-cpu-used', '4',
        '-vf', 'scale=min(1280\\,iw):-2',
      ];
      if (config.isHero) {
        argsWebm.push('-an');
      } else {
        argsWebm.push('-c:a', 'libopus', '-b:a', '96k');
      }
      argsWebm.push(tempWebm);

      console.log(`  [2/2] Encoding WebM VP9...`);
      execFileSync('ffmpeg', argsWebm, { stdio: 'inherit' });
      fs.renameSync(tempWebm, finalWebm);
      console.log(`  ✓ WebM Ready: ${(fs.statSync(finalWebm).size / (1024 * 1024)).toFixed(2)} MB`);
    } catch (e) {
      console.error(`  ✕ Error encoding WebM for ${config.name}:`, e.message);
    }
  }
}

async function run() {
  await optimizeImages();
  optimizeVideos();
  console.log('\n========================================');
  console.log('✓ ALL ASSETS FULLY OPTIMIZED AND READY');
  console.log('========================================\n');
}

run();
