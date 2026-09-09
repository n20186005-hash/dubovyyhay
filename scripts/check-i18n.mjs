// Dubovyy Hay — 四语言消息文件结构与列表长度一致性校验（node 原生，无依赖）
// 用法：npm run check:i18n  (node scripts/check-i18n.mjs)
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOCALES = ['zh', 'en', 'ru', 'uk'];

function load(locale) {
  return JSON.parse(readFileSync(join(root, 'src', 'messages', `${locale}.json`), 'utf8'));
}

function flatten(obj, prefix, out) {
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(value)) {
      out[path] = { type: 'array', len: value.length };
    } else if (value && typeof value === 'object') {
      flatten(value, path, out);
    } else {
      out[path] = { type: 'leaf' };
    }
  }
}

const trees = {};
const flattens = {};
for (const l of LOCALES) {
  trees[l] = load(l);
  flattens[l] = {};
  flatten(trees[l], '', flattens[l]);
}

let failed = false;
const allKeys = new Set();
for (const l of LOCALES) for (const k of Object.keys(flattens[l])) allKeys.add(k);

const problems = [];
for (const l of LOCALES) {
  for (const k of allKeys) {
    if (!flattens[l][k]) {
      problems.push(`[${l}] missing key: ${k}`);
      failed = true;
    }
  }
}
for (const l of LOCALES) {
  for (const [k, meta] of Object.entries(flattens[l])) {
    if (meta.type === 'array') {
      for (const other of LOCALES) {
        const om = flattens[other][k];
        if (om && om.type === 'array' && om.len !== meta.len) {
          problems.push(`[${l}] array length mismatch "${k}": ${meta.len} vs [${other}] ${om.len}`);
          failed = true;
        }
      }
    }
  }
}

if (!failed) {
  const leafCount = [...allKeys].filter((k) => flattens[LOCALES[0]][k].type === 'leaf').length;
  const listCount = [...allKeys].filter((k) => flattens[LOCALES[0]][k].type === 'array').length;
  console.log(`PASS: ${LOCALES.length} locales · ${leafCount} leaf keys · ${listCount} lists · full parity`);
  process.exit(0);
} else {
  console.error(`FAIL: ${problems.length} issue(s)`);
  for (const p of problems.slice(0, 60)) console.error('  ' + p);
  if (problems.length > 60) console.error(`  … and ${problems.length - 60} more`);
  process.exit(1);
}
