const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk('d:/Projects/HRMS-Team/FrontEnd/HRMS-GradProject/src/app');
files.forEach(f => {
    if (f.endsWith('.html')) {
        let c = fs.readFileSync(f, 'utf8');
        if (c.includes('mask="00/00/0000"')) {
            c = c.replace(/mask="00\/00\/0000" \[dropSpecialCharacters\]="false"/g, '');
            fs.writeFileSync(f, c);
            console.log('Fixed HTML: ' + f);
        }
    }
    if (f.endsWith('.ts')) {
        let c = fs.readFileSync(f, 'utf8');
        if (c.includes('NgxMaskDirective')) {
            c = c.replace(/,\s*NgxMaskDirective/g, '').replace(/NgxMaskDirective\s*,/g, '');
            fs.writeFileSync(f, c);
            console.log('Fixed TS: ' + f);
        }
    }
});
