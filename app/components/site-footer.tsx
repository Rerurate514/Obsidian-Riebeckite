import { useSiteContext } from "@riebeckite/ui";

export function SiteFooter() {
  const site = useSiteContext();
  const year = new Date().getFullYear();

  return (
    <footer class="site-footer rb-site-footer">
      <div class="site-footer__inner">
        <div class="site-footer__identity">
          <a href="/" class="site-footer__note">
            {site?.config.site.title}
          </a>
          <p class="site-footer__author">
            <span>created by</span>{" "}
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
      <div class="site-footer__rights">
        <p class="site-footer__rights-title">
          Finally, this site is inspired{" "}
          <span class="site-footer__red">LON</span>
          <span class="site-footer__ochre">ETR</span>
          <span class="site-footer__teal">AIL</span> of Ak
        </p>
        <div class="site-footer__rights-project">
          <p class="site-footer__rights-label">Project Code</p>
          <p class="site-footer__rights-name">{site?.config.site.title}</p>
        </div>
        <p class="site-footer__respect">
          I respect Kristen Wright and LT's design team.
        </p>
        <p class="site-footer__copyright">
          {year} © Rerurate_514, All Rights Reserved
        </p>
      </div>
      <p class="site-footer__meta">
        <span>
          Built with <a href="https://riebeckite.dev">Riebeckite</a>
        </span>
        <span>© Rerurate</span>
      </p>
    </footer>
  );
}
