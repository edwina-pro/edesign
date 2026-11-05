import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("node_modules/quasar/dist/api");
const entries = [];
for (const file of (await readdir(root)).sort()) {
  if (!file.endsWith(".json")) continue;
  const api = JSON.parse(await readFile(path.join(root, file), "utf8"));
  const name = file.slice(0, -5);
  entries.push({
    name,
    type: api.type || (/^Q[A-Z]/.test(name) ? "component" : "other"),
    props: Object.entries(api.props || {}).map(([name, p]) => ({
      name,
      type: p.type,
      description: p.desc || "",
      default: p.default,
    })),
    events: Object.keys(api.events || {}),
    slots: Object.keys(api.slots || {}),
    methods: Object.keys(api.methods || {}),
  });
}
await mkdir("src/data", { recursive: true });
await writeFile(
  "src/data/inventory.json",
  JSON.stringify(entries, null, 2) + "\n",
);
const pkg = JSON.parse(
  await readFile("node_modules/quasar/package.json", "utf8"),
);
await writeFile(
  "src/data/version.json",
  JSON.stringify(
    { quasar: pkg.version, generated: new Date().toISOString() },
    null,
    2,
  ) + "\n",
);
console.log(`Quasar ${pkg.version}: ${entries.length} API entries inventoried`);
