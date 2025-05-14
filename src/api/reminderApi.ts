import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api";

export interface ReminderRequest {
  pitchId: number;
  pitchTitle: string;
  reminderDate: Date;
  userEmail: string;
}

export interface ReminderResponse {
  id: string;
  pitchId: number;
  pitchTitle: string;
  reminderDate: Date;
  userEmail: string;
  status: "pending" | "sent" | "cancelled";
}

export const reminderApi = {
  // Create a new reminder
  createReminder: async (data: ReminderRequest): Promise<ReminderResponse> => {
    const response = await axios.post(`${API_BASE_URL}/reminders`, data);
    return response.data;
  },

  // Get all reminders for a user
  getUserReminders: async (): Promise<ReminderResponse[]> => {
    const response = await axios.get(`${API_BASE_URL}/reminders`);
    return response.data;
  },

  // Cancel a reminder
  cancelReminder: async (reminderId: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/reminders/${reminderId}`);
  },

  // Update reminder status
  updateReminderStatus: async (
    reminderId: string,
    status: "pending" | "sent" | "cancelled"
  ): Promise<ReminderResponse> => {
    const response = await axios.patch(
      `${API_BASE_URL}/reminders/${reminderId}`,
      {
        status,
      }
    );
    return response.data;
  },
};
