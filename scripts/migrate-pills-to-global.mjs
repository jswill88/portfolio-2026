import fs from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

const projectRoot = process.cwd();
const homePath = path.join(projectRoot, "content/pages/home.mdx");
const globalPath = path.join(projectRoot, "content/global/index.json");

function toId(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    throw new Error("Could not find YAML frontmatter.");
  }

  return {
    frontmatter: match[1],
    body: match[2] ?? "",
  };
}

function stringifyMdxFrontmatter(data, body = "") {
  return `---\n${YAML.stringify(data, { lineWidth: 0 }).trimEnd()}\n---\n${body}`;
}

const homeSource = await fs.readFile(homePath, "utf8");
const globalSource = await fs.readFile(globalPath, "utf8");

const { frontmatter, body } = splitFrontmatter(homeSource);
const homeData = YAML.parse(frontmatter);
const globalData = JSON.parse(globalSource);

if (!Array.isArray(homeData.blocks)) {
  throw new Error("Home page has no blocks array.");
}

const technologiesBlock = homeData.blocks.find(
  (block) => block?._template === "pillTags" && block?.title === "Technologies",
);

if (!technologiesBlock) {
  throw new Error('Could not find a "Technologies" pillTags block in home.mdx.');
}

if (!Array.isArray(technologiesBlock.items) || technologiesBlock.items.length === 0) {
  throw new Error('The "Technologies" block has no inline items to migrate.');
}

const existingPills = Array.isArray(globalData.pills) ? globalData.pills : [];
const pillsById = new Map(existingPills.map((pill) => [pill.id, pill]));

const migratedIds = [];

for (const item of technologiesBlock.items) {
  if (!item?.text) continue;

  const id = toId(item.text);

  if (!pillsById.has(id)) {
    pillsById.set(id, {
      id,
      icon: item.icon ?? null,
      text: item.text,
    });
  }

  migratedIds.push(id);
}

globalData.pills = Array.from(pillsById.values());
technologiesBlock.pillIds = migratedIds;
delete technologiesBlock.items;

await fs.writeFile(globalPath, `${JSON.stringify(globalData, null, 2)}\n`);
await fs.writeFile(homePath, stringifyMdxFrontmatter(homeData, body));

console.log(
  `Migrated ${migratedIds.length} pill${migratedIds.length === 1 ? "" : "s"} to global library.`,
);
