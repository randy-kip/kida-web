/* =========================================================================
   Vercel Serverless Function: /api/save-application
   Forwards the careers application form (careers/creative-strategist) to the
   Airtable automation webhook that creates a row in the "Job Applications"
   table. Server-side proxy so the browser doesn't hit Airtable CORS.

   To point at a different Airtable automation, set APPLICATION_WEBHOOK_URL
   in Vercel → Project → Settings → Environment Variables.
   ========================================================================= */

const DEFAULT_WEBHOOK =
  'https://hooks.airtable.com/workflows/v1/genericWebhook/appRBOiUXED6LbxnG/wflS69lcxccsVqDZh/wtrJlBALGrCcS8ZuG';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  let payload = req.body;
  if (typeof payload === 'string') {
    try { payload = JSON.parse(payload || '{}'); } catch (e) { res.status(400).json({ error: 'Invalid request' }); return; }
  }
  payload = payload || {};

  const webhook = process.env.APPLICATION_WEBHOOK_URL || DEFAULT_WEBHOOK;

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json().catch(() => ({}));
    res.status(200).json(result);
  } catch (err) {
    console.error('[save-application] forward failed:', err);
    res.status(500).json({ error: err.message });
  }
}
