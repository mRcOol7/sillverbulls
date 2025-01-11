import axios from 'axios';

const API_URL = 'http://localhost:5000';

const sendEmail = async (templateName, emailData, recipient) => {
  try {
    const response = await axios.post(`${API_URL}/api/send-email`, {
      template: templateName.toLowerCase(),
      emailData,
      recipient,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const emailTemplates = {
  WELCOME: 'welcome',
  SUBSCRIPTION: 'subscription',
  PAYMENT_CONFIRMATION: 'payment-confirmation',
  FORGOT_PASSWORD: 'forgot-password',
  RENEW_SUBSCRIPTION: 'renew-subscription'
};

export default sendEmail;
