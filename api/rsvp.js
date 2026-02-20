export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GOOGLE_SHEETS_API = process.env.GOOGLE_SHEETS_API;

  if (!GOOGLE_SHEETS_API) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    await fetch(GOOGLE_SHEETS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to submit RSVP' });
  }
}
