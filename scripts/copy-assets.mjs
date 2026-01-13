import fs from 'fs';
import path from 'path';

const srcStats = fs.statSync('pages/privacy.html');
if (srcStats.isFile()) {
    const destDir = 'dist/pages';
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync('pages/privacy.html', path.join(destDir, 'privacy.html'));
    console.log('Copied privacy.html to dist/pages/');
} else {
    console.error('privacy.html not found');
    process.exit(1);
}
