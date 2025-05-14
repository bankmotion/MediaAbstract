import { Request, Response } from "express";
import {
  createReminder,
  sendReminderEmail,
  cancelReminder,
} from "../../services/reminderService";

// In-memory storage for reminders (replace with database in production)
const reminders: any[] = [];

export const reminderController = {
  // Create a new reminder
  createReminder: async (req: Request, res: Response) => {
    try {
      const { pitchId, pitchTitle, reminderDate, userEmail } = req.body;

      // Validate required fields
      if (!pitchId || !pitchTitle || !reminderDate || !userEmail) {
        return res.status(400).json({
          error: "Missing required fields",
        });
      }

      // Create reminder
      const reminder = await createReminder(
        pitchId,
        pitchTitle,
        new Date(reminderDate),
        userEmail
      );

      // Store reminder
      reminders.push(reminder);

      res.status(201).json(reminder);
    } catch (error) {
      console.error("Error creating reminder:", error);
      res.status(500).json({
        error: "Failed to create reminder",
      });
    }
  },

  // Get all reminders for a user
  getUserReminders: async (req: Request, res: Response) => {
    try {
      const { userEmail } = req.query;

      if (!userEmail) {
        return res.status(400).json({
          error: "User email is required",
        });
      }

      const userReminders = reminders.filter(
        (reminder) => reminder.userEmail === userEmail
      );

      res.json(userReminders);
    } catch (error) {
      console.error("Error getting user reminders:", error);
      res.status(500).json({
        error: "Failed to get user reminders",
      });
    }
  },

  // Cancel a reminder
  cancelReminder: async (req: Request, res: Response) => {
    try {
      const { reminderId } = req.params;

      const reminderIndex = reminders.findIndex(
        (reminder) => reminder.id === reminderId
      );

      if (reminderIndex === -1) {
        return res.status(404).json({
          error: "Reminder not found",
        });
      }

      await cancelReminder(reminderId);
      reminders.splice(reminderIndex, 1);

      res.status(200).json({
        message: "Reminder cancelled successfully",
      });
    } catch (error) {
      console.error("Error cancelling reminder:", error);
      res.status(500).json({
        error: "Failed to cancel reminder",
      });
    }
  },

  // Update reminder status
  updateReminderStatus: async (req: Request, res: Response) => {
    try {
      const { reminderId } = req.params;
      const { status } = req.body;

      const reminder = reminders.find((r) => r.id === reminderId);

      if (!reminder) {
        return res.status(404).json({
          error: "Reminder not found",
        });
      }

      reminder.status = status;

      res.json(reminder);
    } catch (error) {
      console.error("Error updating reminder status:", error);
      res.status(500).json({
        error: "Failed to update reminder status",
      });
    }
  },
};
