import { readFile } from "node:fs/promises";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url);

async function readJson(relativePath) {
  const path = new URL(relativePath, root);
  JSON.parse(await readFile(path, "utf8"));
}

async function validateSkill(relativePath) {
  const path = new URL(relativePath, root);
  const content = await readFile(path, "utf8");
  if (!content.startsWith("---\n") && !content.startsWith("---\r\n")) {
    throw new Error(`${relativePath} is missing SKILL.md frontmatter`);
  }
  if (!content.includes("\nname:") && !content.includes("\r\nname:")) {
    throw new Error(`${relativePath} is missing SKILL.md frontmatter`);
  }
  if (!content.includes("\ndescription:") && !content.includes("\r\ndescription:")) {
    throw new Error(`${relativePath} is missing a skill description`);
  }
}

await readJson(".claude-plugin/plugin.json");
await readJson("package.json");
await readJson("package-lock.json");

const securitySkills = await readdir(new URL("skills/security/", root), {
  withFileTypes: true,
});

for (const entry of securitySkills) {
  if (entry.isDirectory()) {
    await validateSkill(`skills/security/${entry.name}/SKILL.md`);
  }
}

console.log("Repository validation passed.");
