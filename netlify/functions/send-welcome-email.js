// Netlify Function pour envoyer un email de bienvenue
// À placer dans : netlify/functions/send-welcome-email.js

const fetch = require('node-fetch');

exports.handler = async (event) => {
  // Vérifier que c'est une requête POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email, firstName, lastName } = JSON.parse(event.body);

    // Validation
    if (!email || !firstName || !lastName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Envoyer l'email via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'EA 1996 Retrouvailles <onboarding@resend.dev>',
        to: email,
        subject: 'EA 1996 - Tes coordonnées ont été ajoutées ! 🎓',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #4F46E5;">Bonjour ${firstName} !</h1>
            
            <p>Tes coordonnées ont été ajoutées à l'annuaire des retrouvailles <strong>EA 1996 - 30 ans du Bac</strong> 🎉</p>
            
            <p>Nous organisons une grande soirée de retrouvailles pour célébrer nos 30 ans (juin ou septembre 2026).</p>
            
            <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">📅 Planning :</h3>
              <ul>
                <li><strong>MAINTENANT</strong> → Rejoins le groupe WhatsApp et complète tes coordonnées</li>
                <li><strong>Mars/Avril</strong> → Sondage pour choisir la date</li>
                <li><strong>Juin ou Sept 2026</strong> → La soirée !</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://ea1996.fr" 
                 style="background: #4F46E5; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                👉 Accéder au site EA 1996
              </a>
            </div>
            
            <h3>Sur le site, tu peux :</h3>
            <ul>
              <li>✅ Rejoindre le groupe WhatsApp de la promo</li>
              <li>✅ Mettre à jour tes coordonnées</li>
              <li>✅ Aider à retrouver d'autres camarades</li>
              <li>✅ Envoyer des petits cœurs "J'ai hâte de te revoir" 💜</li>
            </ul>
            
            <p>Plus nous serons nombreux, plus ce sera mémorable !</p>
            
            <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
              À très bientôt,<br>
              L'équipe d'organisation EA 1996
            </p>
            
            <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
            
            <p style="color: #9CA3AF; font-size: 12px;">
              <strong>Protection des données :</strong> Tes coordonnées sont utilisées uniquement pour l'organisation des retrouvailles EA 1996. 
              Tu peux demander leur modification ou suppression à tout moment en contactant : 
              <a href="mailto:orga@ea1996.fr" style="color: #4F46E5;">orga@ea1996.fr</a>
            </p>
          </div>
        `
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, id: data.id })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
