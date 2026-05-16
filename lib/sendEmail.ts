import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function sendResetEmail(
  email: string,
  resetLink: string
) {
  try {
    console.log("Sending reset email to:", email);
    await resend.emails.send({
      from:
        "HaigoraAI <onboarding@resend.dev>",

      to: email,

      subject:
        "Reset Your HaigoraAI Password",

      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Password Reset</h2>

          <p>
            Click the button below to reset your password.
          </p>

          <a
            href="${resetLink}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#2563eb;
              color:white;
              text-decoration:none;
              border-radius:8px;
              margin-top:10px;
            "
          >
            Reset Password
          </a>

          <p style="margin-top:20px;">
            If you did not request this,
            ignore this email.
          </p>
        </div>
      `,
    });

    console.log(
      "Reset email sent successfully"
    );
  } catch (error) {
    console.error(
      "Email send error:",
      error
    );
  }
}