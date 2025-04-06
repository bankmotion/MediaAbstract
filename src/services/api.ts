import axios from "axios";

// const API_URL = "http://127.0.0.1:10000";
// const API_URL = "https://mediaabstract-backend.onrender.com";

// const API_URL = "http://146.190.131.130:10000";
const API_URL = "https://backend.writefor.co/";

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

    // Expecting the backend to return matched outlets inside the response
    return data.matched_outlets || [];
  } catch (error) {
    console.error("Error in submitPitch", error);
    return { error: "Failed to submit pitch" };
  }
};

export const fetchDashboardDataAPI = async () => {
  const response = await axios.get(`${API_URL}/get_dashboard_data`);
  // console.log("----response:", response);
  return response.data;
};

export const fetchSavedOutletsAPI = async () => {
  const response = await axios.get(`${API_URL}/get_saved_outlets`);
  console.log("----response:", response);
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
  console.log("=======response: ", response.data);
  return response.data;
};
