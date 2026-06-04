const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');
const strip = require('strip-comments');

const srcDir = path.join(__dirname, 'src');

// Find all TS, HTML, and CSS files in src directory
const files = globSync(`${srcDir}/**/*.{ts,html,css}`);

console.log(`Found ${files.length} files. Removing comments...`);

let tsCount = 0;
let htmlCount = 0;
let cssCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    const ext = path.extname(file);

    if (ext === '.ts') {
        content = strip(content);
        if (content !== original) tsCount++;
    } else if (ext === '.html') {
        content = content.replace(/<!--[\s\S]*?-->/g, '');
        if (content !== original) htmlCount++;
    } else if (ext === '.css') {
        content = strip(content);
        if (content !== original) cssCount++;
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log(`Done! Modified ${tsCount} TS files, ${htmlCount} HTML files, and ${cssCount} CSS files.`);
