import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //Handle Login form submit  
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
    // Login API Call    
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,
        { email, password, });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  return (
    <>
      <style jsx = "true">{`
        .login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        
        /* Professional floating particles */
        .login-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, rgba(59, 130, 246, 0.3), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(99, 102, 241, 0.2), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(168, 85, 247, 0.3), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(59, 130, 246, 0.2), transparent),
            radial-gradient(2px 2px at 160px 30px, rgba(99, 102, 241, 0.1), transparent);
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: particleFloat 20s linear infinite;
          pointer-events: none;
        }
        
        /* Subtle animated mesh gradient */
        .login-container::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(
            circle at 25% 25%, 
            rgba(59, 130, 246, 0.1) 0%, 
            transparent 50%
          ),
          radial-gradient(
            circle at 75% 75%, 
            rgba(99, 102, 241, 0.08) 0%, 
            transparent 50%
          );
          animation: meshRotate 30s ease-in-out infinite;
          pointer-events: none;
        }
        
        @keyframes particleFloat {
          0% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(-10px); }
          66% { transform: translateY(-40px) translateX(5px); }
          100% { transform: translateY(-60px) translateX(-15px); }
        }
        
        @keyframes meshRotate {
          0%, 100% { transform: rotate(0deg) scale(1); }
          33% { transform: rotate(120deg) scale(1.1); }
          66% { transform: rotate(240deg) scale(0.9); }
        }
        
        .login-split {
          display: flex;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 0 0 1px rgba(71, 85, 105, 0.2);
          position: relative;
          z-index: 1;
          max-width: 900px;
          width: 100%;
          min-height: 600px;
          animation: cardEntry 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes cardEntry {
          0% {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .login-visual {
          flex: 1;
          background: linear-gradient(135deg, 
            rgba(15, 23, 42, 0.95) 0%, 
            rgba(30, 41, 59, 0.9) 30%, 
            rgba(51, 65, 85, 0.85) 70%, 
            rgba(71, 85, 105, 0.8) 100%
          );
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          position: relative;
          overflow: hidden;
        }
        
        /* Sophisticated sliding accent */
        .login-visual::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(59, 130, 246, 0.1) 20%,
            rgba(99, 102, 241, 0.15) 40%,
            rgba(168, 85, 247, 0.1) 60%,
            rgba(59, 130, 246, 0.08) 80%,
            transparent 100%
          );
          animation: professionalSlide 8s ease-in-out infinite;
          pointer-events: none;
        }
        
        @keyframes professionalSlide {
          0% { 
            transform: translateX(-100%); 
            opacity: 0; 
          }
          20% { 
            opacity: 1; 
          }
          80% { 
            opacity: 1; 
          }
          100% { 
            transform: translateX(200%); 
            opacity: 0; 
          }
        }
        
        /* Geometric accent elements */
        .login-visual::after {
          content: '';
          position: absolute;
          top: 20%;
          right: 10%;
          width: 120px;
          height: 120px;
          background: linear-gradient(45deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(99, 102, 241, 0.08) 100%
          );
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: geometricFloat 12s ease-in-out infinite;
          pointer-events: none;
        }
        
        @keyframes geometricFloat {
          0%, 100% {
            transform: rotate(0deg) translateY(0px);
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          25% {
            transform: rotate(90deg) translateY(-15px);
            border-radius: 58% 42% 75% 25% / 76% 24% 76% 24%;
          }
          50% {
            transform: rotate(180deg) translateY(-10px);
            border-radius: 50% 50% 25% 75% / 25% 75% 50% 50%;
          }  
          75% {
            transform: rotate(270deg) translateY(-20px);
            border-radius: 25% 75% 50% 50% / 50% 50% 25% 75%;
          }
        }
        
        .visual-content {
          text-align: center;
          position: relative;
          z-index: 2;
        }
        
        .visual-title {
          font-size: 2.75rem;
          font-weight: 800;
          background: linear-gradient(135deg, 
            #f8fafc 0%, 
            #e2e8f0 30%, 
            #cbd5e1 60%, 
            #94a3b8 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
          line-height: 1.2;
          animation: titleEntry 1s ease-out 0.3s both;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }
        
        @keyframes titleEntry {
          0% {
            transform: translateX(-50px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .visual-subtitle {
          font-size: 1.15rem;
          color: #cbd5e1;
          line-height: 1.6;
          font-weight: 400;
          animation: subtitleEntry 1s ease-out 0.5s both;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        @keyframes subtitleEntry {
          0% {
            transform: translateX(-30px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .login-form-section {
          flex: 1;
          padding: 3rem;
          background: linear-gradient(135deg, 
            rgba(15, 23, 42, 0.6) 0%, 
            rgba(30, 41, 59, 0.5) 100%
          );
          backdrop-filter: blur(15px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          border-left: 1px solid rgba(71, 85, 105, 0.2);
        }
        
        /* Subtle form background animation */
        .login-form-section::before {
          content: '';
          position: absolute;
          top: 0;
          right: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(59, 130, 246, 0.03) 50%,
            transparent 100%
          );
          animation: formBackgroundSlide 15s ease-in-out infinite;
          pointer-events: none;
        }
        
        @keyframes formBackgroundSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .form-header {
          margin-bottom: 2.5rem;
          text-align: left;
          animation: formHeaderEntry 1s ease-out 0.7s both;
        }
        
        @keyframes formHeaderEntry {
          0% {
            transform: translateX(30px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .form-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 0.5rem;
        }
        
        .form-subtitle {
          color: #94a3b8;
          font-size: 1rem;
          font-weight: 400;
        }
        
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          animation: formEntry 1s ease-out 0.9s both;
        }
        
        @keyframes formEntry {
          0% {
            transform: translateX(30px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .input-group {
          position: relative;
        }
        
        .input-label {
          display: block;
          color: #e2e8f0;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .form-input {
          width: 100%;
          padding: 1rem 1.25rem;
          background: rgba(15, 23, 42, 0.5);
          border: 2px solid rgba(71, 85, 105, 0.3);
          border-radius: 12px;
          color: #f8fafc;
          font-size: 1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          font-weight: 400;
        }
        
        .form-input::placeholder {
          color: #64748b;
          font-weight: 300;
        }
        
        .form-input:focus {
          border-color: #3b82f6;
          background: rgba(15, 23, 42, 0.7);
          box-shadow: 
            0 0 0 4px rgba(59, 130, 246, 0.1),
            0 8px 25px rgba(0, 0, 0, 0.15);
          transform: translateY(-1px);
        }
        
        .form-input:hover {
          border-color: rgba(71, 85, 105, 0.5);
        }

         /* Cross icon styles */
        .close-icon {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 28px;
          height: 28px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(71, 85, 105, 0.2);
          border: 1px solid rgba(71, 85, 105, 0.3);
          transition: all 0.3s ease;
          z-index: 10;
        }

         .close-icon:hover {
          background: rgba(71, 85, 105, 0.4);
          border-color: rgba(71, 85, 105, 0.5);
          transform: scale(1.1);
        }
        
        .close-icon::before,
        .close-icon::after {
          content: '';
          position: absolute;
          width: 14px;
          height: 2px;
          background: #cbd5e1;
          border-radius: 1px;
          transition: all 0.3s ease;
        }
        
        .close-icon::before {
          transform: rotate(45deg);
        }
        
        .close-icon::after {
          transform: rotate(-45deg);
        }
        
        .close-icon:hover::before,
        .close-icon:hover::after {
          background: #f8fafc;
        }
        
        .error-message {
          background: linear-gradient(135deg, 
            rgba(239, 68, 68, 0.1) 0%, 
            rgba(220, 38, 38, 0.05) 100%
          );
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 10px;
          color: #fca5a5;
          font-size: 0.875rem;
          padding: 0.875rem 1rem;
          margin-top: 0.5rem;
          backdrop-filter: blur(10px);
        }
        
        .login-button {
          background: linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          padding: 1rem 2rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          margin-top: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .login-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.2) 20%, 
            rgba(255, 255, 255, 0.3) 50%, 
            rgba(255, 255, 255, 0.2) 80%, 
            transparent 100%
          );
          transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .login-button:hover::before {
          left: 100%;
        }
        
        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 12px 30px rgba(59, 130, 246, 0.4),
            0 5px 15px rgba(0, 0, 0, 0.15);
        }
        
        .login-button:active {
          transform: translateY(-1px);
        }
        
        .signup-section {
          text-align: center;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(71, 85, 105, 0.3);
          animation: signupEntry 1s ease-out 1.1s both;
        }
        
        @keyframes signupEntry {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .signup-text {
          color: #94a3b8;
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
        }
        
        .signup-link {
          color: #3b82f6;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          position: relative;
        }
        
        .signup-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background: linear-gradient(90deg, #3b82f6, #6366f1);
          transition: width 0.3s ease;
        }
        
        .signup-link:hover::after {
          width: 100%;
        }
        
        .signup-link:hover {
          color: #60a5fa;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .login-container {
            padding: 1rem;
          }
          
          .login-split {
            flex-direction: column;
            max-width: 450px;
            min-height: auto;
          }
          
          .login-visual {
            padding: 2rem;
            min-height: 280px;
          }
          
          .visual-title {
            font-size: 2.25rem;
          }
          
          .visual-subtitle {
            font-size: 1rem;
          }
          
          .login-form-section {
            padding: 2rem;
            border-left: none;
            border-top: 1px solid rgba(71, 85, 105, 0.2);
          }
        }
        
        @media (max-width: 480px) {
          .login-container {
            padding: 0.5rem;
          }
          
          .login-visual {
            padding: 1.5rem;
          }
          
          .login-form-section {
            padding: 1.5rem;
          }
          
          .visual-title {
            font-size: 1.875rem;
          }
          
          .form-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
      
      <div className="login-container">
        <div className="login-split">
                    <div className="close-icon" onClick={() => navigate("/dashboard")}></div>
          <div className="login-visual">
            <div className="visual-content">
              <h1 className="visual-title">Resume Builder</h1>
              <p className="visual-subtitle">
                Create professional resumes that stand out from the crowd. 
                Join thousands of users who trust our platform.
              </p>
            </div>
          </div>
          
          <div className="login-form-section">
            <div className="form-header">
              <h3 className="form-title">Welcome Back</h3>
              <p className="form-subtitle">
                Please enter your details to log in
              </p>
            </div>
            
            <form className="login-form" onSubmit={handleLogin}>
              <div className="input-group">
                <label className="input-label">Email Address</label>
                <input
                  className="form-input"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  placeholder="john@example.com"
                  type="email"
                />
              </div>
              
              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  className="form-input"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  placeholder="Min 8 Characters"
                  type="password"
                />
              </div>
              
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
              
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            
            <div className="signup-section">
              <p className="signup-text">Don't have an account?</p>
              <span 
                className="signup-link"
                onClick={() => setCurrentPage("signup")}
              >
                Create Account
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;