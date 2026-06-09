const fs = require('fs');
const path = require('path');

const galleryPath = path.join(__dirname, 'src/components/Gallery.tsx');
let galleryContent = fs.readFileSync(galleryPath, 'utf8');
galleryContent = galleryContent.replace(/Diukivskyi Sad/g, 'Dubovyy Hay');
fs.writeFileSync(galleryPath, galleryContent);

const layoutPath = path.join(__dirname, 'src/app/[locale]/layout.tsx');
let layoutContent = fs.readFileSync(layoutPath, 'utf8');
layoutContent = layoutContent.replace(/diukivskyisad/g, 'dubovyy-hay');
layoutContent = layoutContent.replace(/Diukivskyi Sad/g, 'Dubovyy Hay');
fs.writeFileSync(layoutPath, layoutContent);

console.log("Replaced leftover Diukivskyi Sad in components.");
