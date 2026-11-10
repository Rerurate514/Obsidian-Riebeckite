import { useSiteContext } from "@riebeckite/ui";

export function SiteFooter() {
  const site = useSiteContext();
  const year = new Date().getFullYear();

  return (
    <footer class="site-footer rb-site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__brand">
          <a href="/" class="site-footer__wordmark">
            {site?.config.site.title.split(" ")[0] ?? "Rerurate"}
            <span>.</span>
          </a>
          <p class="site-footer__author">
            <span>Created by</span>{" "}
            <a href="https://github.com/Rerurate514">Rerurate_514</a>
          </p>
        </div>
        <nav class="site-footer__section" aria-label="サイト内リンク">
          <p class="site-footer__label">Site</p>
          <ul class="site-footer__links">
            <li><a href="/tags">タグ</a></li>
            <li><a href="/folders/articles">記事一覧</a></li>
          </ul>
        </nav>
        <nav class="site-footer__section" aria-label="外部リンク">
          <p class="site-footer__label">Elsewhere</p>
          <ul class="site-footer__links">
            <li><a href="https://github.com/Rerurate514">GitHub</a></li>
            <li><a href="https://x.com/rerurate">Twitter</a></li>
            <li><a href="https://rerurate514.github.io/portfolirate/">portfolirate</a></li>
          </ul>
        </nav>
      </div>
      <div class="site-footer__base">
        <p class="site-footer__copyright">© {year} Rerurate_514</p>
        <div class="site-footer__credit">
          <p>Inspired by LONETRAIL of Ak.</p>
          <p>With respect to Kristen Wright and LT's design team.</p>
        </div>
      </div>
    </footer>
  );
}
