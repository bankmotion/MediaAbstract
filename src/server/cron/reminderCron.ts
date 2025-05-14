import cron from "node-cron";
import { checkDueReminders } from "../../services/reminderService";

// Run every hour
cron.schedule("0 * * * *", async () => {
  try {
    console.log("Checking for due reminders...");
    await checkDueReminders();
  } catch (error) {
    console.error("Error in reminder cron job:", error);
  }
});
