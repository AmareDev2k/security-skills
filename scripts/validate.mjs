import { readFile } from "node:fs/promises";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url);
let errors = 0;

function fail(message) {
  console.error(`FAIL: ${message}`);
  errors++;
}

async function readJson(relativePath) {
  const path = new URL(relativePath, root);
  try {
    JSON.parse(await readFile(path, "utf8"));
  } catch (err) {
    fail(`${relativePath}: invalid JSON — ${err.message}`);
  }
}

async function validateSkill(relativePath) {
  const path = new URL(relativePath, root);
  const content = await readFile(path, "utf8");
  if (!content.startsWith("---\n") && !content.startsWith("---\r\n")) {
    fail(`${relativePath} is missing SKILL.md frontmatter`);
    return;
  }
  if (!content.includes("\nname:") && !content.includes("\r\nname:")) {
    fail(`${relativePath} is missing a 'name' field in frontmatter`);
  }
  if (!content.includes("\ndescription:") && !content.includes("\r\ndescription:")) {
    fail(`${relativePath} is missing a 'description' field in frontmatter`);
  }

  // Extract the description line and check length
  const descMatch = content.match(/\r?\ndescription:\s*(.+)/);
  if (descMatch) {
    const desc = descMatch[1].trim();
    if (desc.length < 20) {
      fail(`${relativePath} description is too short (${desc.length} chars, minimum 20)`);
    }
  }

  // Check that the skill has at least an Examples section or a Process section
  if (!content.includes("## Examples") && !content.includes("## Process")) {
    fail(`${relativePath} is missing an '## Examples' or '## Process' section`);
  }

  // Validate that cross-referenced skills use correct names
  const crossRefs = content.matchAll(/`\/([a-z-]+)`/g);
  for (const match of crossRefs) {
    const refName = match[1];
    if (!allSkillNames.has(refName)) {
      fail(`${relativePath} references unknown skill '/${refName}'`);
    }
  }
}

await readJson(".claude-plugin/plugin.json");
await readJson("package.json");
await readJson("package-lock.json");
await readJson("skills-lock.json");

const securitySkills = await readdir(new URL("skills/security/", root), {
  withFileTypes: true,
});

// Collect all skill names first for cross-reference validation
const allSkillNames = new Set();
for (const entry of securitySkills) {
  if (entry.isDirectory()) {
    allSkillNames.add(entry.name);
  }
}

// Validate each skill
for (const entry of securitySkills) {
  if (entry.isDirectory()) {
    await validateSkill(`skills/security/${entry.name}/SKILL.md`);
  }
}

if (errors > 0) {
  console.error(`\nValidation failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log(`Repository validation passed. Checked ${allSkillNames.size} skills.`);
}
