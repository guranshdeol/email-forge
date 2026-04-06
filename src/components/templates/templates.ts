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
    description: 'Clean weekly status report with sections for highlights, metrics, and next steps',
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
  <tr>
    <td style="background-color: #4f46e5; padding: 24px 32px; border-radius: 8px 8px 0 0;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Weekly Update</h1>
      <p style="color: #c7d2fe; margin: 8px 0 0; font-size: 14px;">Week of [Date]</p>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 32px;">
      <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Highlights</h2>
      <ul style="color: #334155; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0 0 24px;">
        <li>Completed feature X - now in production</li>
        <li>Resolved 5 customer-reported issues</li>
        <li>Onboarded 3 new accounts</li>
      </ul>

      <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Key Metrics</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 24px;">
        <tr>
          <td style="background-color: #f8fafc; padding: 16px; text-align: center; border-radius: 8px; width: 33%;">
            <div style="font-size: 28px; font-weight: 700; color: #4f46e5;">98%</div>
            <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Uptime</div>
          </td>
          <td style="width: 12px;"></td>
          <td style="background-color: #f8fafc; padding: 16px; text-align: center; border-radius: 8px; width: 33%;">
            <div style="font-size: 28px; font-weight: 700; color: #059669;">24</div>
            <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Tickets Closed</div>
          </td>
          <td style="width: 12px;"></td>
          <td style="background-color: #f8fafc; padding: 16px; text-align: center; border-radius: 8px; width: 33%;">
            <div style="font-size: 28px; font-weight: 700; color: #d97706;">3</div>
            <div style="font-size: 12px; color: #64748b; margin-top: 4px;">New Accounts</div>
          </td>
        </tr>
      </table>

      <h2 style="color: #1e293b; font-size: 18px; margin: 0 0 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Next Week</h2>
      <ul style="color: #334155; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0;">
        <li>Launch feature Y beta</li>
        <li>Customer review meetings (Tue &amp; Thu)</li>
        <li>Q2 planning session</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td style="background-color: #f8fafc; padding: 20px 32px; border-radius: 0 0 8px 8px; border-top: 1px solid #e2e8f0;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">Questions? Reply to this email or reach out on Slack.</p>
    </td>
  </tr>
</table>`,
  },
  {
    id: 'announcement',
    name: 'Announcement',
    description: 'Bold announcement email with a hero section and call-to-action button',
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
  <tr>
    <td style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 48px 32px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 800; line-height: 1.2;">Big News!</h1>
      <p style="color: #e0e7ff; margin: 16px 0 0; font-size: 16px; line-height: 1.5;">We're excited to share something important with you.</p>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 40px 32px;">
      <p style="color: #334155; font-size: 16px; line-height: 1.7; margin: 0 0 20px;">
        Dear Team,
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7; margin: 0 0 20px;">
        We are pleased to announce [your announcement here]. This represents a significant milestone for our team and our customers.
      </p>
      <p style="color: #334155; font-size: 16px; line-height: 1.7; margin: 0 0 32px;">
        Here's what this means for you:
      </p>
      <ul style="color: #334155; font-size: 15px; line-height: 2; padding-left: 20px; margin: 0 0 32px;">
        <li>Benefit one explained clearly</li>
        <li>Benefit two with context</li>
        <li>What to expect next</li>
      </ul>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
        <tr>
          <td style="background-color: #4f46e5; border-radius: 6px;">
            <a href="#" style="display: inline-block; padding: 14px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600;">Learn More</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #f8fafc; padding: 20px 32px; border-radius: 0 0 8px 8px; border-top: 1px solid #e2e8f0;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">Sent by Your Team | <a href="#" style="color: #6366f1;">Unsubscribe</a></p>
    </td>
  </tr>
</table>`,
  },
  {
    id: 'simple-text',
    name: 'Simple Text',
    description: 'Clean, minimal text-only email for professional correspondence',
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
  <tr>
    <td style="background-color: #ffffff; padding: 40px 32px;">
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
        Hi [Name],
      </p>
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
        I wanted to follow up on our conversation from earlier this week. Here's a quick summary of the key points we discussed:
      </p>
      <ol style="color: #334155; font-size: 15px; line-height: 1.9; padding-left: 20px; margin: 0 0 16px;">
        <li>First point with context</li>
        <li>Second point with details</li>
        <li>Action items and next steps</li>
      </ol>
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">
        Please let me know if you have any questions or if I've missed anything.
      </p>
      <p style="color: #334155; font-size: 15px; line-height: 1.7; margin: 24px 0 0;">
        Best regards,<br>
        [Your Name]
      </p>
    </td>
  </tr>
</table>`,
  },
  {
    id: 'status-report',
    name: 'Status Report',
    description: 'Structured status report with RAG indicators and risk tracking',
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
  <tr>
    <td style="background-color: #0f172a; padding: 24px 32px; border-radius: 8px 8px 0 0;">
      <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700;">Project Status Report</h1>
      <p style="color: #94a3b8; margin: 4px 0 0; font-size: 13px;">[Project Name] | [Date]</p>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 32px;">
      <h2 style="color: #1e293b; font-size: 16px; margin: 0 0 12px;">Overall Status</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 28px;">
        <tr>
          <td style="padding: 12px 16px; background-color: #f0fdf4; border-left: 4px solid #22c55e; border-radius: 4px;">
            <strong style="color: #166534; font-size: 14px;">ON TRACK</strong>
            <span style="color: #334155; font-size: 13px; margin-left: 8px;">All milestones are progressing as planned.</span>
          </td>
        </tr>
      </table>

      <h2 style="color: #1e293b; font-size: 16px; margin: 0 0 12px;">Workstream Status</h2>
      <table role="presentation" cellpadding="8" cellspacing="0" border="0" width="100%" style="margin-bottom: 28px; font-size: 13px;">
        <tr style="background-color: #f8fafc;">
          <th style="text-align: left; color: #64748b; font-weight: 600; padding: 10px; border-bottom: 2px solid #e2e8f0;">Workstream</th>
          <th style="text-align: center; color: #64748b; font-weight: 600; padding: 10px; border-bottom: 2px solid #e2e8f0;">Status</th>
          <th style="text-align: left; color: #64748b; font-weight: 600; padding: 10px; border-bottom: 2px solid #e2e8f0;">Notes</th>
        </tr>
        <tr>
          <td style="color: #334155; padding: 10px; border-bottom: 1px solid #f1f5f9;">Infrastructure</td>
          <td style="text-align: center; padding: 10px; border-bottom: 1px solid #f1f5f9;"><span style="background-color: #22c55e; color: white; padding: 2px 10px; border-radius: 12px; font-size: 11px; font-weight: 600;">GREEN</span></td>
          <td style="color: #64748b; padding: 10px; border-bottom: 1px solid #f1f5f9;">Deployment completed</td>
        </tr>
        <tr>
          <td style="color: #334155; padding: 10px; border-bottom: 1px solid #f1f5f9;">Development</td>
          <td style="text-align: center; padding: 10px; border-bottom: 1px solid #f1f5f9;"><span style="background-color: #eab308; color: white; padding: 2px 10px; border-radius: 12px; font-size: 11px; font-weight: 600;">AMBER</span></td>
          <td style="color: #64748b; padding: 10px; border-bottom: 1px solid #f1f5f9;">Minor delay on API integration</td>
        </tr>
        <tr>
          <td style="color: #334155; padding: 10px;">Testing</td>
          <td style="text-align: center; padding: 10px;"><span style="background-color: #22c55e; color: white; padding: 2px 10px; border-radius: 12px; font-size: 11px; font-weight: 600;">GREEN</span></td>
          <td style="color: #64748b; padding: 10px;">Test plan approved</td>
        </tr>
      </table>

      <h2 style="color: #1e293b; font-size: 16px; margin: 0 0 12px;">Risks &amp; Blockers</h2>
      <table role="presentation" cellpadding="8" cellspacing="0" border="0" width="100%" style="font-size: 13px;">
        <tr>
          <td style="padding: 10px; background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 4px; margin-bottom: 8px;">
            <strong style="color: #991b1b;">Risk:</strong>
            <span style="color: #334155;"> Third-party API rate limits may impact performance during peak hours.</span>
            <br><strong style="color: #991b1b;">Mitigation:</strong>
            <span style="color: #64748b;"> Implementing caching layer - ETA Friday.</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #f8fafc; padding: 20px 32px; border-radius: 0 0 8px 8px; border-top: 1px solid #e2e8f0;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0; text-align: center;">Next update: [Date] | Reply with questions</p>
    </td>
  </tr>
</table>`,
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'Multi-section newsletter with header image area and article cards',
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
  <tr>
    <td style="background-color: #1e293b; padding: 20px 32px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 1px;">THE NEWSLETTER</h1>
      <p style="color: #94a3b8; margin: 4px 0 0; font-size: 12px;">Issue #01 | [Month Year]</p>
    </td>
  </tr>
  <tr>
    <td style="background-color: #6366f1; padding: 48px 32px; text-align: center;">
      <h2 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; line-height: 1.3;">Featured Story Headline Goes Here</h2>
      <p style="color: #e0e7ff; margin: 12px 0 24px; font-size: 15px; line-height: 1.5;">A brief teaser that draws the reader in and makes them want to learn more about this topic.</p>
      <a href="#" style="display: inline-block; background-color: #ffffff; color: #4f46e5; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px;">Read More</a>
    </td>
  </tr>
  <tr>
    <td style="background-color: #ffffff; padding: 32px;">
      <h3 style="color: #1e293b; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 20px; color: #64748b;">Latest Articles</h3>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
        <tr>
          <td style="padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #6366f1;">
            <h4 style="color: #1e293b; font-size: 16px; margin: 0 0 6px; font-weight: 600;">Article Title One</h4>
            <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">Brief summary of the article content that gives readers enough context to decide if they want to read more.</p>
          </td>
        </tr>
      </table>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
        <tr>
          <td style="padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #059669;">
            <h4 style="color: #1e293b; font-size: 16px; margin: 0 0 6px; font-weight: 600;">Article Title Two</h4>
            <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">Another article summary with enough detail to be informative and engaging for the reader.</p>
          </td>
        </tr>
      </table>

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 0;">
        <tr>
          <td style="padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #d97706;">
            <h4 style="color: #1e293b; font-size: 16px; margin: 0 0 6px; font-weight: 600;">Article Title Three</h4>
            <p style="color: #64748b; font-size: 13px; line-height: 1.5; margin: 0;">A third piece of content with a brief but compelling description of what the reader will find.</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="background-color: #1e293b; padding: 24px 32px; text-align: center; border-radius: 0 0 8px 8px;">
      <p style="color: #94a3b8; font-size: 12px; margin: 0;">You're receiving this because you subscribed to our newsletter.</p>
      <p style="color: #64748b; font-size: 11px; margin: 8px 0 0;"><a href="#" style="color: #818cf8;">Unsubscribe</a> | <a href="#" style="color: #818cf8;">View in browser</a></p>
    </td>
  </tr>
</table>`,
  },
  {
    id: 'blank',
    name: 'Blank',
    description: 'Empty email-safe wrapper - start from scratch with proper structure',
    html: `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" align="center" style="max-width: 600px; margin: 0 auto; font-family: Arial, Helvetica, sans-serif;">
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
