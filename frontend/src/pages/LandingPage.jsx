// src/pages/LandingPage.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HERO_IMG from '../assets/hero-img.png';
import Signup from './Auth/SignUp';
import Login from './Auth/Login';
import Modal from '../components/Modal.jsx';
import { UserContext } from '../context/userContext.jsx';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard.jsx';

const LandingPage = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');

  // If someone logs in during the modal, automatically close & go to /dashboard
  useEffect(() => {
    if (user && openAuthModal) {
      setOpenAuthModal(false);
      navigate('/dashboard');
    }
  }, [user, openAuthModal, navigate]);

  // While your UserContext is still fetching (loading), show a spinner
  if (loading) {
    return (
      <div className="h-screen bg-slate-900 flex items-center justify-center">
        <span className="text-white text-lg">Loading…</span>
      </div>
    );
  }

  const handleCTA = () => {
    if (!user) {
      setCurrentPage('login');
      setOpenAuthModal(true);
    } else {
      // <-- here: send logged-in users to /dashboard, not to "/"
      navigate('/dashboard');
    }
  };

  return (
 <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-10 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-to-br from-green-500/20 to-teal-600/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>   
       <div className="container mx-auto px-6 py-8 relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-20">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent animate-pulse">
            CareerScript
          </div>
          
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button 
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/25"
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Sign Up
            </button>
          )}
        </header>
  {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight text-white">
                Build Your
                <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
                  Perfect Resume
                </span>
                <span className="text-gray-300 text-4xl lg:text-5xl">In Minutes</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                Create stunning, professional resumes with our AI-powered builder. 
                Stand out from the crowd with modern templates and smart formatting.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                onClick={handleCTA}
              >
                Start Building Now
              </button>
          
            </div>
            
            {/* Stats */}
            <div className="flex gap-6 pt-8">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 px-6 py-4 rounded-xl">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">50K+</div>
                <div className="text-gray-400 text-sm">Resumes Created</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 px-6 py-4 rounded-xl">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">95%</div>
                <div className="text-gray-400 text-sm">Success Rate</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 px-6 py-4 rounded-xl">
                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">24/7</div>
                <div className="text-gray-400 text-sm">Support</div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700/50">
                <img src={HERO_IMG} alt="Hero Img" className="w-full rounded-lg" />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full opacity-80 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-60 animate-bounce" style={{ animationDuration: '2s' }}></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Why Choose <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">CareerScript</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Our advanced features help you create resumes that get noticed by employers and ATS systems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-200">
                Smart Editing
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Update your resume sections with live preview and intelligent suggestions that adapt to your content
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors duration-200">
                Premium Templates
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Choose from modern, professional templates that are ATS-friendly and recruiter-approved
              </p>
            </div>
            
            <div className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors duration-200">
                Instant Export
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Download high-quality PDFs instantly, or share your resume link with potential employers
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-20 relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              Ready to Land Your <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">Dream Job?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Join thousands of professionals who've successfully landed interviews with resumes built on our platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                onClick={handleCTA}
              >
                Create Your Resume Now
              </button>
              
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent mb-4 md:mb-0">
              M
            </div>
            <div className="text-gray-400 text-center">
              © 2025 CareerScript. Crafted with 💜 for your career success.
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage('login');
        }}
        hideHeader
      >
        <div className="p-6">
          {currentPage === 'login' ? (
            <Login
              setCurrentPage={setCurrentPage}
              onCloseModal={() => setOpenAuthModal(false)}
            />
          ) : (
            <Signup
              setCurrentPage={setCurrentPage}
              onCloseModal={() => setOpenAuthModal(false)}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LandingPage;
