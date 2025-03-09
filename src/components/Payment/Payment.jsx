import React, { useState } from "react";
import { createPayment } from "../../api/paymentApi";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve data from location.state or localStorage
  const storedUser = localStorage.getItem("createdUser");
  const storedFrame = localStorage.getItem("selectedFrame");
  const storedCopies = localStorage.getItem("userChosenCopies");

  const { selectedFrame: frameFromState, createdUser: userFromState, userChosenCopies: copiesFromState } =
    location.state || {};

  const selectedFrame = frameFromState || (storedFrame ? JSON.parse(storedFrame) : null);
  const createdUser = userFromState || (storedUser ? JSON.parse(storedUser) : null);
  const userChosenCopies = copiesFromState || (storedCopies ? JSON.parse(storedCopies) : null);

  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState("");
  const [payment_method, setPayment_method] = useState("");

  const handlePayment = async () => {
    try {
      if (!createdUser || !createdUser._id) {
        alert("No user found in localStorage!");
        return;
      }

      const paymentData = {
        paymentMethod,
        payment_Details: paymentDetails,
        payment_method,
      };

      await createPayment(createdUser._id, paymentData);
      alert("Payment successful!");
      navigate("/success");
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Payment failed!");
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>

      <div style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "24px" }}>
        <h2>Your Order Details</h2>
        <p><strong>Username:</strong> {createdUser?.name}</p>
        <p><strong>Frame Size:</strong> {selectedFrame?.frame_size}</p>
        <p><strong>Price:</strong> ${selectedFrame?.price}</p>
        <p><strong>Copies:</strong> {userChosenCopies}</p>
      </div>

      <div style={{ border: "1px solid #ccc", padding: "16px" }}>
        <h2>Enter Payment Details</h2>

        <div>
          <label>Payment Method:</label>
          <input
            type="text"
            placeholder="e.g. Credit Card"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </div>

        <div style={{ marginTop: "8px" }}>
          <label>Payment Details:</label>
          <input
            type="text"
            placeholder="e.g. Card Number"
            value={paymentDetails}
            onChange={(e) => setPaymentDetails(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </div>

        <div style={{ marginTop: "8px" }}>
          <label>Payment_method:</label>
          <input
            type="text"
            placeholder="Optional field"
            value={payment_method}
            onChange={(e) => setPayment_method(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </div>

        <button style={{ marginTop: "16px" }} onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
