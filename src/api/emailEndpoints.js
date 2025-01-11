import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);

const sendEmailTemplate = async (req, res) => {
  try {
    const { template, emailData, recipient } = req.body;

    // Import the template dynamically
    const EmailTemplate = require(`../components/email-templates/${template}Email`).default;
    
    const msg = {
      to: recipient,
      from: {
        email: process.env.REACT_APP_SENDGRID_FROM_EMAIL,
        name: process.env.REACT_APP_SENDER_NAME,
      },
      subject: getEmailSubject(template),
      html: EmailTemplate(emailData),
      replyTo: process.env.REACT_APP_REPLY_TO,
    };

    await sgMail.send(msg);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};

const getEmailSubject = (template) => {
  const subjects = {
    welcome: 'Welcome to SilverBulls Trading!',
    subscription: 'Subscription Confirmation - SilverBulls Trading',
    'payment-confirmation': 'Payment Confirmation - SilverBulls Trading',
    'forgot-password': 'Password Reset Request - SilverBulls Trading',
    'renew-subscription': 'Subscription Renewal Notice - SilverBulls Trading',
  };
  return subjects[template] || 'SilverBulls Trading Notification';
};

export { sendEmailTemplate };
