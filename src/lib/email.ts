import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface UnlockEmailPayload {
  creatorEmail: string;
  recipients: string[];
  title: string;
  capsuleId: string;
}

export async function sendUnlockEmails({
  creatorEmail,
  recipients,
  title,
  capsuleId,
}: UnlockEmailPayload) {
  const emails = [creatorEmail, ...recipients].filter(Boolean);

  const link = `${process.env.NEXT_PUBLIC_APP_URL}/capsule/${capsuleId}`;

  for (const email of emails) {
    await resend.emails.send({
      from: "MemoryLane <no-reply@memorylane.app>",
      to: email,
      subject: `Your capsule "${title}" is unlocked 🎉`,
      html: `
        <p>Your memory capsule <strong>${title}</strong> has unlocked.</p>
        <p><a href="${link}">View Capsule</a></p>
      `,
    });
  }
}
