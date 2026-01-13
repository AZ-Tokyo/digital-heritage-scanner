import fs from 'fs';
import path from 'path';

const srcStats = fs.statSync('pages/privacy.html');
if (srcStats.isFile()) {
    fs.copyFileSync('pages/privacy.html', 'dist/privacy.html');
    console.log('Copied privacy.html to dist/');
} else {
    console.error('privacy.html not found');
    process.exit(1);
}
