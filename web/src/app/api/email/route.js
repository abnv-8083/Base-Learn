import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, subject, html, message, adminSecret } = body;

        // Basic security to ensure only your backend can trigger this
        if (adminSecret !== process.env.VITE_ADMIN_SECRET && adminSecret !== 'baselearn_internal_secret') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: (process.env.SMTP_PASS || '').replace(/\s/g, '')
            },
            tls: { rejectUnauthorized: false }
        });

        const mailOptions = {
            from: `${process.env.FROM_NAME || 'Base Learn Education'} <${process.env.SMTP_USER}>`,
            to: email,
            subject: subject,
            text: message || '',
            html: html
        };

        const info = await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true, messageId: info.messageId });
    } catch (error) {
        console.error('Vercel Nodemailer Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
