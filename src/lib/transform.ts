import juice from 'juice';
import { applyOutlookFixes } from './outlook-fixes';
import { injectDarkModeSupport } from './dark-mode';
import { sanitizeEmailHtml } from './email-sanitize';

function ensureHtmlStructure(html: string): string {
  const trimmed = html.trim();
  if (!trimmed.toLowerCase().includes('<!doctype') && !trimmed.toLowerCase().includes('<html')) {
    return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!--[if !mso]><!-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <!--<![endif]-->
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
  ${trimmed}
</body>
</html>`;
  }
  return trimmed;
}

export function transformEmailHtml(rawHtml: string): string {
  let html = ensureHtmlStructure(rawHtml);

  html = sanitizeEmailHtml(html);

  html = juice(html, {
    preserveImportant: true,
    preserveMediaQueries: true,
    preserveFontFaces: true,
    applyStyleTags: true,
    removeStyleTags: false,
    insertPreservedExtraCss: true,
  });

  html = applyOutlookFixes(html);

  html = injectDarkModeSupport(html);

  return html;
}
