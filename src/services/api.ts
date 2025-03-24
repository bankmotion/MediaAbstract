const API_URL = "http://localhost:5000";

export const submitPitch = async (abstract: string, industry: string) => {
  const response = await fetch(`${API_URL}/onboarding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ abstract, industry }),
  });
  return response.json();
};

export const fetchResults = async () => {
  const response = await fetch(`${API_URL}/results`);
  return response.json();
};
