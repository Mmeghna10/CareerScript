import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [avatarSrc, setAvatarSrc] = useState("/default-avatar.png");
  const [imageLoadError, setImageLoadError] = useState(false);
  
  // Debug log to check user data
  console.log('ProfileInfoCard - User data:', user);

  // Handle image URL changes
  useEffect(() => {
    if (user?.profileImageUrl) {
      // Validate and sanitize the image URL
      const sanitizedUrl = sanitizeImageUrl(user.profileImageUrl);
      if (sanitizedUrl) {
        setAvatarSrc(sanitizedUrl);
        setImageLoadError(false);
      } else {
        console.warn('Invalid profile image URL:', user.profileImageUrl);
        setAvatarSrc(getDefaultAvatar(user));
        setImageLoadError(true);
      }
    } else {
      setAvatarSrc(getDefaultAvatar(user));
    }
  }, [user?.profileImageUrl, user?.name, user?.email]);

  // Sanitize image URL
  const sanitizeImageUrl = (url) => {
    if (!url || typeof url !== 'string') return null;
    
    // Handle localhost URLs in development
    if (url.includes('localhost:') && !url.startsWith('http')) {
      return `http://localhost:8000${url.startsWith('/') ? '' : '/'}${url}`;
    }
    
    // Check if it's a valid URL
    try {
      new URL(url);
      return url;
    } catch {
      return null;
    }
  };

  // Generate default avatar with initials
  const getDefaultAvatar = (userData) => {
    if (!userData) return "/default-avatar.png";
    
    const name = userData.name || userData.email || "User";
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    
    // Create a simple colored background based on the name
    const colors = [
      '667eea', '764ba2', 'f093fb', 'f5576c', 
      '4ecdc4', '44a08d', '667eea', 'f093fb'
    ];
    const colorIndex = name.length % colors.length;
    const bgColor = colors[colorIndex];
    
    // Use a more reliable avatar service
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor}&color=ffffff&size=44&rounded=true&bold=true`;
  };

  // Memoized logout handler
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  // Handle image load error
  const handleImageError = (e) => {
    console.log('Avatar image failed to load, using fallback');
    if (!imageLoadError) {
      setImageLoadError(true);
      const fallbackSrc = getDefaultAvatar(user);
      if (e.target.src !== fallbackSrc) {
        e.target.src = fallbackSrc;
      }
    }
  };

  // Handle successful image load
  const handleImageLoad = () => {
    console.log('Avatar image loaded successfully');
    setImageLoadError(false);
  };

  // Show loading state if no user
  if (!user) {
    console.log('ProfileInfoCard - No user found');
    return (
      <div className="profile-card-loading">
        <div className="loading-avatar"></div>
        <div className="loading-text">Loading...</div>
        
        <style jsx>{`
          .profile-card-loading {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 16px;
            box-shadow: 
              0 4px 20px rgba(0, 0, 0, 0.1),
              0 0 0 1px rgba(255, 255, 255, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.1);
            animation: slideInRight 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
          }
          
          .loading-avatar {
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          .loading-text {
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.875rem;
            font-weight: 500;
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          
          @keyframes slideInRight {
            from {
              transform: translateX(30px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }
   
  return (
    <div className="profile-card">
      <div className="profile-avatar-container">
        <img
          src={avatarSrc}
          alt={user.name || "User"}
          className="profile-avatar"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        <div className="avatar-ring"></div>
        {imageLoadError && (
          <div className="avatar-error-indicator" title="Image failed to load">
            ⚠️
          </div>
        )}
      </div>
             
      <div className="profile-info">
        <div className="profile-name">
          {user.name || user.email || "User"}
        </div>
        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      
      <style jsx>{`
        .profile-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 16px;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          animation: slideInRight 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        
        .profile-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 118, 117, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .profile-card:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.15);
        }
        
        .profile-avatar-container {
          position: relative;
          z-index: 1;
        }
        
        .profile-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .avatar-ring {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .avatar-error-indicator {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 16px;
          height: 16px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          z-index: 2;
          cursor: help;
        }
        
        .profile-card:hover .avatar-ring {
          opacity: 1;
        }
        
        .profile-card:hover .profile-avatar {
          transform: scale(1.05);
          border-color: rgba(255, 255, 255, 0.4);
        }
        
        .profile-info {
          display: flex;
          flex-direction: column;
          gap: 0.125rem;
          position: relative;
          z-index: 1;
        }
        
        .profile-name {
          font-size: 0.9375rem;
          font-weight: 700;
          line-height: 1.2;
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        
        .profile-card:hover .profile-name {
          color: #ffffff;
          transform: translateY(-1px);
        }
        
        .logout-button {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
          padding: 0;
          transition: all 0.3s ease;
          position: relative;
          text-decoration: none;
        }
        
        .logout-button::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -1px;
          left: 0;
          background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0.5) 100%);
          transition: width 0.3s ease;
        }
        
        .logout-button:hover {
          color: #ffffff;
          transform: translateY(-1px);
        }
        
        .logout-button:hover::after {
          width: 100%;
        }
        
        .logout-button:active {
          transform: translateY(0);
        }
        
        /* Focus states for accessibility */
        .logout-button:focus {
          outline: none;
          color: #ffffff;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        
        .profile-card:focus-within {
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.15),
            0 0 0 2px rgba(255, 255, 255, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .profile-card {
            padding: 0.625rem 0.75rem;
            gap: 0.625rem;
          }
          
          .profile-avatar {
            width: 40px;
            height: 40px;
          }
          
          .profile-name {
            font-size: 0.875rem;
          }
          
          .logout-button {
            font-size: 0.8125rem;
          }
        }
        
        @media (max-width: 480px) {
          .profile-card {
            padding: 0.5rem 0.625rem;
            gap: 0.5rem;
          }
          
          .profile-avatar {
            width: 36px;
            height: 36px;
          }
          
          .profile-name {
            font-size: 0.8125rem;
          }
          
          .logout-button {
            font-size: 0.75rem;
          }
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .profile-card,
          .profile-avatar,
          .profile-name,
          .logout-button {
            animation: none;
            transition: none;
          }
          
          .profile-card:hover,
          .logout-button:hover,
          .profile-name:hover {
            transform: none;
          }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .profile-card {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.5);
          }
          
          .profile-name,
          .logout-button {
            color: #ffffff;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileInfoCard;