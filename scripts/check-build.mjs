#!/usr/bin/env node
// Last check before a deploy: the build has the pages that the site needs.
// The prerender already fails on a broken link or a missing image. This
// catches the other case: a page that is there but came out empty.
//
//   site-check-build <path>[:<text that must be in the page>] ...
//   site-check-build / /projets "/agenda:<li"
import fs from 'node:fs'
import path from 'node:path'

const out = path.resolve('.output/public')
const checks = process.argv.slice(2)
if (checks.length === 0) checks.push('/')

const problems = []
for (const check of checks) {
  const colon = check.indexOf(':')
  const route = colon < 0 ? check : check.slice(0, colon)
  const text = colon < 0 ? undefined : check.slice(colon + 1)

  const clean = route.replace(/^\/+|\/+$/g, '')
  const candidates = clean
    ? [path.join(out, clean, 'index.html'), path.join(out, `${clean}.html`), path.join(out, clean)]
    : [path.join(out, 'index.html')]
  const file = candidates.find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile())

  if (!file) {
    problems.push(`${route}: page not found in .output/public`)
    continue
  }
  const html = fs.readFileSync(file, 'utf8')
  if (html.length < 200) problems.push(`${route}: page is almost empty (${html.length} bytes)`)
  if (text && !html.includes(text)) problems.push(`${route}: "${text}" not found in the page`)
}

if (problems.length) {
  console.error(`Build check failed:\n${problems.map(problem => `  - ${problem}`).join('\n')}`)
  process.exit(1)
}
console.log(`Build check ok (${checks.length} page(s)).`)
