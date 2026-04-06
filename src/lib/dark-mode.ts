import * as cheerio from 'cheerio';

const DARK_MODE_META = [
  '<meta name="color-scheme" content="light dark">',
  '<meta name="supported-color-schemes" content="light dark">',
];

const DARK_MODE_STYLES = `
  :root { color-scheme: light dark; }
  @media (prefers-color-scheme: dark) {
    .email-body { background-color: #1a1a2e !important; }
    .email-body * { color: #e0e0e0 !important; }
    .dark-bg { background-color: #16213e !important; }
    .dark-text { color: #e0e0e0 !important; }
    .dark-text-muted { color: #a0a0a0 !important; }
    [data-ogsb] { background-color: attr(data-ogsb) !important; }
    [data-ogsc] { color: attr(data-ogsc) !important; }
  }
`;

function ensureExplicitColors($: cheerio.CheerioAPI) {
  const elementsNeedingColor = 'td, th, p, span, div, a, li, h1, h2, h3, h4, h5, h6';
  $(elementsNeedingColor).each((_, el) => {
    const $el = $(el);
    const style = $el.attr('style') || '';
    const styles = parseStyleString(style);

    if (styles['background-color'] || styles['background']) {
      const bgColor = styles['background-color'] || styles['background'];
      $el.attr('data-ogsb', bgColor);
    }

    if (styles['color']) {
      $el.attr('data-ogsc', styles['color']);
    }

    if (!styles['background-color'] && !styles['background']) {
      const tag = el.type === 'tag' ? el.tagName?.toLowerCase() : '';
      if (tag === 'td' || tag === 'th' || tag === 'div') {
        const newStyle = `${style}${style && !style.endsWith(';') ? ';' : ''} background-color: #ffffff`;
        $el.attr('style', newStyle);
        $el.attr('data-ogsb', '#ffffff');
      }
    }
  });
}

function parseStyleString(style: string): Record<string, string> {
  const result: Record<string, string> = {};
  style.split(';').forEach((s) => {
    const [key, ...valueParts] = s.split(':');
    if (key && valueParts.length) {
      result[key.trim().toLowerCase()] = valueParts.join(':').trim();
    }
  });
  return result;
}

export function injectDarkModeSupport(html: string): string {
  const $ = cheerio.load(html, null, false);

  const head = $('head');
  if (head.length) {
    DARK_MODE_META.forEach((meta) => {
      head.prepend(meta);
    });
    head.append(`<style type="text/css">${DARK_MODE_STYLES}</style>`);
  } else {
    const metaBlock = DARK_MODE_META.join('\n');
    const styleBlock = `<style type="text/css">${DARK_MODE_STYLES}</style>`;
    $('html').prepend(`<head>${metaBlock}${styleBlock}</head>`);
  }

  const body = $('body');
  if (body.length) {
    body.addClass('email-body');
    const bodyStyle = body.attr('style') || '';
    if (!bodyStyle.includes('background-color')) {
      body.attr('style', `${bodyStyle}${bodyStyle ? '; ' : ''}background-color: #ffffff`);
    }
  }

  ensureExplicitColors($);

  return $.html();
}
