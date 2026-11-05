import fs from "node:fs/promises";
const root = "src/examples/quasar/";
for (const file of await fs.readdir(root)) {
  let code = await fs.readFile(root + file, "utf8");
  if (
    !/<q-(menu|dialog|tooltip|popup-proxy|select|btn-dropdown)\b/.test(code) ||
    code.includes("const popupTheme")
  )
    continue;
  const state = `import { useTheme } from '../../ui/material';\nconst popupTheme=useTheme({});\n`;
  if (code.includes('<script setup lang="ts">'))
    code = code.replace(
      '<script setup lang="ts">',
      '<script setup lang="ts">\n' + state,
    );
  else code = '<script setup lang="ts">\n' + state + "</script>\n" + code;
  code = code.replace(
    /<q-(menu|dialog|tooltip|popup-proxy)\b/g,
    '<q-$1 :data-e-theme="popupTheme"',
  );
  code = code.replace(
    /<q-select\b/g,
    '<q-select :popup-content-class="`e-theme-${popupTheme}`"',
  );
  code = code.replace(
    /<q-btn-dropdown\b/g,
    '<q-btn-dropdown :content-class="`e-theme-${popupTheme}`"',
  );
  await fs.writeFile(root + file, code);
}
