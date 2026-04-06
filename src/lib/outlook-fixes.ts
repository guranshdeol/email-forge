import * as cheerio from 'cheerio';

const UNSUPPORTED_CSS_PROPERTIES = [
  'flex', 'flex-direction', 'flex-wrap', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-basis',
  'justify-content', 'align-items', 'align-self', 'align-content', 'order',
  'grid', 'grid-template', 'grid-template-columns', 'grid-template-rows', 'grid-area',
  'grid-column', 'grid-row', 'grid-gap', 'gap', 'column-gap', 'row-gap',
  'position', 'top', 'right', 'bottom', 'left', 'z-index',
  'float', 'clear',
  'box-shadow', 'text-shadow',
  'opacity', 'filter',
  'transform', 'transition', 'animation',
  'overflow', 'overflow-x', 'overflow-y',
  'resize', 'cursor', 'outline',
];

function stripUnsupportedCSS(style: string): string {
  return style
    .split(';')
    .map((s) => s.trim())
    .filter((s) => {
      if (!s) return false;
      const prop = s.split(':')[0]?.trim().toLowerCase();
      return !UNSUPPORTED_CSS_PROPERTIES.some(
        (unsupported) => prop === unsupported || prop?.startsWith(unsupported + '-')
      );
    })
    .join('; ');
}

function addMSOLineHeight($: cheerio.CheerioAPI) {
  $('[style*="line-height"]').each((_, el) => {
    const style = $(el).attr('style') || '';
    if (!style.includes('mso-line-height-rule')) {
      $(el).attr('style', `mso-line-height-rule: exactly; ${style}`);
    }
  });
}

function fixImages($: cheerio.CheerioAPI) {
  $('img').each((_, el) => {
    const $el = $(el);
    const style = $el.attr('style') || '';
    if (!style.includes('display')) {
      $el.attr('style', `display: block; ${style}`);
    }
    if (!$el.attr('border')) {
      $el.attr('border', '0');
    }
  });
}

function addTableAttributes($: cheerio.CheerioAPI) {
  $('table').each((_, el) => {
    const $el = $(el);
    if (!$el.attr('cellpadding')) $el.attr('cellpadding', '0');
    if (!$el.attr('cellspacing')) $el.attr('cellspacing', '0');
    if (!$el.attr('role')) $el.attr('role', 'presentation');
    if (!$el.attr('border')) $el.attr('border', '0');
  });
}

function wrapInMSOContainer(html: string, width: number = 600): string {
  const msoOpen = `<!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="${width}" align="center"><tr><td><![endif]-->`;
  const msoClose = `<!--[if mso]></td></tr></table><![endif]-->`;

  const $ = cheerio.load(html);
  const body = $('body');

  const outerTable = body.find('table').first();
  if (outerTable.length) {
    const tableStyle = outerTable.attr('style') || '';
    if (
      tableStyle.includes('max-width') ||
      tableStyle.includes('margin: 0 auto') ||
      tableStyle.includes('margin:0 auto')
    ) {
      outerTable.before(msoOpen);
      outerTable.after(msoClose);
    }
  }

  return $.html();
}

function cleanInlineStyles($: cheerio.CheerioAPI) {
  $('[style]').each((_, el) => {
    const style = $(el).attr('style') || '';
    const cleaned = stripUnsupportedCSS(style);
    if (cleaned) {
      $(el).attr('style', cleaned);
    } else {
      $(el).removeAttr('style');
    }
  });
}

function convertBorderRadius($: cheerio.CheerioAPI) {
  $('[style*="border-radius"]').each((_, el) => {
    const style = $(el).attr('style') || '';
    const cleaned = style
      .split(';')
      .filter((s) => !s.trim().toLowerCase().startsWith('border-radius'))
      .join(';');
    $(el).attr('style', cleaned);
  });
}

export function applyOutlookFixes(html: string): string {
  const $ = cheerio.load(html, null, false);

  addMSOLineHeight($);
  fixImages($);
  addTableAttributes($);
  convertBorderRadius($);
  cleanInlineStyles($);

  let result = $.html();
  result = wrapInMSOContainer(result);

  return result;
}
