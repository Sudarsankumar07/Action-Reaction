const fs = require('fs');
const path = require('path');

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, filelist);
    } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.tsx')) {
      filelist.push(filepath);
    }
  });
  return filelist;
}

function findBareText(filepath) {
  const text = fs.readFileSync(filepath, 'utf8');
  const rx = /<(?!Text|\/)([A-Za-z0-9_.:-]+)[^>]*>\s*([^<\n][^<]*)\s*<\/(?:\1|[A-Za-z0-9_.:-]+)>/g;
  let m;
  const results = [];
  while ((m = rx.exec(text)) !== null) {
    const tag = m[1];
    const content = m[2].trim();
    // ignore cases where content begins with { (JS expression)
    if (content.startsWith('{')) continue;
    // ignore lines that are just comments
    if (content.startsWith('//') || content.startsWith('/*')) continue;
    results.push({ tag, content, index: m.index });
  }
  return results;
}

const root = path.join(__dirname, '..', 'src');
const files = walk(root);
let total = 0;
files.forEach(f => {
  const found = findBareText(f);
  if (found.length) {
    console.log('\nFile:', f);
    found.forEach(item => {
      console.log('  Tag:', item.tag);
      console.log('  Content:', item.content.substring(0,120).replace(/\n/g,' '));
      total++;
    });
  }
});
if (total === 0) console.log('No obvious bare text findings.');
else console.log('\nFound', total, 'potential bare-text occurrences (use as hints).');
