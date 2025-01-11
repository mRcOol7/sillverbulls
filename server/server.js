const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Set SendGrid API Key
sgMail.setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);

// Common styles
const commonStyles = `
  /* Base styles */
  body { font-family: 'Arial', sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4; }
  .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
  .header { text-align: center; margin-bottom: 30px; }
  .logo { max-width: 150px; height: auto; margin-bottom: 20px; }
  h1 { color: #2c3e50; font-size: 28px; margin-bottom: 20px; text-align: center; }
  p { color: #555; font-size: 16px; margin-bottom: 15px; }
  
  /* Button styles */
  .button { display: inline-block; padding: 12px 30px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; text-align: center; transition: background-color 0.3s; }
  .button:hover { background-color: #45a049; }
  
  /* Info box styles */
  .info-box { background-color: #f8f9fa; border-left: 4px solid #4CAF50; padding: 20px; margin: 20px 0; border-radius: 4px; }
  .info-box h3 { color: #2c3e50; margin-top: 0; }
  
  /* Footer styles */
  .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 14px; }
  .social-links { margin-top: 15px; }
  .social-links a { margin: 0 10px; color: #666; text-decoration: none; }
`;

// Email Templates
const getEmailTemplate = (template, data) => {
  console.log('Template requested:', template);
  
  const companyInfo = `
    <div class="footer">
      <p>${process.env.REACT_APP_COMPANY_NAME}</p>
      <p>${process.env.REACT_APP_COMPANY_ADDRESS_LINE1}, ${process.env.REACT_APP_COMPANY_ADDRESS_LINE2}</p>
      <p>${process.env.REACT_APP_COMPANY_CITY}, ${process.env.REACT_APP_COMPANY_STATE} ${process.env.REACT_APP_COMPANY_ZIP}</p>
      <p>${process.env.REACT_APP_COMPANY_PHONE}</p>
      <div class="social-links">
        <a href="#">Twitter</a> | <a href="#">LinkedIn</a> | <a href="#">Facebook</a>
      </div>
    </div>
  `;

  switch (template) {
    case 'welcome':
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Welcome to SilverBulls Trading</title>
            <style>${commonStyles}</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="${process.env.REACT_APP_FRONTEND_URL}/logo.png" alt="SilverBulls Logo" class="logo">
                <h1>Welcome to SilverBulls Trading!</h1>
              </div>
              <p>Dear Valued Trader,</p>
              <p>Welcome to SilverBulls Trading! We're thrilled to have you join our community of successful traders.</p>
              
              <div class="info-box">
                <h3>Your Account Benefits:</h3>
                <ul>
                  <li>Access to advanced trading algorithms</li>
                  <li>Real-time market analysis</li>
                  <li>Professional trading tools</li>
                  <li>24/7 expert support</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.REACT_APP_FRONTEND_URL}/home" class="button">
                  Get Started Trading
                </a>
              </div>

              <p>Need help getting started? Our support team is here to assist you every step of the way.</p>
              
              ${companyInfo}
            </div>
          </body>
        </html>
      `;

    case 'subscription':
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Subscription Confirmation</title>
            <style>${commonStyles}</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="${process.env.REACT_APP_FRONTEND_URL}/logo.png" alt="SilverBulls Logo" class="logo">
                <h1>Subscription Confirmed!</h1>
              </div>
              
              <p>Thank you for choosing SilverBulls Trading ${data.plan || 'Premium'} plan!</p>
              
              <div class="info-box">
                <h3>Subscription Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0;">Plan Type:</td>
                    <td style="padding: 10px 0;"><strong>${data.plan || 'Premium'}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">Amount:</td>
                    <td style="padding: 10px 0;"><strong>${data.amount || '$99.99'}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">Status:</td>
                    <td style="padding: 10px 0;"><span style="color: #4CAF50;"><strong>Active</strong></span></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">Start Date:</td>
                    <td style="padding: 10px 0;"><strong>${new Date().toLocaleDateString()}</strong></td>
                  </tr>
                </table>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.REACT_APP_FRONTEND_URL}/home" class="button">
                  View Dashboard
                </a>
              </div>
              
              ${companyInfo}
            </div>
          </body>
        </html>
      `;

    case 'payment-confirmation':
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Payment Confirmation</title>
            <style>${commonStyles}</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="${process.env.REACT_APP_FRONTEND_URL}/logo.png" alt="SilverBulls Logo" class="logo">
                <h1>Payment Confirmation</h1>
              </div>
              
              <p>Your payment has been successfully processed. Thank you for your trust in SilverBulls Trading.</p>
              
              <div class="info-box">
                <h3>Transaction Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0;">Transaction ID:</td>
                    <td style="padding: 10px 0;"><strong>${data.transactionId || 'TXN123456'}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">Amount:</td>
                    <td style="padding: 10px 0;"><strong>${data.amount || '$99.99'}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">Date:</td>
                    <td style="padding: 10px 0;"><strong>${data.date || new Date().toLocaleDateString()}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">Status:</td>
                    <td style="padding: 10px 0;"><span style="color: #4CAF50;"><strong>Completed</strong></span></td>
                  </tr>
                </table>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.REACT_APP_FRONTEND_URL}/home" class="button">
                  View Transaction History
                </a>
              </div>
              
              ${companyInfo}
            </div>
          </body>
        </html>
      `;

    case 'forgot-password':
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Password Reset Request</title>
            <style>${commonStyles}</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="${process.env.REACT_APP_FRONTEND_URL}/logo.png" alt="SilverBulls Logo" class="logo">
                <h1>Password Reset Request</h1>
              </div>
              
              <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
              
              <div class="info-box">
                <h3>Security Notice:</h3>
                <p>This password reset link will expire in 1 hour for your security.</p>
                <p>If you didn't request this reset, please contact our support team immediately.</p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.REACT_APP_FRONTEND_URL}/reset-password/${data.resetToken || 'token'}" class="button">
                  Reset Password
                </a>
              </div>
              
              ${companyInfo}
            </div>
          </body>
        </html>
      `;

    case 'renew-subscription':
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Subscription Renewal Notice</title>
            <style>${commonStyles}</style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="${process.env.REACT_APP_FRONTEND_URL}/logo.png" alt="SilverBulls Logo" class="logo">
                <h1>Subscription Renewal Notice</h1>
              </div>
              
              <p>Your subscription is approaching its renewal date. To ensure uninterrupted access to our premium trading services, please renew your subscription.</p>
              
              <div class="info-box">
                <h3>Subscription Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0;">Current Plan:</td>
                    <td style="padding: 10px 0;"><strong>${data.plan || 'Premium'}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">Expiry Date:</td>
                    <td style="padding: 10px 0;"><strong>${data.expiryDate || new Date().toLocaleDateString()}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0;">Status:</td>
                    <td style="padding: 10px 0;"><span style="color: #ff9800;"><strong>Pending Renewal</strong></span></td>
                  </tr>
                </table>
              </div>

              <div class="info-box" style="border-left-color: #ff9800;">
                <h3>Why Renew?</h3>
                <ul>
                  <li>Continue access to premium trading features</li>
                  <li>Maintain your trading strategies</li>
                  <li>Keep your historical data and analytics</li>
                  <li>Priority support access</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.REACT_APP_FRONTEND_URL}/home" class="button" style="background-color: #ff9800;">
                  Renew Now
                </a>
              </div>
              
              ${companyInfo}
            </div>
          </body>
        </html>
      `;

    default:
      console.error('Invalid template requested:', template);
      throw new Error('Invalid template type');
  }
};

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { template, emailData, recipient } = req.body;
    console.log('Received request:', { template, emailData, recipient });

    if (!recipient || !template) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const subjects = {
      'welcome': 'Welcome to SilverBulls Trading!',
      'subscription': 'Subscription Confirmation - SilverBulls Trading',
      'payment-confirmation': 'Payment Confirmation - SilverBulls Trading',
      'forgot-password': 'Password Reset Request - SilverBulls Trading',
      'renew-subscription': 'Subscription Renewal Notice - SilverBulls Trading',
    };

    const msg = {
      to: recipient,
      from: {
        email: process.env.REACT_APP_SENDGRID_FROM_EMAIL,
        name: process.env.REACT_APP_SENDER_NAME,
      },
      subject: subjects[template] || 'SilverBulls Trading Notification',
      html: getEmailTemplate(template, emailData),
      replyTo: process.env.REACT_APP_REPLY_TO,
    };

    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message,
      stack: error.stack 
    });
  }
});

// Test endpoint for Vercel
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Backend is successfully running on Vercel!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/', (req, res) => {
  res.json({
    status: 'active',
    message: 'Welcome to SilverBulls API',
    documentation: '/api/test - Test endpoint',
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Environment variables loaded:', {
    fromEmail: process.env.REACT_APP_SENDGRID_FROM_EMAIL,
    senderName: process.env.REACT_APP_SENDER_NAME,
    frontendUrl: process.env.REACT_APP_FRONTEND_URL
  });
});
