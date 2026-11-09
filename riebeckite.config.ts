import { defineConfig, definePlugin } from "@riebeckite/core";
import { permalink } from "@riebeckite/plugin-permalink";
import { seo } from "@riebeckite/plugin-seo";
import { ogImage } from "@riebeckite/plugin-og-image";
import { highlight } from "@riebeckite/plugin-highlight";
import { obsidianMarkdown } from "@riebeckite/plugin-obsidian-markdown";
import { colorMode } from "@riebeckite/plugin-color-mode";
import { toc } from "@riebeckite/plugin-toc";
import { codeEnhance } from "@riebeckite/plugin-code-enhance";
import { search } from "@riebeckite/plugin-search";
import { breadcrumbs } from "@riebeckite/plugin-breadcrumbs";
import { navigation } from "@riebeckite/plugin-navigation";
import { properties } from "@riebeckite/plugin-properties";
import { alias } from "@riebeckite/plugin-alias";
import { backlinks } from "@riebeckite/plugin-backlinks";
import { relatedPosts } from "@riebeckite/plugin-related-posts";
import { recentPosts } from "@riebeckite/plugin-recent-posts";
import { taxonomy } from "@riebeckite/plugin-taxonomy";
import { folderPages } from "@riebeckite/plugin-folder-pages";
import { hoverPreview } from "@riebeckite/plugin-hover-preview";
import { media } from "@riebeckite/plugin-media";
import { imageOptimizer } from "@riebeckite/plugin-image-optimizer";
import { responsiveImage } from "@riebeckite/plugin-responsive-image";
import { lightbox } from "@riebeckite/plugin-lightbox";
import { hardBreaks } from "@riebeckite/plugin-hard-breaks";
import { attachment } from "@riebeckite/plugin-attachment";
import { pdf } from "@riebeckite/plugin-pdf";
import { canvas } from "@riebeckite/plugin-canvas";
import { autoCardLink } from "@riebeckite/plugin-autocardlink";
import { mermaidPele } from "@riebeckite/plugin-mermaid-pele";
import { ux } from "@riebeckite/plugin-ux";
import { textFragment } from "@riebeckite/plugin-text-fragment";
import { sidenotes } from "@riebeckite/plugin-sidenotes";
import { quality } from "@riebeckite/plugin-quality";
import { rerurateTheme } from "@riebeckite/theme-rerurate";

const decodedPermalinkLookup = definePlugin({
  name: "decoded-permalink-lookup",
  developmentRouteManifest: true,
  onManifestCreated: ({ manifest }) => {
    const decodePath = (path: string) =>
      path
        .split("/")
        .map((segment) => {
          try {
            return decodeURIComponent(segment);
          } catch {
            return segment;
          }
        })
        .join("/");
    manifest.byRoutablePermalink = new Map(
      [...manifest.byRoutablePermalink].flatMap(([path, entry]) => [
        [path, entry],
        [decodePath(path), entry],
      ]),
    );
  },
});

const aliasLengthGuard = definePlugin({
  name: "alias-length-guard",
  extendContentLocations: ({ locations }) => {
    for (const location of locations.values()) {
      const seen = new Set<string>();
      location.redirects = (location.redirects ?? []).filter((redirect) => {
        const key = redirect.path.toLowerCase();
        if (seen.has(key)) return false;
        if (/[?#]/.test(redirect.path)) return false;
        if (!redirect.path.split("/").every((segment) => segment.length <= 209)) return false;
        seen.add(key);
        return true;
      });
    }
  },
});

export default defineConfig({
  site: {
    title: "Rerurate Didital Garden Explore",
    description: "",
    baseUrl: "https://rerurate.com",
    defaultOgImage: "/og-image.png",
    locale: "ja-JP",
  },
  content: {
    directory: "content",
    exclude: [
      "private",
      "templates",
      ".obsidian",
      "Config/FileClass",
      "Config/Templates",
      "Config/unTemplates",
      "Config/Widgets",
      ".trash",
      "Obsidian-Mynote-Publish",
    ],
  },
  spa: true,
  theme: rerurateTheme(),
  plugins: [
    permalink({
      id: { strategy: "hash", length: 12 },
      resolvePath: ({ content, id }) => (content.slug === "index" ? "/" : `/${id}`),
    }),
    seo({ sitemap: true, robots: true }),
    ogImage({ preset: "card" }),
    highlight(),
    obsidianMarkdown(),
    colorMode(),
    ux({ backToTopLabel: "ページ上部へ" }),
    textFragment({
      labels: {
        regionLabel: "選択テキストを共有",
        copyLinkLabel: "リンクをコピー",
        copyQuoteLabel: "引用をコピー",
        linkCopiedLabel: "リンクをコピーしました",
        quoteCopiedLabel: "引用をコピーしました",
        copyFailedLabel: "コピーできませんでした",
      },
    }),
    sidenotes({ placement: "margin", ariaLabel: "補足", openLabel: "脚注" }),
    toc(),
    codeEnhance({ lineNumbers: true, copyButton: true, filename: true, lineHighlight: true, diffHighlight: true }),
    search(),
    breadcrumbs(),
    navigation(),
    properties({ include: ["created", "modified", "tags", "status"], fields: { created: { type: "date", format: "yyyy-MM-dd" }, modified: { type: "date", format: "yyyy-MM-dd" }, tags: { type: "tags", variant: "chips" }, status: { type: "badge", variants: { active: "success", draft: "warning", archived: "danger" } } } }),
    alias({ status: 308 }),
    aliasLengthGuard,
    decodedPermalinkLookup,
    backlinks(),
    relatedPosts({ limit: 5, useTags: true, useBacklinks: true }),
    recentPosts(),
    taxonomy({ tags: true, folders: true, related: true, folderDepth: 1 }),
    folderPages(),
    hoverPreview({ delay: 120, excerptLength: 160, selector: 'a[href^="/"]' }),
    media(),
    imageOptimizer(),
    responsiveImage(),
    lightbox(),
    hardBreaks(),
    attachment(),
    pdf(),
    canvas({ render: "both" }),
    autoCardLink(),
    mermaidPele(),
    quality(),
  ],
});
