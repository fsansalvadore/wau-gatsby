import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const resend = new Resend(process.env.GATSBY_RESEND_API_KEY);

    const { email, lang, html } = req.body;

    const italiano = lang === 'it';

    const payload = {
      from: 'info@wauarchitetti.com',
      to: email,
      subject: italiano
        ? 'Messaggio ricevuto con successo'
        : 'Message received successfully',
      html,
    };

    const response = await resend.emails.send(payload);

    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.log('send-email-error', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
