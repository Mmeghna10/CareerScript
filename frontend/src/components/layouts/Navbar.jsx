import React from 'react';
import ProfileInfoCard from '../Cards/ProfileInfoCard';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <div className='navbar-content'>
        <Link to='/dashboard' className='navbar-brand'>
          <h2 className='navbar-title'>
            CareerScript
          </h2>
        </Link>
        
        <div className='navbar-profile'>
          <ProfileInfoCard />
        </div>
      </div>
      
      <style jsx="true">{`
        .navbar-container {
          height: 80px;
          position: sticky;
          top: 0;
          z-index: 50;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border-bottom: 1px solid rgba(75, 85, 99, 0.3);
          padding: 0 0.8rem;
        }
        
        .navbar-content {
          max-width: 1280px;
          margin: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }

        .navbar-profile{
        margin-right:-10rem;
        }
        
        .navbar-brand {
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          // background: rgba(31, 41, 55, 0.3);
          // border: 1px solid rgba(75, 85, 99, 0.2);
        }
        
    
        
        .navbar-title {
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #34d399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
        }
        
        // .navbar-brand:hover .navbar-title {
        //   background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
        //   -webkit-background-clip: text;
        //   -webkit-text-fill-color: transparent;
        // }
        
        /* Responsive */
        @media (max-width: 768px) {
          .navbar-container {
            height: 70px;
            padding: 0 0.75rem;
          }
          
          .navbar-title {
            font-size: 1.25rem;
          }
          
          .navbar-brand {
            padding: 0.375rem 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;