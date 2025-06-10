import { useEffect, useState } from "react";
import "./styles/Home.css";
import {handleSuccess } from "../components/utils";
import {useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ImageCard from "../components/ImageCard";
import NavBar from "../components/NavBar";
import { LogOut } from "lucide-react";


const Home = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(false);
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogOut = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  //this is temporary
  const samplePosts = [
    {
      id: "1",
      image: "https://plus.unsplash.com/premium_photo-1683147713829-10d253b2f5eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
      comment: "Had a great time at the beach!"
    },
    {
      id: "2",
      image: "https://plus.unsplash.com/premium_photo-1683140435505-afb6f1738d11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hpcnR8ZW58MHx8MHx8fDA%3D",
      comment: "The mountains were breathtaking!"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1546636889-ba9fdd63583e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RyZWV0fGVufDB8fDB8fHww",
      comment: "Exploring the city vibes."
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1591280063444-d3c514eb6e13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2VzfGVufDB8fDB8fHww",
      comment: "This food was unreal 🤤"
    }
  ];

  return (
    <div>
      <NavBar/>
      <div  className="container">
        <div className="header">
        <h1 className="main-title">{loggedInUser}'s feed &rarr;<span className="description">explore some ugly images today</span></h1>
        <button className="logout-btn" onClick={handleLogOut}><span>Log Out</span><LogOut size={20}></LogOut></button>
        </div>
        <div className="posts-grid">
          {
            samplePosts.map((post)=>{
              return <ImageCard key={post._id} post={post}></ImageCard>
            })
          }
        </div>
        <ToastContainer />
      </div>
      
    </div>
  );
};

export default Home;