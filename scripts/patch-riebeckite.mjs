import { readFile, writeFile } from "node:fs/promises";

const patches = [
  {
    file: "node_modules/@riebeckite/plugin-taxonomy/dist/index.js",
    from: "      if (term.path === pathname) return { model, term };",
    to: "      if (term.path === pathname || decodeURIComponent(term.path) === pathname) return { model, term };",
  },
  {
    file: "node_modules/@riebeckite/honox/dist/server.js",
    from: "  const redirect = manifest.publicRedirects.get(path);",
    to: `  const redirect =
    manifest.publicRedirects.get(path) ??
    manifest.publicRedirects.get(path.split("/").map(encodeURIComponent).join("/"));`,
  },
  {
    file: "node_modules/harfbuzzjs/hb.js",
    from: 'scriptDirectory=__dirname+"/";',
    to: 'scriptDirectory=process.cwd()+"/node_modules/harfbuzzjs/";',
  },
  {
    file: "node_modules/@riebeckite/og-image/dist/index.js",
    from: "      fileURLToPath(\n        new URL(\n          `./fonts/noto-sans-jp-japanese-${weight}-normal.woff`,\n          import.meta.url\n        )\n      )",
    to: "      `${process.cwd()}/node_modules/@riebeckite/og-image/dist/fonts/noto-sans-jp-japanese-${weight}-normal.woff`",
  },
  {
    file: "node_modules/@riebeckite/plugin-folder-pages/dist/index.js",
    from: "          const page = modelFor(manifest).byPath.get(pathname);",
    to: `          const pages = modelFor(manifest).byPath;
          const page =
            pages.get(pathname) ??
            pages.get(pathname.split("/").map(encodeURIComponent).join("/"));`,
  },
];

for (const patch of patches) {
  const source = await readFile(patch.file, "utf8");
  if (source.includes(patch.to)) continue;
  if (!source.includes(patch.from)) {
    throw new Error(`Cannot patch ${patch.file}: expected code was not found`);
  }
  await writeFile(patch.file, source.replace(patch.from, patch.to));
}
