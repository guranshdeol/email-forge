# Email Forge

Compose, transform, and send email-safe HTML emails with live preview and dark mode support.

Email Forge solves the problem of HTML emails rendering differently across email clients. It takes your HTML, inlines CSS, applies Outlook-specific fixes, adds dark mode support, and lets you either send via SMTP or copy the transformed HTML to your clipboard.

## Features

- **Dual Editor**: Monaco code editor (paste raw HTML) and TipTap WYSIWYG visual editor
- **Email-Safe Transformation Pipeline**: CSS inlining, Outlook conditional comments, MSO fixes, image fixes
- **Dark Mode Support**: Injects `color-scheme` meta tags, explicit background/text colors, `data-ogsb`/`data-ogsc` attributes
- **Live Preview**: Side-by-side preview with light/dark mode toggle and source view
- **SMTP Sending**: Configure any SMTP server to send emails directly
- **Copy to Clipboard**: Copy transformed HTML or rich text for pasting into any email client
- **Template Library**: Pre-built email-safe templates (weekly update, announcement, newsletter, status report, etc.)
- **Containerized**: Docker and Dev Container support for easy setup

## Quick Start

### Option 1: Docker Compose (recommended)

```bash
cp .env.example .env.local
# Edit .env.local with your SMTP settings (optional - clipboard always works)
docker compose --profile dev up
```

Open [http://localhost:3000](http://localhost:3000).

### Option 2: Dev Container (for development)

1. Open this folder in VS Code or Cursor
2. When prompted, click "Reopen in Container"
3. Run `npm run dev` in the terminal
4. Open [http://localhost:3000](http://localhost:3000)

### Option 3: Native (requires Node.js 20+)

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your SMTP settings (optional)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## SMTP Configuration

SMTP is optional. Without it, you can still use the transformation pipeline and copy emails to clipboard.

Create a `.env.local` file in the project root:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true
SMTP_USER=your-username@example.com
SMTP_PASSWORD=your-password
SMTP_FROM=Your Name <your-username@example.com>
```

See the Settings page in the app for common SMTP configurations (Gmail, Outlook, corporate relays).

## What the Transformation Pipeline Does

| Problem | Fix |
|---------|-----|
| `<style>` blocks stripped by email clients | Inlines all CSS into `style` attributes |
| `margin: 0 auto` centering broken in Outlook | Wraps in `<table align="center">` |
| `max-width` ignored in Outlook | Uses `width` attribute on tables |
| `padding` on `<div>` ignored | Uses `<td>` padding instead |
| Dark mode inverts colors unpredictably | Adds explicit colors, `data-ogsb`/`data-ogsc` attributes, `color-scheme` meta |
| Line-height inconsistent in Outlook | Adds `mso-line-height-rule: exactly` |
| Image spacing gaps | Adds `display: block` and `border="0"` to images |
| Dangerous content (scripts, forms) | Strips scripts, forms, event handlers |

## Tech Stack

All open source, no paid services:

- [Next.js](https://nextjs.org/) - React framework
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [TipTap](https://tiptap.dev/) - WYSIWYG editor
- [juice](https://github.com/Automattic/juice) - CSS inlining
- [cheerio](https://cheerio.js.org/) - HTML manipulation
- [Nodemailer](https://nodemailer.com/) - SMTP sending
- [Tailwind CSS](https://tailwindcss.com/) - UI styling
- [sonner](https://sonner.emilkowal.dev/) - Toast notifications

## License

MIT
