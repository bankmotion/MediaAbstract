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

// const API_URL = process.env.REACT_APP_API_URL;

// export const createCheckSession = async (
//   email: string,
//   password: string,
//   priceId: string
// ) => {
//   try {
//     const response = await axios.post(`${API_URL}/create-checkout-session`, {
//       email,
//       password,
//       planType: priceId,
//     });

//     if (response.data.url) {
//       // Redirect to Stripe Checkout using the URL from the backend
//       window.location.href = response.data.url;
//     } else {
//       throw new Error("No checkout URL found in response");
//     }
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     throw error;
//   }
// };

// export const verifyPayment = async (sessionId: string) => {
//   try {
//     const response = await axios.post(`${API_URL}/verify`, {
//       sessionId,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error verifying payment:", error);
//     throw error;
//   }
// };
