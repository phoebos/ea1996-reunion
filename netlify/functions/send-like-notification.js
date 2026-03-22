// Netlify Function pour envoyer une notification de like anonyme
const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email, firstName, likesCount } = JSON.parse(event.body);

    if (!email || !firstName || likesCount === undefined) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'EA 1996 Retrouvailles <onboarding@resend.dev>',
        to: email,
        subject: 'EA 1996 - Quelqu\'un a hâte de te revoir ! 💜',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #9333ea, #7c3aed); border-radius: 12px; margin-bottom: 30px;">
              <div style="font-size: 64px; margin-bottom: 20px;">💜</div>
              <h1 style="color: white; margin: 0 0 10px 0;">Bonjour ${firstName} !</h1>
              <p style="color: white; font-size: 20px; margin: 0;">Quelqu'un a hâte de te

cd ~/Desktop/ea1996-reunion

cat > netlify/functions/send-like-notification.js << 'EOF'
# (tout le code que je t'ai donné)
cd ~/Desktop/ea1996-reunion

cat > netlify/functions/send-like-notification.js << 'EOF'
// Netlify Function pour envoyer une notification de like anonyme
const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { email, firstName, likesCount } = JSON.parse(event.body);

    if (!email || !firstName || likesCount === undefined) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'EA 1996 Retrouvailles <onboarding@resend.dev>',
        to: email,
        subject: 'EA 1996 - Quelqu\'un a hâte de te revoir ! 💜',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #9333ea, #7c3aed); border-radius: 12px; margin-bottom: 30px;">
              <div style="font-size: 64px; margin-bottom: 20px;">💜</div>
              <h1 style="color: white; margin: 0 0 10px 0;">Bonjour ${firstName} !</h1>
              <p style="color: white; font-size: 20px; margin: 0;">Quelqu'un a hâte de te revoir !</p>
            </div>
            
            <div style="padding: 0 20px;">
              <p style="font-size: 16px; color: #374151; line-height: 1.6;">
                Un ancien camarade de la promo <strong>EA 1996</strong> vient de t'envoyer un petit cœur pour te dire qu'il a hâte de te revoir lors de la soirée des 30 ans du Bac ! 🎉
              </p>
              
              <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <p style="margin: 0; color: #6B7280; font-size: 14px; text-align: center;">
                  <strong style="color: #9333ea; font-size: 32px; display: block; margin-bottom: 10px;">${likesCount}</strong>
                  personne${likesCount > 1 ? 's ont' : ' a'} hâte de te revoir !
                </p>
              </div>
              
              <p style="font-size: 14px; color: #6B7280; line-height: 1.6;">
                💡 <strong>Pour découvrir qui d'autre a hâte de te revoir</strong> (sans savoir qui exactement, on garde le mystère !), connecte-toi sur le site et envoie toi aussi des petits cœurs à tes anciens camarades.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://ea1996.fr" 
                   style="background: #9333ea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                  👉 Voir sur le site EA 1996
                </a>
              </div>
              
              <div style="background: linear-gradient(135deg, #25D366, #128C7E); padding: 20px; border-radius: 12px; margin: 30px 0; text-align: center;">
                <p style="color: white; margin: 0 0 15px 0; font-size: 16px;">
                  <strong>Pas encore dans le groupe WhatsApp ?</strong>
                </p>
                <a href="https://chat.whatsapp.com/Fxlg8G6gA5gEOtLAA6c8ah" 
                   style="background: white; color: #25D366; padding: 12px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                  📱 Rejoindre le groupe
                </a>
              </div>
              
              <p style="color: #6B7280; font-size: 14px; margin-top: 30px;">
                À très bientôt,<br>
                L'équipe d'organisation EA 1996
              </p>
              
              <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 30px 0;">
              
              <p style="color: #9CA3AF; font-size: 12px;">
                <strong>Protection des données :</strong> Tes coordonnées sont utilisées uniquement pour l'organisation des retrouvailles EA 1996. 
                Tu peux demander leur modification ou suppression à tout moment en contactant : 
                <a href="mailto:orga@ea1996.fr" style="color: #9333ea;">orga@ea1996.fr</a>
              </p>
            </div>
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
    console.error('Error sending like notification:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
