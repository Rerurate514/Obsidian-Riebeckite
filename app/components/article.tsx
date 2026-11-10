import { Article, ArticleBody, ArticleContent, ArticleFooter } from "@riebeckite/honox/ui";
import { Backlinks } from "@riebeckite/plugin-backlinks";
import { Breadcrumbs } from "@riebeckite/plugin-breadcrumbs";
import { SidebarNavigation, resolveSiteNavigation } from "@riebeckite/plugin-navigation";
import type { NavigationItem } from "@riebeckite/plugin-navigation";
import { Properties } from "@riebeckite/plugin-properties";
import { RecentPosts } from "@riebeckite/plugin-recent-posts";
import { RelatedPosts } from "@riebeckite/plugin-related-posts";
import { TableOfContents } from "@riebeckite/plugin-toc";
import { useSiteContext } from "@riebeckite/ui";
import { LoneTrailHr } from "./lone-trail-hr";
import { PoweredByRiebeckite } from "./powered-by-riebeckite";
import { SvgLangImage } from "./svg-lang-image";

function collapseNavigation(items: readonly NavigationItem[]): NavigationItem[] {
  return items.map((item) =>
    item.children
      ? { ...item, collapsed: true, children: collapseNavigation(item.children) }
      : { ...item, collapsed: true },
  );
}

export function SiteArticle() {
  const site = useSiteContext();
  const navigation = site
    ? resolveSiteNavigation(site.config, site.manifest, site.language)
    : null;

  return (
    <Article class="site-article">
      <div class="site-article__layout">
        <aside class="site-article__sidebar">
          <p class="site-article__sidebar-title">ノート</p>
          <SidebarNavigation
            items={collapseNavigation(navigation?.primary ?? [])}
            label="ノート"
            collapsible
          />
        </aside>
        <ArticleContent>
          <Breadcrumbs />
          <Properties />
          <ArticleBody />
          <LoneTrailHr />
          <PoweredByRiebeckite />
          <RecentPosts />
          <ArticleFooter class="site-article__footer">
            <RelatedPosts />
          </ArticleFooter>
          <SvgLangImage />
        </ArticleContent>
        <aside class="site-article__aside">
          <TableOfContents placement="desktop-rail" borders={{ blockEnd: false }} />
          <Backlinks borders={{ items: false }} />
        </aside>
      </div>
    </Article>
  );
}
