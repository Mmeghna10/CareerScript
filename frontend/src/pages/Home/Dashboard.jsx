/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { LuCirclePlus } from 'react-icons/lu'
import moment from 'moment';
import ResumeSummaryCard from '../../components/Cards/ResumeSummaryCard';
import CreateResumeForm from './CreateResumeForm';
import Modal from '../../components/Modal.jsx';


const Dashboard = () => {
  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState();

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
     console.log(response.data);
      setAllResumes(response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };

  useEffect(() => {
    fetchAllResumes();
  }, []);

  return <DashboardLayout>
    <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Resumes</h1>
          <p className="dashboard-subtitle">Create and manage your professional resumes</p>
        </div>
        
        <div className="resumes-grid">
          <div 
            className="add-resume-card" 
            onClick={() => setOpenCreateModal(true)}
          >
            <div className="add-resume-content">
              <div className="add-resume-icon">
                <LuCirclePlus />
              </div>
              <span className="add-resume-text">Add New Resume</span>
            </div>
          </div>

 <style jsx="true">{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .dashboard-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.12) 0%, transparent 50%);
          pointer-events: none;
          animation: backgroundShift 20s ease-in-out infinite;
        }
        
        @keyframes backgroundShift {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .dashboard-header {
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          z-index: 10;
        }
        
        .dashboard-title {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #34d399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          text-shadow: 0 4px 20px rgba(96, 165, 250, 0.3);
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        
        .dashboard-subtitle {
          font-size: 1.25rem;
          color: #94a3b8;
          font-weight: 400;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .resumes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        
        .add-resume-card {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(20px);
          border: 2px dashed rgba(148, 163, 184, 0.3);
          border-radius: 24px;
          padding: 3rem 2rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 220px;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 10px 25px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(148, 163, 184, 0.1);
        }
        
        .add-resume-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(147, 51, 234, 0.08) 50%, 
            rgba(34, 197, 94, 0.06) 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        
        .add-resume-card:hover::before {
          opacity: 1;
        }
        
        .add-resume-card:hover {
          transform: translateY(-12px) scale(1.02);
          border-color: rgba(96, 165, 250, 0.5);
          box-shadow: 
            0 25px 50px rgba(59, 130, 246, 0.15),
            0 0 0 1px rgba(96, 165, 250, 0.2),
            inset 0 1px 0 rgba(148, 163, 184, 0.2);
          background: rgba(30, 41, 59, 0.6);
        }
        
        .add-resume-card:active {
          transform: translateY(-8px) scale(1.01);
        }
        
        .add-resume-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          position: relative;
          z-index: 1;
        }
        
        .add-resume-icon {
          font-size: 3.5rem;
          color: #e2e8f0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.2) 0%, 
            rgba(147, 51, 234, 0.1) 100%);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          box-shadow: 
            0 8px 16px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .add-resume-card:hover .add-resume-icon {
          transform: rotate(180deg) scale(1.1);
          color: #ffffff;
          background: linear-gradient(135deg, 
            rgba(59, 130, 246, 0.3) 0%, 
            rgba(147, 51, 234, 0.2) 100%);
          box-shadow: 
            0 12px 24px rgba(59, 130, 246, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
        
        .add-resume-text {
          font-size: 1.3rem;
          font-weight: 600;
          color: #e2e8f0;
          transition: all 0.3s ease;
          text-align: center;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .add-resume-card:hover .add-resume-text {
          color: #ffffff;
          transform: translateY(-4px);
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1.5rem;
          }
          
          .dashboard-title {
            font-size: 2.8rem;
          }
          
          .dashboard-subtitle {
            font-size: 1.1rem;
          }
          
          .resumes-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .add-resume-card {
            padding: 2.5rem 1.5rem;
            min-height: 180px;
          }
          
          .add-resume-icon {
            font-size: 3rem;
            width: 80px;
            height: 80px;
          }
          
          .add-resume-text {
            font-size: 1.2rem;
          }
        }
        
        @media (max-width: 480px) {
          .dashboard-container {
            padding: 1rem;
          }
          
          .dashboard-title {
            font-size: 2.2rem;
          }
          
          .dashboard-header {
            margin-bottom: 2.5rem;
          }
          
          .add-resume-card {
            padding: 2rem 1rem;
            min-height: 160px;
          }
        }
        
        /* Enhanced Animation for grid items */
        .resumes-grid > * {
          animation: fadeInUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          opacity: 0;
          transform: translateY(40px);
        }
        
        .resumes-grid > *:nth-child(1) { animation-delay: 0.1s; }
        .resumes-grid > *:nth-child(2) { animation-delay: 0.2s; }
        .resumes-grid > *:nth-child(3) { animation-delay: 0.3s; }
        .resumes-grid > *:nth-child(4) { animation-delay: 0.4s; }
        .resumes-grid > *:nth-child(5) { animation-delay: 0.5s; }
        .resumes-grid > *:nth-child(n+6) { animation-delay: 0.6s; }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Enhanced focus states for accessibility */
        .add-resume-card:focus {
          outline: none;
          box-shadow: 
            0 0 0 3px rgba(96, 165, 250, 0.4),
            0 25px 50px rgba(59, 130, 246, 0.15);
        }
        
        /* Smooth loading state */
        .dashboard-container {
          animation: fadeIn 0.8s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Additional floating background elements */
        .dashboard-container::after {
          content: '';
          position: absolute;
          top: 10%;
          left: 5%;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.1));
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
          z-index: 1;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        /* Subtle grid pattern overlay */
        .dashboard-container {
          background-image: 
            linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%),
            radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.05) 1px, transparent 0);
          background-size: 100% 100%, 40px 40px;
        }
      `}</style>

      {allResumes?.map((resume) => (
        <ResumeSummaryCard
          key={resume?._id}
          imgUrl={resume?.thumbnailLink || null}
          title={resume.title}
          lastUpdated={
            resume?.updatedAt
              ? moment(resume.updatedAt).format("DP MMM YYYY")
              : ""
          }
          onSelect={() => navigate(`/resume/${resume?._id}`)}
        />
      ))}
    </div>

    <Modal 
    isOpen={openCreateModal}
     onClose={() => setOpenCreateModal(false)}
      hideHeader
    >
      <div>
        <CreateResumeForm />
      </div>
    </Modal>
    </div>
  </DashboardLayout>
}

export default Dashboard