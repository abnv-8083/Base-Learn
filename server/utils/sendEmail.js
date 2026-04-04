const axios = require('axios');

const sendEmail = async (options) => {
    try {
        // Because Render blocks standard SMTP ports, we forward the email payload
        // directly to your Vercel frontend, which runs the Nodemailer/Gmail SMTP
        // logic via its Serverless Functions (which do NOT block SMTP).
        
        const vercelEmailUrl = (process.env.CLIENT_URL || 'https://base-learn-five.vercel.app') + '/api/email';

        const response = await axios.post(vercelEmailUrl, {
            email: options.email,
            subject: options.subject,
            html: options.html,
            message: options.message,
            adminSecret: 'baselearn_internal_secret' // Secures the endpoint
        });

        console.log(`Email successfully routed via Vercel Proxy: ${response.data.messageId}`);
        return response.data;
    } catch (error) {
        console.error('Email Proxy Error:', error.response?.data || error.message);
        throw error;
    }
};

module.exports = sendEmail;
