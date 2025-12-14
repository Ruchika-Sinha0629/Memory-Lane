import { transporter } from "./mail";

interface UnlockEmailPayload {
  creatorEmail: string;
  collaborators: string[];
  recipients: string[];
  title: string;
  capsuleId: string;
}

export async function sendUnlockEmails({
  creatorEmail,
  collaborators,
  recipients,
  title,
  capsuleId,
}: UnlockEmailPayload) {
  const emails = [creatorEmail, ...collaborators, ...recipients].filter(Boolean);
  const link = `${process.env.NEXT_PUBLIC_APP_URL}/capsule/${capsuleId}`;

  await transporter.sendMail({
    from: `"MemoryLane" <${process.env.SMTP_USER}>`,
    to: emails, 
    subject: `Your capsule "${title}" is unlocked 🎉`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%); padding: 30px; border-radius: 24px; text-align: center;">
          <h2 style="color: white; margin: 0 0 20px 0; font-size: 24px;">🎉 Your Memory Has Unlocked!</h2>
          <div style="background: rgba(255, 255, 255, 0.95); padding: 20px; border-radius: 16px; margin-bottom: 20px;">
            <p style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">Your memory capsule</p>
            <p style="color: #6366f1; margin: 0; font-size: 20px; font-weight: bold;">${title}</p>
          </div>
          <a href="${link}" style="display: inline-block; background: white; color: #6366f1; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">View Capsule</a>
        </div>
      </div>
    `,
  });
}