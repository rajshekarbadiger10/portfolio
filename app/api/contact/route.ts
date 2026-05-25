import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

type ContactErrors = Partial<Record<'name' | 'email' | 'message', string>>;

function validatePayload(payload: ContactPayload) {
  const errors: ContactErrors = {};

  if (!payload.name?.trim()) {
    errors.name = 'Name is required.';
  }

  if (!payload.email?.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!payload.message?.trim()) {
    errors.message = 'Message is required.';
  }

  return errors;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const errors = validatePayload(body);

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ message: 'Validation failed.', errors }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT ?? '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL ?? 'rajshekarbadiger11@gmail.com';

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          message: 'Mail service is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS in .env.local.'
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: process.env.SMTP_SECURE === 'true' || smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const submittedAtIso = new Date().toISOString();
    const submittedAtDisplay = new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata'
    }).format(new Date());

    const safeName = escapeHtml(body.name?.trim() ?? '');
    const safeEmail = escapeHtml(body.email?.trim() ?? '');
    const safeMessage = escapeHtml(body.message?.trim() ?? '');

    await transporter.sendMail({
      from: `Portfolio Contact <${smtpUser}>`,
      to: receiver,
      replyTo: body.email?.trim(),
      subject: `Portfolio inquiry from ${body.name?.trim()}`,
      text: [
        'New portfolio message received',
        '',
        `Name: ${body.name?.trim()}`,
        `Email: ${body.email?.trim()}`,
        `Submitted at: ${submittedAtDisplay}`,
        `Timestamp (ISO): ${submittedAtIso}`,
        '',
        'Message:',
        body.message?.trim() ?? ''
      ].join('\n'),
      html: `
        <div style="font-family: Inter, Arial, sans-serif; background:#09090b; color:#f8fafc; padding:32px; border-radius:24px; border:1px solid rgba(255,255,255,0.08);">
          <div style="font-size:12px; letter-spacing:0.3em; text-transform:uppercase; color:#fb7185; margin-bottom:12px;">Portfolio Contact</div>
          <h2 style="margin:0 0 20px; font-size:24px; line-height:1.1;">New message from ${safeName}</h2>
          <div style="display:grid; gap:12px; margin-bottom:24px;">
            <div style="padding:14px 16px; border-radius:16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);"><strong style="color:#fff;">Name:</strong> ${safeName}</div>
            <div style="padding:14px 16px; border-radius:16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);"><strong style="color:#fff;">Email:</strong> ${safeEmail}</div>
            <div style="padding:14px 16px; border-radius:16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);"><strong style="color:#fff;">Submitted at:</strong> ${submittedAtDisplay}</div>
            <div style="padding:14px 16px; border-radius:16px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);"><strong style="color:#fff;">Timestamp (ISO):</strong> ${submittedAtIso}</div>
          </div>
          <div style="padding:18px 20px; border-radius:18px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.08); white-space:pre-wrap; line-height:1.75; color:#e2e8f0;">${safeMessage}</div>
        </div>
      `
    });

    return NextResponse.json({ message: 'Message sent successfully.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
    return NextResponse.json({ message }, { status: 500 });
  }
}