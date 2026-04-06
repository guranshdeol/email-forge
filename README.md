

# Email Forge

**Compose, transform, and send HTML emails that render perfectly everywhere.**  
Paste your HTML → get email-client-safe output → send or copy to clipboard.

---

## The Problem

HTML emails are broken by design. Every email client renders them differently:

- **Outlook** uses Word's HTML engine and ignores `max-width`, `flexbox`, `grid`, and `margin: auto`
- **Gmail** strips `<style>` blocks entirely
- **Apple Mail** auto-inverts colors in dark mode
- **Yahoo** rewrites your class names

You write a beautiful email, hit send, and it looks like garbage in half your recipients' inboxes.

## The Solution

Email Forge takes your HTML and runs it through a transformation pipeline that fixes all of this **before** you send:

```
Your HTML  →  CSS Inlining  →  Outlook Fixes  →  Dark Mode Support  →  Sanitization  →  Ready to Send
```

Paste raw HTML in the editor, see the transformed result in real-time, and either send via SMTP or copy to clipboard.

## Features


| Feature                     | Description                                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| **Monaco Code Editor**      | Full-featured HTML editor with syntax highlighting and autocomplete                      |
| **Live Preview**            | Side-by-side preview with light/dark mode toggle                                         |
| **Transformation Pipeline** | CSS inlining, Outlook fixes, dark mode support, sanitization                             |
| **SMTP Sending**            | Configure any SMTP server from the UI — credentials encrypted locally                    |
| **Clipboard Export**        | Copy as raw HTML or rich text for pasting into any email client                          |
| **Email Chip Input**        | Add/remove multiple recipients with tag-style chips (To, CC, BCC)                        |
| **Template Library**        | 8 pre-built templates: weekly update, status report, newsletter, meeting recap, and more |
| **Glassmorphism UI**        | Modern frosted glass interface with ambient lighting effects                             |
| **Docker Ready**            | One command to run — no local Node.js required                                           |


## Quick Start

### Docker (recommended)

```bash
git clone https://github.com/guranshdeol/email-forge.git
cd email-forge
cp .env.example .env.local
docker compose --profile dev up
```

Open **[http://localhost:3000](http://localhost:3000)**

### Native (Node.js 20+)

```bash
git clone https://github.com/guranshdeol/email-forge.git
cd email-forge
npm install
cp .env.example .env.local
npm run dev
```

### Dev Container

1. Open the folder in VS Code / Cursor
2. Click **"Reopen in Container"** when prompted
3. Run `npm run dev`

> **SMTP is optional.** Without it, the editor, preview, transformation pipeline, and clipboard copy all work perfectly. Configure SMTP only when you want to send directly.

## What the Pipeline Fixes


| Email Client Problem                        | What Email Forge Does                                                                    |
| ------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `<style>` blocks stripped (Gmail, Outlook)  | Inlines all CSS into `style` attributes via [juice](https://github.com/Automattic/juice) |
| `margin: 0 auto` centering broken (Outlook) | Wraps tables with `align="center"` and MSO conditionals                                  |
| `max-width` ignored (Outlook)               | Sets explicit `width` attributes on tables                                               |
| `flexbox` / `grid` not supported (Outlook)  | Strips unsupported CSS properties to prevent layout breaks                               |
| Dark mode inverts colors unpredictably      | Adds explicit `background-color`, `color`, `data-ogsb`/`data-ogsc` attributes            |
| Line-height inconsistent (Outlook)          | Injects `mso-line-height-rule: exactly`                                                  |
| Image spacing gaps                          | Adds `display: block` and `border="0"` to `<img>` tags                                   |
| Scripts, forms, event handlers              | Strips all dangerous content for email safety                                            |


## SMTP Configuration

Configure SMTP from the **Settings** page in the app, or create `.env.local`:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_REQUIRE_TLS=true
SMTP_USER=your-username@example.com
SMTP_PASSWORD=your-password
SMTP_FROM=Your Name <your-username@example.com>
```

The Settings page includes quick presets for **Gmail**, **Outlook 365**, and **Yahoo**. Passwords saved through the UI are encrypted with AES-256-GCM and stored in `.data/smtp-config.json` (git-ignored).

## Project Structure

```
email-forge/
├── src/
│   ├── app/                    # Next.js App Router pages & API routes
│   │   ├── page.tsx            # Main compose page
│   │   ├── settings/           # SMTP settings page
│   │   ├── api/
│   │   │   ├── transform/      # HTML transformation endpoint
│   │   │   ├── send/           # SMTP send endpoint
│   │   │   └── settings/       # Settings CRUD endpoint
│   │   ├── layout.tsx          # Root layout with glass sidebar
│   │   └── globals.css         # Glass effect styles
│   ├── components/
│   │   ├── editor/             # Monaco code editor
│   │   ├── preview/            # iframe-based email preview
│   │   ├── compose/            # Compose form + email chip input
│   │   └── templates/          # Template gallery + template data
│   └── lib/
│       ├── transform.ts        # Pipeline orchestrator
│       ├── outlook-fixes.ts    # MSO conditionals, table fixes
│       ├── dark-mode.ts        # Color-scheme meta, data-ogs* attrs
│       ├── email-sanitize.ts   # Strip scripts, forms, handlers
│       ├── smtp.ts             # Nodemailer transport config
│       └── crypto.ts           # AES-256-GCM password encryption
├── Dockerfile                  # Multi-stage production build
├── docker-compose.yml          # Dev + prod profiles
└── .devcontainer/              # VS Code Dev Container config
```

## Tech Stack

All open source. No paid services. No API keys needed.

- **[Next.js 14](https://nextjs.org/)** — React framework with App Router
- **[Monaco Editor](https://microsoft.github.io/monaco-editor/)** — VS Code's editor in the browser
- **[juice](https://github.com/Automattic/juice)** — CSS inlining engine
- **[cheerio](https://cheerio.js.org/)** — Server-side HTML manipulation
- **[Nodemailer](https://nodemailer.com/)** — SMTP email sending
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first styling
- **[sonner](https://sonner.emilkowal.dev/)** — Toast notifications

## Docker

```bash
# Development (hot reload, volume-mounted source)
docker compose --profile dev up

# Production (standalone build)
docker compose --profile prod up --build
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE) — use it however you want.