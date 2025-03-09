import axios from "axios";

export const createPayment = async (userId, paymentData) => {
  try {
    const response = await axios.post(`/payment/createPayment/${userId}`, paymentData);
    console.log("Payment created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error.response?.data?.message || error.message);
    throw error;
  }
};
