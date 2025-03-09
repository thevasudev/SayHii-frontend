import React, { useState } from "react";
import { createUser } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateUser = async () => {
    if (!name.trim()) {
      alert("Username is required!");
      return;
    }

    try {
      setLoading(true);

      const userData = { name };
      if (instagram.trim()) {
        userData.insta = instagram;
      }

      const response = await createUser(userData);
      console.log("User created successfully:", response);

      // ---- Store user details in localStorage here ----
      localStorage.setItem("createdUser", JSON.stringify(response.user));

      // Then navigate as before
      navigate("/select-frame", {
        state: { createdUser: response.user },
      });
    } catch (error) {
      console.error("Error creating user:", error.response?.data?.message || "Unknown error");
      alert(error.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Instagram (Optional)"
        value={instagram}
        onChange={(e) => setInstagram(e.target.value)}
      />

      <button onClick={handleCreateUser} disabled={loading}>
        {loading ? "Creating..." : "Create User"}
      </button>
    </div>
  );
};

export default CreateUser;
