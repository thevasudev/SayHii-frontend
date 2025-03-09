import React, { useState, useEffect } from "react";
import { getAllFrames } from "../../api/frameAPi";
import { useLocation, useNavigate } from "react-router-dom";

const Frame = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // If you passed user in from CreateUser, it's here:
  const { createdUser } = location.state || {};

  const [frames, setFrames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFrames = async () => {
      try {
        const data = await getAllFrames();
        setFrames(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFrames();
  }, []);

  const handleFrameSelect = (frame) => {
    // ---- Store selected frame in localStorage ----
    localStorage.setItem("selectedFrame", JSON.stringify(frame));

    // Also navigate to "/select-copy"
    navigate("/select-copy", {
      state: {
        selectedFrame: frame,
        createdUser: createdUser,
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (frames.length === 0) return <div>No frames available.</div>;

  return (
    <div>
      <h1>Available Frames</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {frames.map((frame) => (
          <div
            key={frame._id}
            style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}
          >
            <img
              src={frame.image}
              alt="Frame"
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <h3>Size: {frame.frame_size}</h3>
            <p>Price: ${frame.price}</p>
            <p>Rows: {frame.rows}</p>
            <p>Columns: {frame.column}</p>
            <p>Orientation: {frame.orientation}</p>

            <button onClick={() => handleFrameSelect(frame)}>
              Select This Frame
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Frame;
