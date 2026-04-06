export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  html: string;
}

export const emailTemplates: EmailTemplate[] = [
  {
    id: 'weekly-update',
    name: 'Weekly Update',
    description: 'Status report with highlights, KPIs, and action items',
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff;">
  <tr>
    <td style="background-color: #4f46e5; padding: 28px 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td>
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">Weekly Update</h1>
            <p style="color: #c7d2fe; margin: 6px 0 0; font-size: 13px;">Week of [Date] &bull; [Team Name]</p>
          </td>
          <td style="text-align: right; vertical-align: top;">
            <span style="display: inline-block; background-color: #22c55e; color: #ffffff; padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 700;">ON TRACK</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 28px 32px 0;">
      <h2 style="color: #1e293b; font-size: 16px; margin: 0 0 14px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Highlights</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0 8px 12px; border-left: 3px solid #4f46e5;">
            <p style="color: #334155; font-size: 14px; line-height: 1.5; margin: 0;"><strong>Feature launch:</strong> Shipped v2.3 to production with zero downtime</p>
          </td>
        </tr>
        <tr><td style="height: 6px;"></td></tr>
        <tr>
          <td style="padding: 8px 0 8px 12px; border-left: 3px solid #059669;">
            <p style="color: #334155; font-size: 14px; line-height: 1.5; margin: 0;"><strong>Customer win:</strong> Closed 3 enterprise accounts worth $240K ARR</p>
          </td>
        </tr>
        <tr><td style="height: 6px;"></td></tr>
        <tr>
          <td style="padding: 8px 0 8px 12px; border-left: 3px solid #d97706;">
            <p style="color: #334155; font-size: 14px; line-height: 1.5; margin: 0;"><strong>Operations:</strong> Reduced avg response time from 4h to 45min</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 0 32px;">
      <h2 style="color: #1e293b; font-size: 16px; margin: 0 0 14px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Key Metrics</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px;">
        <tr>
          <td width="33%" style="background-color: #f8fafc; padding: 16px; text-align: center; border-radius: 6px;">
            <div style="font-size: 26px; font-weight: 700; color: #4f46e5; line-height: 1;">99.8%</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.5px;">Uptime</div>
          </td>
          <td width="4%"></td>
          <td width="29%" style="background-color: #f8fafc; padding: 16px; text-align: center; border-radius: 6px;">
            <div style="font-size: 26px; font-weight: 700; color: #059669; line-height: 1;">142</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.5px;">Tasks Done</div>
          </td>
          <td width="4%"></td>
          <td width="30%" style="background-color: #f8fafc; padding: 16px; text-align: center; border-radius: 6px;">
            <div style="font-size: 26px; font-weight: 700; color: #d97706; line-height: 1;">4.8</div>
            <div style="font-size: 11px; color: #64748b; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.5px;">CSAT Score</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 0 32px 28px;">
      <h2 style="color: #1e293b; font-size: 16px; margin: 0 0 14px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Next Week</h2>
      <ul style="color: #334155; font-size: 14px; line-height: 1.9; padding-left: 18px; margin: 0;">
        <li>Sprint planning for Q2 initiatives (Monday)</li>
        <li>Customer QBR presentations (Tue &amp; Wed)</li>
        <li>Infrastructure migration Phase 2 kickoff</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="background-color: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0;">
      <p style="color: #94a3b8; font-size: 11px; margin: 0; text-align: center;">Questions? Reply to this email or reach out on Slack &bull; Sent via Email Forge</p>
    </td>
  </tr>
</table>`,
  },
  {
    id: 'announcement',
    name: 'Announcement',
    description: 'Company or product announcement with hero banner and CTA',
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff;">
  <tr>
    <td style="background-color: #4f46e5; padding: 48px 40px; text-align: center;">
      <div style="font-size: 40px; line-height: 1; margin-bottom: 16px;">&#127881;</div>
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; line-height: 1.2;">Exciting Announcement!</h1>
      <p style="color: #c7d2fe; margin: 12px 0 0; font-size: 15px; line-height: 1.5;">Something great is happening and we want you to know about it.</p>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 36px 40px;">
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">Hi Team,</p>
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
        We are thrilled to announce <strong>[your news here]</strong>. This is a significant step forward for our organization and reflects the incredible effort from everyone involved.
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 24px 0;">
        <tr>
          <td style="background-color: #f0fdf4; border-radius: 8px; padding: 20px 24px; border-left: 4px solid #22c55e;">
            <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0;"><strong style="color: #166534;">What this means:</strong> Brief explanation of the impact and what changes going forward.</p>
          </td>
        </tr>
      </table>
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0 0 28px;">Key takeaways:</p>
      <ul style="color: #334155; font-size: 14px; line-height: 2; padding-left: 18px; margin: 0 0 28px;">
        <li>First benefit or change explained</li>
        <li>Second benefit with context</li>
        <li>Timeline and next steps</li>
      </ul>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
        <tr>
          <td style="background-color: #4f46e5; border-radius: 8px;">
            <a href="#" style="display: inline-block; padding: 14px 36px; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600;">Learn More &rarr;</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #f8fafc; padding: 16px 40px; border-top: 1px solid #e2e8f0;">
      <p style="color: #94a3b8; font-size: 11px; margin: 0; text-align: center;">Sent by [Team Name] &bull; <a href="#" style="color: #6366f1; text-decoration: none;">View in browser</a></p>
    </td>
  </tr>
</table>`,
  },
  {
    id: 'professional-letter',
    name: 'Professional Letter',
    description: 'Formal business correspondence with letterhead styling',
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Georgia, 'Times New Roman', serif; background-color: #ffffff;">
  <tr>
    <td style="padding: 32px 40px 24px; border-bottom: 2px solid #1e293b;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td>
            <h1 style="color: #1e293b; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">[Company Name]</h1>
            <p style="color: #64748b; margin: 4px 0 0; font-size: 12px; font-family: Arial, sans-serif;">[Address Line] &bull; [Phone] &bull; [Email]</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 32px 40px;">
      <p style="color: #64748b; font-size: 13px; margin: 0 0 24px; font-family: Arial, sans-serif;">[Date]</p>
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">Dear [Recipient],</p>
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
        I am writing to [purpose of the letter]. We appreciate the opportunity to [context] and look forward to [desired outcome].
      </p>
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
        [Main body of the letter with details, proposals, or information. Keep paragraphs concise and focused on one point each.]
      </p>
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
        Please do not hesitate to contact me if you have any questions or require further information.
      </p>
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 32px 0 0;">
        Sincerely,<br><br>
        <strong>[Your Name]</strong><br>
        <span style="color: #64748b; font-size: 13px; font-family: Arial, sans-serif;">[Title] &bull; [Department]</span>
      </p>
    </td>
  </tr>
</table>`,
  },
  {
    id: 'status-report',
    name: 'Status Report',
    description: 'RAG status indicators, risk matrix, and workstream tracking',
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff;">
  <tr>
    <td style="background-color: #0f172a; padding: 24px 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td>
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">Project Status Report</h1>
            <p style="color: #64748b; margin: 4px 0 0; font-size: 12px;">[Project Name] &bull; [Date] &bull; Sprint [#]</p>
          </td>
          <td style="text-align: right; vertical-align: top;">
            <span style="display: inline-block; background-color: #eab308; color: #ffffff; padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 700;">AT RISK</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 28px 32px 0;">
      <h2 style="color: #1e293b; font-size: 15px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">Executive Summary</h2>
      <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0 0 20px; padding: 14px 16px; background-color: #f8fafc; border-radius: 6px;">
        Development is progressing on track for Phase 1 delivery. One risk identified around third-party API integration timeline. Testing coverage at 87% with target of 95% by EOW.
      </p>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 0 32px;">
      <h2 style="color: #1e293b; font-size: 15px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">Workstream Status</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px; font-size: 13px;">
        <tr style="background-color: #f1f5f9;">
          <td style="padding: 10px 12px; font-weight: 700; color: #475569; border-bottom: 2px solid #e2e8f0;">Workstream</td>
          <td style="padding: 10px 12px; font-weight: 700; color: #475569; text-align: center; border-bottom: 2px solid #e2e8f0; width: 70px;">Status</td>
          <td style="padding: 10px 12px; font-weight: 700; color: #475569; text-align: center; border-bottom: 2px solid #e2e8f0; width: 70px;">Progress</td>
          <td style="padding: 10px 12px; font-weight: 700; color: #475569; border-bottom: 2px solid #e2e8f0;">Owner</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; color: #334155; border-bottom: 1px solid #f1f5f9;">Backend API</td>
          <td style="padding: 10px 12px; text-align: center; border-bottom: 1px solid #f1f5f9;"><span style="display: inline-block; width: 10px; height: 10px; background-color: #22c55e; border-radius: 50%;"></span></td>
          <td style="padding: 10px 12px; text-align: center; color: #334155; border-bottom: 1px solid #f1f5f9;">92%</td>
          <td style="padding: 10px 12px; color: #64748b; border-bottom: 1px solid #f1f5f9;">[Name]</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; color: #334155; border-bottom: 1px solid #f1f5f9;">Frontend UI</td>
          <td style="padding: 10px 12px; text-align: center; border-bottom: 1px solid #f1f5f9;"><span style="display: inline-block; width: 10px; height: 10px; background-color: #eab308; border-radius: 50%;"></span></td>
          <td style="padding: 10px 12px; text-align: center; color: #334155; border-bottom: 1px solid #f1f5f9;">65%</td>
          <td style="padding: 10px 12px; color: #64748b; border-bottom: 1px solid #f1f5f9;">[Name]</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; color: #334155; border-bottom: 1px solid #f1f5f9;">QA / Testing</td>
          <td style="padding: 10px 12px; text-align: center; border-bottom: 1px solid #f1f5f9;"><span style="display: inline-block; width: 10px; height: 10px; background-color: #22c55e; border-radius: 50%;"></span></td>
          <td style="padding: 10px 12px; text-align: center; color: #334155; border-bottom: 1px solid #f1f5f9;">87%</td>
          <td style="padding: 10px 12px; color: #64748b; border-bottom: 1px solid #f1f5f9;">[Name]</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; color: #334155;">Infrastructure</td>
          <td style="padding: 10px 12px; text-align: center;"><span style="display: inline-block; width: 10px; height: 10px; background-color: #ef4444; border-radius: 50%;"></span></td>
          <td style="padding: 10px 12px; text-align: center; color: #334155;">40%</td>
          <td style="padding: 10px 12px; color: #64748b;">[Name]</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 0 32px 28px;">
      <h2 style="color: #1e293b; font-size: 15px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">Risks &amp; Blockers</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td style="padding: 12px 16px; background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 4px; margin-bottom: 8px;">
            <p style="color: #334155; font-size: 13px; line-height: 1.5; margin: 0;"><strong style="color: #dc2626;">BLOCKER:</strong> Cloud provider approval pending for production environment &mdash; ETA: [Date]</p>
          </td>
        </tr>
        <tr><td style="height: 8px;"></td></tr>
        <tr>
          <td style="padding: 12px 16px; background-color: #fefce8; border-left: 4px solid #eab308; border-radius: 4px;">
            <p style="color: #334155; font-size: 13px; line-height: 1.5; margin: 0;"><strong style="color: #ca8a04;">RISK:</strong> Third-party API rate limits may impact performance. Mitigation: Implementing caching layer.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0;">
      <p style="color: #94a3b8; font-size: 11px; margin: 0; text-align: center;">Next update: [Date] &bull; Reply with questions or feedback</p>
    </td>
  </tr>
</table>`,
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'Multi-section newsletter with featured article and content cards',
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff;">
  <tr>
    <td style="background-color: #1e293b; padding: 20px 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td>
            <h1 style="color: #ffffff; margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 1px;">THE NEWSLETTER</h1>
            <p style="color: #64748b; margin: 4px 0 0; font-size: 11px;">Issue #01 &bull; [Month Year]</p>
          </td>
          <td style="text-align: right;">
            <a href="#" style="color: #818cf8; font-size: 12px; text-decoration: none;">View online &rarr;</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #4f46e5; padding: 40px 32px; text-align: center;">
      <p style="color: #c7d2fe; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 12px;">Featured</p>
      <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; line-height: 1.3;">Your Featured Story Headline Goes Right Here</h2>
      <p style="color: #e0e7ff; margin: 14px 0 24px; font-size: 14px; line-height: 1.5;">A compelling teaser that draws readers in and gives them a reason to keep reading.</p>
      <a href="#" style="display: inline-block; background-color: #ffffff; color: #4f46e5; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 13px;">Read Full Story</a>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 28px 32px;">
      <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px; font-weight: 700;">Latest Updates</p>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
        <tr>
          <td style="padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #4f46e5;">
            <h3 style="color: #1e293b; font-size: 15px; margin: 0 0 6px; font-weight: 600;">Product Update: New Dashboard</h3>
            <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0 0 8px;">We've redesigned the analytics dashboard with better visualizations and faster load times.</p>
            <a href="#" style="color: #4f46e5; font-size: 13px; text-decoration: none; font-weight: 600;">Read more &rarr;</a>
          </td>
        </tr>
      </table>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px;">
        <tr>
          <td style="padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #059669;">
            <h3 style="color: #1e293b; font-size: 15px; margin: 0 0 6px; font-weight: 600;">Customer Success Story</h3>
            <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0 0 8px;">How Acme Corp reduced their deployment time by 60% using our platform.</p>
            <a href="#" style="color: #059669; font-size: 13px; text-decoration: none; font-weight: 600;">Read more &rarr;</a>
          </td>
        </tr>
      </table>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 0;">
        <tr>
          <td style="padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #d97706;">
            <h3 style="color: #1e293b; font-size: 15px; margin: 0 0 6px; font-weight: 600;">Upcoming Webinar: Q2 Roadmap</h3>
            <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0 0 8px;">Join us on [Date] for a deep dive into our Q2 plans and upcoming features.</p>
            <a href="#" style="color: #d97706; font-size: 13px; text-decoration: none; font-weight: 600;">Register &rarr;</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #1e293b; padding: 24px 32px; text-align: center;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0;">You're receiving this because you subscribed.</p>
      <p style="color: #64748b; font-size: 11px; margin: 8px 0 0;"><a href="#" style="color: #818cf8; text-decoration: none;">Unsubscribe</a> &bull; <a href="#" style="color: #818cf8; text-decoration: none;">Preferences</a> &bull; <a href="#" style="color: #818cf8; text-decoration: none;">View online</a></p>
    </td>
  </tr>
</table>`,
  },
  {
    id: 'meeting-recap',
    name: 'Meeting Recap',
    description: 'Post-meeting summary with decisions, action items, and owners',
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff;">
  <tr>
    <td style="background-color: #0f172a; padding: 24px 32px;">
      <p style="color: #64748b; font-size: 12px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 1px;">Meeting Recap</p>
      <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">[Meeting Title]</h1>
      <p style="color: #94a3b8; margin: 8px 0 0; font-size: 13px;">[Date] &bull; [Time] &bull; Attendees: [Names]</p>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 28px 32px 0;">
      <h2 style="color: #1e293b; font-size: 15px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">Key Decisions</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 14px; background-color: #f0fdf4; border-radius: 6px; border-left: 4px solid #22c55e;">
            <p style="color: #334155; font-size: 14px; line-height: 1.5; margin: 0;">&#10003; Approved budget increase for Q2 marketing campaign</p>
          </td>
        </tr>
        <tr><td style="height: 8px;"></td></tr>
        <tr>
          <td style="padding: 10px 14px; background-color: #f0fdf4; border-radius: 6px; border-left: 4px solid #22c55e;">
            <p style="color: #334155; font-size: 14px; line-height: 1.5; margin: 0;">&#10003; Moving to bi-weekly sprint cadence starting next month</p>
          </td>
        </tr>
        <tr><td style="height: 8px;"></td></tr>
        <tr>
          <td style="padding: 10px 14px; background-color: #f0fdf4; border-radius: 6px; border-left: 4px solid #22c55e;">
            <p style="color: #334155; font-size: 14px; line-height: 1.5; margin: 0;">&#10003; Postponing feature X launch to [New Date] for additional testing</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 0 32px;">
      <h2 style="color: #1e293b; font-size: 15px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">Action Items</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px; font-size: 13px;">
        <tr style="background-color: #f1f5f9;">
          <td style="padding: 10px 12px; font-weight: 700; color: #475569; border-bottom: 2px solid #e2e8f0;">Action</td>
          <td style="padding: 10px 12px; font-weight: 700; color: #475569; text-align: center; border-bottom: 2px solid #e2e8f0; width: 80px;">Owner</td>
          <td style="padding: 10px 12px; font-weight: 700; color: #475569; text-align: center; border-bottom: 2px solid #e2e8f0; width: 80px;">Due</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; color: #334155; border-bottom: 1px solid #f1f5f9;">Draft updated project timeline</td>
          <td style="padding: 10px 12px; color: #64748b; text-align: center; border-bottom: 1px solid #f1f5f9;">[Name]</td>
          <td style="padding: 10px 12px; color: #64748b; text-align: center; border-bottom: 1px solid #f1f5f9;">[Date]</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; color: #334155; border-bottom: 1px solid #f1f5f9;">Schedule vendor evaluation meeting</td>
          <td style="padding: 10px 12px; color: #64748b; text-align: center; border-bottom: 1px solid #f1f5f9;">[Name]</td>
          <td style="padding: 10px 12px; color: #64748b; text-align: center; border-bottom: 1px solid #f1f5f9;">[Date]</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; color: #334155;">Share design mockups for review</td>
          <td style="padding: 10px 12px; color: #64748b; text-align: center;">[Name]</td>
          <td style="padding: 10px 12px; color: #64748b; text-align: center;">[Date]</td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 0 32px 28px;">
      <h2 style="color: #1e293b; font-size: 15px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">Discussion Notes</h2>
      <ul style="color: #334155; font-size: 14px; line-height: 1.8; padding-left: 18px; margin: 0;">
        <li>Discussed trade-offs between approach A and B; leaning toward A for simplicity</li>
        <li>Need to validate assumptions with customer interviews before proceeding</li>
        <li>Next meeting: [Date &amp; Time]</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="background-color: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0;">
      <p style="color: #94a3b8; font-size: 11px; margin: 0; text-align: center;">Please reply with corrections or additions &bull; Next meeting: [Date]</p>
    </td>
  </tr>
</table>`,
  },
  {
    id: 'onboarding-welcome',
    name: 'Welcome Email',
    description: 'New employee or customer onboarding with steps and resources',
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff;">
  <tr>
    <td style="background-color: #4f46e5; padding: 40px 32px; text-align: center;">
      <div style="font-size: 36px; line-height: 1; margin-bottom: 12px;">&#128075;</div>
      <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700;">Welcome Aboard!</h1>
      <p style="color: #c7d2fe; margin: 10px 0 0; font-size: 14px;">We're excited to have you on the team.</p>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 32px;">
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0 0 20px;">Hi [Name],</p>
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
        Welcome to [Company]! Here's everything you need to get started on your first day.
      </p>

      <h2 style="color: #1e293b; font-size: 15px; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">Getting Started</h2>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 12px;">
        <tr>
          <td width="36" style="vertical-align: top; padding-top: 2px;">
            <div style="width: 28px; height: 28px; background-color: #4f46e5; border-radius: 50%; color: #ffffff; font-size: 13px; font-weight: 700; text-align: center; line-height: 28px;">1</div>
          </td>
          <td style="padding: 0 0 16px 12px;">
            <p style="color: #1e293b; font-size: 14px; font-weight: 600; margin: 0 0 2px;">Set up your accounts</p>
            <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">Check your inbox for invites to Slack, Jira, and GitHub. Accept them all.</p>
          </td>
        </tr>
      </table>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 12px;">
        <tr>
          <td width="36" style="vertical-align: top; padding-top: 2px;">
            <div style="width: 28px; height: 28px; background-color: #4f46e5; border-radius: 50%; color: #ffffff; font-size: 13px; font-weight: 700; text-align: center; line-height: 28px;">2</div>
          </td>
          <td style="padding: 0 0 16px 12px;">
            <p style="color: #1e293b; font-size: 14px; font-weight: 600; margin: 0 0 2px;">Review the handbook</p>
            <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">Our employee handbook covers policies, benefits, and team norms.</p>
          </td>
        </tr>
      </table>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px;">
        <tr>
          <td width="36" style="vertical-align: top; padding-top: 2px;">
            <div style="width: 28px; height: 28px; background-color: #4f46e5; border-radius: 50%; color: #ffffff; font-size: 13px; font-weight: 700; text-align: center; line-height: 28px;">3</div>
          </td>
          <td style="padding: 0 0 0 12px;">
            <p style="color: #1e293b; font-size: 14px; font-weight: 600; margin: 0 0 2px;">Meet your buddy</p>
            <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">[Buddy Name] will be your go-to person for the first 30 days.</p>
          </td>
        </tr>
      </table>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px;">
        <tr>
          <td style="background-color: #eff6ff; border-radius: 8px; padding: 20px 24px; border-left: 4px solid #3b82f6;">
            <p style="color: #1e40af; font-size: 14px; font-weight: 600; margin: 0 0 4px;">Quick Links</p>
            <p style="color: #334155; font-size: 13px; line-height: 1.8; margin: 0;">
              <a href="#" style="color: #4f46e5; text-decoration: none;">Employee Handbook</a> &bull;
              <a href="#" style="color: #4f46e5; text-decoration: none;">IT Setup Guide</a> &bull;
              <a href="#" style="color: #4f46e5; text-decoration: none;">Benefits Portal</a> &bull;
              <a href="#" style="color: #4f46e5; text-decoration: none;">Team Directory</a>
            </p>
          </td>
        </tr>
      </table>

      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0;">
        If you have any questions at all, don't hesitate to reach out. We're here to help!
      </p>
    </td>
  </tr>
  <tr>
    <td style="background-color: #f8fafc; padding: 16px 32px; border-top: 1px solid #e2e8f0;">
      <p style="color: #94a3b8; font-size: 11px; margin: 0; text-align: center;">[Company Name] &bull; People &amp; Culture Team</p>
    </td>
  </tr>
</table>`,
  },
  {
    id: 'blank',
    name: 'Blank Canvas',
    description: 'Empty 600px email wrapper - build from scratch',
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif; background-color: #ffffff;">
  <tr>
    <td style="background-color: #ffffff; padding: 32px;">
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0;">
        Start writing your email here...
      </p>
    </td>
  </tr>
</table>`,
  },
];
