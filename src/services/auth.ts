import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY || "";

if (!stripePublicKey) {
  console.error(
    "⚠️ Error: Stripe public key is missing. Check your .env file."
  );
}

const stripePromise = loadStripe(stripePublicKey);

// const API_URL = "http://127.0.0.1:10000";
// const API_URL = "https://mediaabstract-backend.onrender.com";

const API_URL = "https://backend.writefor.co/";

export const createCheckSeesion = async (
  email: string,
  password: string,
  planId: string
) => {
  if (!email || !password || !planId) {
    throw new Error("❌ Missing required fields: email, password, or plan.");
  }

  try {
    const response = await axios.post(`${API_URL}/signup`, {
      email,
      password,
      planId,
    });

    if (!response.data.sessionId) {
      throw new Error("⚠️ Error: Missing session ID in response.");
    }

    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("❌ Stripe initialization failed.");
    }

    await stripe.redirectToCheckout({ sessionId: response.data.sessionId });
  } catch (error) {
    console.error("Payment Error:", error);
    throw new Error("Failed to initiate checkout session.");
  }
};
