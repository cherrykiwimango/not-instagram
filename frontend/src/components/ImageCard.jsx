import React from 'react'
import { Heart, MessageCircle } from 'lucide-react';
import "./ImageCard.css";

const ImageCard = ({post}) => {
  return (
    <div className='image-card'>
      <div className='card-header'>
        <span className="posted-by"> {post.username || 'biker_raghu_07'}</span>
        <span className="date-posted">{post.datePosted || "Today"}</span>
      </div>

      <div className='card-content'>
        <div className='image-container'>
          <img
            src={post.image}
            alt="post image"
            className='post-image'
          />
        </div>
        <div className='icon-group'>
          <div className='icon-container'>
            <button className="icon-button">
            <Heart size={45} strokeWidth={0.8} />
            </button>
            <span className='icon-count'>
              0 likes
            </span>
          </div>
          
          <div>
            <button className="icon-button">
            <MessageCircle size={45} strokeWidth={0.8} />
            </button>
            <span className='icon-count'>
              0 comments
            </span>
          </div>
          
        </div>
      </div>
      <div className="card-caption">
        <p className="caption-text">&rarr; {post.comment}</p>
      </div>
    </div>
  )
}

export default ImageCard