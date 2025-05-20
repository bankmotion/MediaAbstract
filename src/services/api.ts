import axios from "axios";

// const API_URL = "http://127.0.0.1:10000";
// const API_URL = "https://mediaabstract-backend.onrender.com";

const API_URL = "http://146.190.131.130:10000";
// const API_URL = process.env.API_URL;

export const submitPitch = async (abstract: string, industry: string) => {
  try {
    const response = await fetch(`${API_URL}/submit_pitch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ abstract, industry }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error submitting pitch:", errorText);
      throw new Error(`Submission failed: ${errorText}`);
    }

    const data = await response.json();
    console.log("Pitch submitted successfully:", data);

    return data.matched_outlets || [];
  } catch (error) {
    console.error("Error in submitPitch", error);
    return { error: "Failed to submit pitch" };
  }
};

export const updatePitchSubmissionStatus = async (
  pitchId: string,
  outletName: string
) => {
  try {
    const response = await axios.put(`${API_URL}/update_pitch_status`, {
      pitchId,
      outletName,
      status: "Submitted",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDashboardDataAPI = async () => {
  const response = await axios.get(`${API_URL}/get_dashboard_data`);
  console.log("Dashboard Data:", response.data);
  return response.data;
};

export const fetchSavedOutletsAPI = async () => {
  const response = await axios.get(`${API_URL}/get_saved_outlets`);

  return response.data;
};

export const saveSelectedOutletsAPI = async (
  description: string,
  outlets: string[]
) => {
  const response = await axios.post(`${API_URL}/save_selected_outlets`, {
    description: description,
    outlets: outlets,
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
  notes: string
) => {
  try {
    const response = await axios.put(
      `${API_URL}/update_pitch_status_and_notes`,
      {
        pitchId,
        status,
        notes,
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
  selected_date: string
) => {
  try {
    const response = await axios.delete(`${API_URL}/delete_saved_pitch`, {
      data: { description, selected_date },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
