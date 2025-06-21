import React, { useEffect, useState } from 'react';
import { getLightColorFromImage } from '../../utils/helper';

const ResumeSummaryCard = ({ imgUrl, title, lastUpdated, onSelect }) => {
  const [bgColor, setBgColor] = useState("rgba(255, 255, 255, 0.1)");

  useEffect(() => {
    if (imgUrl) {
      getLightColorFromImage(imgUrl)
        .then((color) => {
          // Convert the color to a more transparent version for glassmorphism effect
          setBgColor(`${color}20`); // Fixed: Added backticks for template literal
        })
        .catch(() => {
          setBgColor('rgba(255, 255, 255, 0.1)');
        });
    }
  }, [imgUrl]);

  return (
    <div 
      className='resume-card'
      style={{ 
        backgroundColor: bgColor,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
      onClick={onSelect}
    >
      <div className='card-content'>
        <div className='image-container'>
          {imgUrl ? (
            <img 
              src={imgUrl} 
              alt={title} 
              className='card-image'
            />
          ) : (
            <div className='placeholder-image'>
              <div className='placeholder-icon'>📄</div>
            </div>
          )}
        </div>
        
        <div className='card-footer'>
          <h5 className='card-title'>{title}</h5>
          <p className='card-subtitle'>
            Last Updated: {lastUpdated}
          </p>
        </div>
      </div>

      <style jsx="true">{`
        .resume-card {
          height: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
          cursor: pointer;
          position: relative;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 4px 16px rgba(0, 0, 0, 0.08),
            0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .resume-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          border-radius: 20px;
        }

        .resume-card:hover::before {
          opacity: 1;
        }

        .resume-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.2),
            0 8px 32px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .resume-card:active {
          transform: translateY(-4px) scale(1.01);
        }

        .card-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }

        .image-container {
          padding: 16px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 16px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 
            0 12px 24px rgba(0, 0, 0, 0.15),
            0 4px 12px rgba(0, 0, 0, 0.1),
            0 2px 6px rgba(0, 0, 0, 0.08);
        }

        .resume-card:hover .card-image {
          transform: scale(1.05);
          box-shadow: 
            0 16px 32px rgba(0, 0, 0, 0.2),
            0 6px 16px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .placeholder-image {
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .placeholder-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.2) 0%, transparent 50%);
        }

        .placeholder-icon {
          font-size: 3rem;
          color: rgba(255, 255, 255, 0.9);
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .resume-card:hover .placeholder-image {
          transform: scale(1.05);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .resume-card:hover .placeholder-icon {
          transform: scale(1.1);
          color: #ffffff;
        }

        .card-footer {
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 16px;
          position: relative;
        }

        .card-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 20%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0.2) 80%,
            transparent 100%
          );
        }

        .card-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.95);
          margin: 0 0 4px 0;
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: all 0.3s ease;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .resume-card:hover .card-title {
          color: #ffffff;
          transform: translateY(-1px);
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .card-subtitle {
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          line-height: 1.3;
          transition: color 0.3s ease;
        }

        .resume-card:hover .card-subtitle {
          color: rgba(255, 255, 255, 0.9);
        }

        /* Animation keyframes */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Focus states for accessibility */
        .resume-card:focus {
          outline: none;
          box-shadow: 
            0 0 0 3px rgba(255, 255, 255, 0.3),
            0 20px 40px rgba(0, 0, 0, 0.2),
            0 8px 32px rgba(0, 0, 0, 0.15);
          border-color: rgba(255, 255, 255, 0.5);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .resume-card {
            height: 280px;
          }
          
          .card-image, .placeholder-image {
            height: 180px;
          }
          
          .image-container {
            padding: 12px;
          }
          
          .card-footer {
            padding: 12px;
          }
          
          .card-title {
            font-size: 0.8125rem;
          }
          
          .card-subtitle {
            font-size: 0.6875rem;
          }
        }

        @media (max-width: 480px) {
          .resume-card {
            height: 260px;
          }
          
          .card-image, .placeholder-image {
            height: 160px;
          }
          
          .placeholder-icon {
            font-size: 2.5rem;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .resume-card {
            border: 2px solid rgba(255, 255, 255, 0.8);
            background: rgba(255, 255, 255, 0.2);
          }
          
          .card-title {
            color: #ffffff;
          }
          
          .card-subtitle {
            color: rgba(255, 255, 255, 0.8);
          }
        }

        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .resume-card,
          .card-image,
          .placeholder-image,
          .placeholder-icon,
          .card-title,
          .card-subtitle {
            animation: none;
            transition: none;
          }
          
          .resume-card:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeSummaryCard;