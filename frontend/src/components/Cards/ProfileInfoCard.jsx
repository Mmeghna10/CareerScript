import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  // Debug log to check user data
  console.log('ProfileInfoCard - User data:', user);

  // Memoized logout handler
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  // Function to get fallback avatar
  const getFallbackAvatar = (name) => {
    const initial = name ? name.charAt(0).toUpperCase() : "U";
    // Using a data URL SVG instead of external placeholder service
    return `data:image/svg+xml,%3csvg width='44' height='44' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3clinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3e%3cstop offset='0%25' style='stop-color:%23667eea;stop-opacity:1' /%3e%3cstop offset='100%25' style='stop-color:%23764ba2;stop-opacity:1' /%3e%3c/linearGradient%3e%3c/defs%3e%3crect width='44' height='44' fill='url(%23grad)' rx='22'/%3e%3ctext x='22' y='28' font-family='Arial, sans-serif' font-size='18' font-weight='bold' fill='white' text-anchor='middle'%3e${initial}%3c/text%3e%3c/svg%3e`;
  };

  // Function to process image URL for mixed content issues
  const getSecureImageUrl = (url) => {
    if (!url) return null;
    
    // If it's already a data URL or HTTPS, return as is
    if (url.startsWith('data:') || url.startsWith('https:')) {
      return url;
    }
    
    // If it's HTTP localhost and we're on HTTPS, it won't work
    if (url.startsWith('http://localhost') && window.location.protocol === 'https:') {
      console.warn('Mixed content detected - HTTP image on HTTPS site:', url);
      return null; // Will fallback to default avatar
    }
    
    // For other HTTP URLs, try to convert to HTTPS
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    
    return url;
  };

  // Show loading state or nothing if no user
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
        `}</style>
      </div>
    );
  }

  const secureImageUrl = getSecureImageUrl(user.profileImageUrl);
  const fallbackAvatar = getFallbackAvatar(user.name || user.email);
   
  return (
    <div className="profile-card">
      <div className="profile-avatar-container">
        <img
          src={secureImageUrl || fallbackAvatar}
          alt={user.name || "User"}
          className="profile-avatar"
          onError={(e) => {
            console.log('Image failed to load, using fallback');
            e.target.src = fallbackAvatar;
          }}
          onLoad={() => {
            console.log('Profile image loaded successfully');
          }}
        />
        <div className="avatar-ring"></div>
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
      
      <style jsx="true">{`
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
        
        /* Animation for initial load */
        .profile-card {
          animation: slideInRight 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
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
        
        /* Loading state improvements */
        .profile-card-loading {
          animation: slideInRight 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
      `}</style>
    </div>
  );
};

export default ProfileInfoCard;