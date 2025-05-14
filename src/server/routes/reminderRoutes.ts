import { Router } from "express";
import { reminderController } from "../controllers/reminderController";

const router = Router();

// Create a new reminder
router.post("/", reminderController.createReminder);

// Get all reminders for a user
router.get("/", reminderController.getUserReminders);

// Cancel a reminder
router.delete("/:reminderId", reminderController.cancelReminder);

// Update reminder status
router.patch("/:reminderId", reminderController.updateReminderStatus);

export default router;
