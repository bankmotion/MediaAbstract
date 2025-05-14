import nodemailer from "nodemailer";
import { format } from "date-fns";

interface Reminder {
  id: string;
  pitchId: number;
  pitchTitle: string;
  reminderDate: Date;
  userEmail: string;
  status: "pending" | "sent" | "cancelled";
}

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Email template for reminders
const createReminderEmailTemplate = (
  pitchTitle: string,
  reminderDate: Date
) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1976d2;">Follow-up Reminder</h2>
      <p>This is a reminder to follow up on your pitch:</p>
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">${pitchTitle}</h3>
        <p><strong>Reminder Date:</strong> ${format(
          reminderDate,
          "MMMM dd, yyyy"
        )}</p>
      </div>
      <p>Don't forget to:</p>
      <ul>
        <li>Check the status of your pitch</li>
        <li>Send a follow-up email if needed</li>
        <li>Update the pitch status in your dashboard</li>
      </ul>
      <p>Best regards,<br>WriteFor.co Team</p>
    </div>
  `;
};

// Create a new reminder
export const createReminder = async (
  pitchId: number,
  pitchTitle: string,
  reminderDate: Date,
  userEmail: string
): Promise<Reminder> => {
  const reminder: Reminder = {
    id: Math.random().toString(36).substr(2, 9),
    pitchId,
    pitchTitle,
    reminderDate,
    userEmail,
    status: "pending",
  };

  // Store reminder in database (implement your database logic here)
  // For now, we'll just return the reminder object
  return reminder;
};

// Send reminder email
export const sendReminderEmail = async (reminder: Reminder): Promise<void> => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: reminder.userEmail,
      subject: `Follow-up Reminder: ${reminder.pitchTitle}`,
      html: createReminderEmailTemplate(
        reminder.pitchTitle,
        reminder.reminderDate
      ),
    };

    await transporter.sendMail(mailOptions);

    // Update reminder status to 'sent'
    // Implement your database update logic here
  } catch (error) {
    console.error("Error sending reminder email:", error);
    throw error;
  }
};

// Check for due reminders
export const checkDueReminders = async (): Promise<void> => {
  const now = new Date();

  // Get all pending reminders from database
  // For each reminder that's due, send an email
  // This function should be called by a cron job or scheduler
};

// Cancel a reminder
export const cancelReminder = async (reminderId: string): Promise<void> => {
  // Update reminder status to 'cancelled' in database
  // Implement your database update logic here
};
