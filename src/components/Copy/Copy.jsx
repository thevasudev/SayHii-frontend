import React, { useState, useEffect } from "react";
import { getAllCopies } from "../../api/copyApi";
import { useLocation, useNavigate } from "react-router-dom";

const Copy = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve data from route state (if present)
  const { selectedFrame: frameFromState, createdUser: userFromState } = location.state || {};

  // Also retrieve from localStorage in case the user refreshed or state is missing
  const storedUser = localStorage.getItem("createdUser");
  const storedFrame = localStorage.getItem("selectedFrame");

  // Merge: prefer location.state but fallback to localStorage
  const selectedFrame = frameFromState || (storedFrame ? JSON.parse(storedFrame) : null);
  const createdUser = userFromState || (storedUser ? JSON.parse(storedUser) : null);

  const [copies, setCopies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected copy count
  const [selectedCopy, setSelectedCopy] = useState(null);

  useEffect(() => {
    const fetchCopies = async () => {
      try {
        const data = await getAllCopies();
        setCopies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCopies();
  }, []);

  const handleSelectCopy = (copy) => {
    setSelectedCopy(copy);
  };

  const handleConfirmCopies = () => {
    if (!selectedCopy) {
      alert("Please select a copy before proceeding.");
      return;
    }

    // Store the selected copy locally
    localStorage.setItem("userChosenCopies", JSON.stringify(selectedCopy.Number));

    // Navigate to Payment page with stored data
    navigate("/payment", {
      state: {
        selectedFrame,
        createdUser,
        userChosenCopies: selectedCopy.Number,
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Available Copies</h1>

      {/* Show details of the selected frame, if any */}
      {selectedFrame && (
        <div style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
          <h2>Selected Frame</h2>
          <p><strong>ID:</strong> {selectedFrame._id}</p>
          <p><strong>Size:</strong> {selectedFrame.frame_size}</p>
          <p><strong>Price:</strong> ${selectedFrame.price}</p>
          <p><strong>Rows:</strong> {selectedFrame.rows}</p>
          <p><strong>Columns:</strong> {selectedFrame.column}</p>
          <p><strong>Orientation:</strong> {selectedFrame.orientation}</p>
        </div>
      )}

      {/* Display available copies */}
      {copies.length === 0 ? (
        <div>No copies available.</div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: "10px",
          }}
        >
          {copies.map((copy) => (
            <div
              key={copy._id}
              onClick={() => handleSelectCopy(copy)}
              style={{
                border: selectedCopy?._id === copy._id ? "2px solid green" : "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                backgroundColor: selectedCopy?._id === copy._id ? "#d4edda" : "#fff",
              }}
            >
              <p><strong>Copies:</strong> {copy.Number}</p>
            </div>
          ))}
        </div>
      )}

      {/* Confirm selection */}
      <button 
        onClick={handleConfirmCopies} 
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Confirm & Proceed to Payment
      </button>
    </div>
  );
};

export default Copy;
