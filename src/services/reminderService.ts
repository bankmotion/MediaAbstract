import axios from "axios";

const API_URL = "https://backend.writefor.co";
interface ReminderData {
  user_id: string;
  pitch_id: number;
  reminder_date: string;
  email: string;
  status: string;
}

export const createReminder = async (reminderData: ReminderData) => {
  try {
    const response = await axios.post(
      `${API_URL}/create_reminder`,
      reminderData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating reminder:", error);
    throw error;
  }
};

export const fetchReminders = async () => {
  try {
    const response = await axios.get(`${API_URL}/get_reminders`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching reminders:", error);
    throw error;
  }
};

export const updateReminderStatus = async (
  reminderId: string,
  status: string
) => {
  try {
    const response = await axios.put(`${API_URL}/update_reminder_status`, {
      reminderId,
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating reminder status:", error);
    throw error;
  }
};
