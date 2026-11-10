import { useSiteContext } from "@riebeckite/ui";

export function SiteFooter() {
  const site = useSiteContext();
  const year = new Date().getFullYear();

  return (
    <footer class="site-footer rb-site-footer">
      <a href="/" class="site-footer__wordmark">
        {site?.config.site.title.split(" ")[0] ?? "Rerurate"}
        <span>.</span>
      </a>
      <dl class="site-footer__colophon">
        <div class="site-footer__row">
          <dt>Created by</dt>
          <dd><a href="https://github.com/Rerurate514">Rerurate_514</a></dd>
        </div>
        <div class="site-footer__row">
          <dt>Site</dt>
          <dd>
            <a href="/tags">タグ</a>
            <a href="/folders/articles">記事一覧</a>
          </dd>
        </div>
        <div class="site-footer__row">
          <dt>Elsewhere</dt>
          <dd>
            <a href="https://github.com/Rerurate514">GitHub</a>
            <a href="https://x.com/rerurate">Twitter</a>
            <a href="https://rerurate514.github.io/portfolirate/">portfolirate</a>
          </dd>
        </div>
      </dl>
      <div class="site-footer__base">
        <p class="site-footer__copyright">© {year} Rerurate_514</p>
        <p class="site-footer__credit">
          <span>Inspired by LONETRAIL of Ak.</span>
          <span>With respect to Kristen Wright and LT's design team.</span>
        </p>
      </div>
    </footer>
  );
}
