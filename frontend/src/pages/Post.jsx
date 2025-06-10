import uploadIcon from "../assets/upload2.png";
import "./styles/Post.css";
import { useState } from "react";
import NavBar from "../components/NavBar";
import { handleError, handleSuccess } from "../components/utils";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "social-clone-upload");
    data.append("cloud_name", "dltdkjlbk");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dltdkjlbk/image/upload", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (result.secure_url) {
        setImageUrl(result.secure_url); // use secure_url directly
        console.log("Uploaded image URL:", result.secure_url);
      } else {
        handleError("Upload failed. Try again.");
      }
    } catch (err) {
      handleError("Error uploading image.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCaption = (e) => {
    setCaption(e.target.value);
  };

  const handleSubmit = async () => {
    const userName = localStorage.getItem("loggedInUser")?.trim();

    if (!imageUrl || !caption.trim() || !userName) {
      handleError("Please provide all the fields");
      return;
    }

    const payload = {
      image: imageUrl,
      comment: caption.trim(),
      userName: userName
    };

    try {
      const response = await fetch("http://localhost:8080/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      console.log("Response status: ", response.status);

      const result = await response.json();
      console.log("Full response", result);

      if (result.success) {
        handleSuccess(result.message);
        setTimeout(() => navigate("/home"), 1000);
      } else {
        handleError(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Submit error:", error);  
      handleError("Failed to post. Please try again.");
    }
  };

  return (
    <div className="post-container">
      <NavBar />
      <div className="file-upload">
        <h1 className="title">
          Post an image &rarr;
          <span className="description">make sure it's a bad one</span>
        </h1>

        <div className="input-container">
          <div>
            {loading ? (
              <p>Uploading...</p>
            ) : (
              <img src={uploadIcon} alt="Upload" className="upload-icon" />
            )}
          </div>
          <input
            type="file"
            className="file-input"
            onChange={handleFileUpload}
          />
        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded preview"
            className="preview-image"
          />
        )}
      </div>

      <div className="caption-container">
        <span className="caption">Add a caption &rarr;</span>
        <textarea
          name="caption"
          rows="4"
          cols="50"
          placeholder="Write your caption here..."
          className="caption-area"
          value={caption}
          onChange={handleCaption}
        ></textarea>
        <button className="post-submit" onClick={handleSubmit}>
          Post
        </button>
      </div>

      
    </div>
  );
};

export default Post;
