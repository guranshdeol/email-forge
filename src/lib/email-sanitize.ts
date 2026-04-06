import * as cheerio from 'cheerio';

const DANGEROUS_TAGS = ['script', 'iframe', 'object', 'embed', 'form', 'input', 'textarea', 'select', 'button'];

const DANGEROUS_ATTRIBUTES = ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur'];

export function sanitizeEmailHtml(html: string): string {
  const $ = cheerio.load(html, null, false);

  DANGEROUS_TAGS.forEach((tag) => {
    $(tag).remove();
  });

  $('*').each((_, el) => {
    const $el = $(el);
    DANGEROUS_ATTRIBUTES.forEach((attr) => {
      $el.removeAttr(attr);
    });

    const href = $el.attr('href');
    if (href && (href.startsWith('javascript:') || href.startsWith('data:'))) {
      $el.removeAttr('href');
    }
  });

  return $.html();
}
