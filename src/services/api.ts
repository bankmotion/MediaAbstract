// const API_URL = "http://localhost:5000";
const API_URL = "https://mediaabstract-backend.onrender.com";

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

    console.log("response", response);

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
