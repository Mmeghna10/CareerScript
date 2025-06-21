import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateResumeForm = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  //Handle Create Resume
  const handleCreateResume = async(e) => {
    e.preventDefault();

    if(!title){
      setError("Please enter resume title");
      return;
    }

    setError("");
    setIsLoading(true);

    //Create resume api
    try{
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, {
        title,
      });

      if(response.data?._id){
        navigate(`/resume/${response.data?._id}`)
      }

    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. please try again");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4'> 
      <div className="w-full max-w-md bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-8 rounded-2xl shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h3 className='text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent mb-3'>
            Create New Resume
          </h3>
          <p className='text-sm text-gray-400 leading-relaxed'>
            Give your resume a title to get started. You can edit all details later
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleCreateResume} className="space-y-6">
          <div>
            <Input 
              value={title}
              onChange={({target}) => setTitle(target.value)}
              label="Resume Title"
              placeholder="e.g. Arpita Resume"
              type="text"
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 backdrop-blur-sm">
              <p className='text-red-400 text-sm font-medium flex items-center gap-2'>
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                {error}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type='submit' 
            disabled={isLoading}
            className='w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating Resume...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Resume
              </>
            )}
          </button>
        </form>

        {/* Footer Section */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Start building your professional resume today
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateResumeForm