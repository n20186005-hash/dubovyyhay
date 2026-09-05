// 图片压缩脚本：
// 1) 将 public/gallery/*.jpg 原图备份到 public/gallery/_original/
// 2) 压缩并覆盖生成网页用大图（最长边 ≤ 1920px, 渐进式 JPEG）
// 3) 为网格浏览生成缩略图（最长边 ≤ 720px）`*-thumb.jpg`
import { readdirSync, mkdirSync, renameSync, existsSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const galleryDir = join(__dirname, '..', 'public', 'gallery');
const backupDir = join(galleryDir, '_original');

const FULL_MAX = 1920; // 大图最长边
const FULL_QUALITY = 80;
const THUMB_MAX = 720; // 缩略图最长边
const THUMB_QUALITY = 74;

function thumbName(file) {
  return file.replace(/\.jpg$/i, '-thumb.jpg');
}

if (!existsSync(backupDir)) mkdirSync(backupDir, { recursive: true });

const files = readdirSync(galleryDir).filter(
  (f) => /\.jpe?g$/i.test(f) && !f.toLowerCase().endsWith('-thumb.jpg'),
);
let totalBefore = 0;
let totalAfter = 0;
const rows = [];

for (const file of files) {
  const srcPath = join(galleryDir, file);
  const orig = await sharp(srcPath).rotate().metadata();
  const before = statSync(srcPath).size;

  // 1) 备份原始文件（仅备份一次，避免重复运行时覆盖备份）
  const backupPath = join(backupDir, file);
  if (!existsSync(backupPath)) {
    renameSync(srcPath, backupPath);
  } else {
    // 已有备份：说明原图已被压缩过，直接用备份作为输入
  }
  const sourceForCompress = existsSync(backupPath) ? backupPath : srcPath;

  // 2) 压缩生成网页大图
  const full = await sharp(sourceForCompress)
    .rotate()
    .resize({ width: FULL_MAX, height: FULL_MAX, withoutEnlargement: true, fit: 'inside' })
    .jpeg({ quality: FULL_QUALITY, mozjpeg: true, progressive: true, chromaSubsampling: '4:2:0' })
    .toBuffer();
  await sharp(full).toFile(srcPath);

  // 3) 生成缩略图
  const thPath = join(galleryDir, thumbName(file));
  await sharp(full)
    .resize({ width: THUMB_MAX, height: THUMB_MAX, withoutEnlargement: true, fit: 'inside' })
    .jpeg({ quality: THUMB_QUALITY, mozjpeg: true, progressive: true, chromaSubsampling: '4:2:0' })
    .toFile(thPath);

  const afterFull = statSync(srcPath).size;
  const afterThumb = statSync(thPath).size;

  totalBefore += before;
  totalAfter += afterFull + afterThumb;
  rows.push({
    name: file,
    orig: `${orig.width}x${orig.height}`,
    beforeKB: before / 1024,
    fullKB: afterFull / 1024,
    thumbKB: afterThumb / 1024,
  });
}

console.log('FILE'.padEnd(34), '尺寸'.padEnd(13), '原图KB'.padStart(9), '大图KB'.padStart(9), '缩略KB'.padStart(9));
for (const r of rows) {
  console.log(
    r.name.padEnd(34),
    r.orig.padEnd(13),
    r.beforeKB.toFixed(0).padStart(9),
    r.fullKB.toFixed(0).padStart(9),
    r.thumbKB.toFixed(0).padStart(9),
  );
}
console.log('-'.repeat(80));
console.log(
  `原图合计 ${(totalBefore / 1024 / 1024).toFixed(2)} MB -> 大图+缩略 ${(totalAfter / 1024 / 1024).toFixed(2)} MB (缩略后实际首屏/网格流量远小于此)`,
);
console.log(`原图已备份至 public/gallery/_original/`);
