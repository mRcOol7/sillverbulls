import React, { useState } from 'react';
import sendEmail, { emailTemplates } from '../utils/emailService';

const EmailTestDashboard = () => {
  const [recipient, setRecipient] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [status, setStatus] = useState('');

  const handleSendEmail = async (template) => {
    try {
      setStatus('Sending...');
      const testData = {
        [emailTemplates.WELCOME]: {},
        [emailTemplates.SUBSCRIPTION]: { plan: 'Premium', amount: '$99.99' },
        [emailTemplates.PAYMENT_CONFIRMATION]: {
          transactionId: 'TXN123456',
          amount: '$99.99',
          date: new Date().toLocaleDateString(),
        },
        [emailTemplates.FORGOT_PASSWORD]: { resetToken: 'test-reset-token' },
        [emailTemplates.RENEW_SUBSCRIPTION]: { expiryDate: new Date().toLocaleDateString() },
      };

      await sendEmail(template, testData[template], recipient);
      setStatus('Email sent successfully!');
    } catch (error) {
      setStatus('Error sending email: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Email Template Testing Dashboard</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Recipient Email:</label>
        <input
          type="email"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter recipient email"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mt-6">
        {Object.entries(emailTemplates).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleSendEmail(value)}
            className="bg-blue-600 text-white p-4 rounded hover:bg-blue-700 transition-colors"
          >
            Send {key.replace(/_/g, ' ')} Email
          </button>
        ))}
      </div>

      {status && (
        <div className={`mt-4 p-4 rounded ${
          status.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {status}
        </div>
      )}
    </div>
  );
};

export default EmailTestDashboard;
