/* eslint-disable no-unused-vars */
import React from 'react'
import ProfilePhotoSelector from '../../../components/Inputs/ProfilePhotoSelector'
import Input from '../../../components/Inputs/Input'

const ProfileInfoForm = ({profileData, updateSection}) => {
  return (
    <div className="px-5 pt-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent mb-8">
        Person Information
      </h2>

      <div className="mt-6">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:transform hover:scale-[1.02]">
          <ProfilePhotoSelector
            image={profileData?.profileImg || profileData.profilePreview}
            setImage={(value) => updateSection("profileImg", value)}
            preview={profileData?.profilePreview}
            setPreview={(value) => updateSection("profilePreviewUrl", value)}
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:transform hover:scale-[1.02]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              value={profileData.fullName || ""}
              onChange={({target}) => updateSection("fullName", target.value)}
              label="Full Name"
              placeholder="John"
              type="text"
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
            />

            <Input 
              value={profileData.designation || ""}
              onChange={({target}) => updateSection("designation", target.value)}
              label="Designation"
              placeholder="UI Designer"
              type="text"
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
            />
                     
            <div className="col-span-2 mt-3">
              <label className="text-sm font-medium text-gray-300 block mb-3">
                Summary
              </label>
              <textarea
                placeholder="Short Introduction"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200 resize-none focus:outline-none"
                rows={4}
                value={profileData.summary || ""}
                onChange={({target}) => updateSection("summary", target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfoForm