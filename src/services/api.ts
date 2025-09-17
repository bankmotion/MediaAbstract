import axios from "axios";

// Use environment variable with fallback
// const API_URL = "https://backend.writefor.co";
// const API_URL = "http://146.190.131.130:10000";
const API_URL = "http://127.0.0.1:10000";


export const submitPitch = async (
  abstract: string,
  industry: string,
  userId: string,
  planType?: string
) => {
  try {
    const response = await axios.post(`${API_URL}/submit_pitch`, {
      abstract,
      industry,
      userId,
      planType,
    });

    console.log("Pitch submitted successfully:", response.data);

    return response.data.matched_outlets || [];
  } catch (error) {
    console.error("Error in submitPitch", error);
    if (axios.isAxiosError(error)) {
      console.error("Error submitting pitch:", error.response?.data);
      throw new Error(
        `Submission failed: ${error.response?.data || error.message}`
      );
    }
    return { error: "Failed to submit pitch" };
  }
};

export const updatePitchSubmissionStatus = async (
  pitchId: string,
  outletName: string,
  userId: string
) => {
  try {
    const response = await axios.put(`${API_URL}/update_pitch_status`, {
      pitchId,
      outletName,
      userId,
      status: "Submitted",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDashboardDataAPI = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/get_dashboard_data`, {
      params: { userId },
    });
    console.log("==Dashboard Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};

export const fetchSavedOutletsAPI = async (userId: string) => {
  const response = await axios.get(`${API_URL}/get_saved_outlets`, {
    params: { userId },
  });
  return response.data;
};

export const saveSelectedOutletsAPI = async (
  description: string,
  outlets: string[],
  userId: string
) => {
  const response = await axios.post(`${API_URL}/save_selected_outlets`, {
    description: description,
    outlets: outlets,
    userId: userId,
  });

  return response.data;
};

export const fetchAllOutletsAPI = async () => {
  const response = await axios.get(`${API_URL}/get_all_outlets`);

  return response.data;
};

export const updatePitchStatusAndNotes = async (
  pitchId: string,
  status: string,
  notes: string,
  userId: string
) => {
  try {
    const response = await axios.put(
      `${API_URL}/update_pitch_status_and_notes`,
      {
        pitchId,
        status,
        notes,
        userId,
      }
    );
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSavedPitch = async (
  description: string,
  selected_date: string,
  userId: string
) => {
  try {
    const response = await axios.delete(`${API_URL}/delete_saved_pitch`, {
      data: { description, selected_date, userId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
