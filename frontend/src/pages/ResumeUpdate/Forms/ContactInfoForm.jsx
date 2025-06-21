import React from "react";
import Input from "../../../components/Inputs/Input";

const ContactInfoForm = ({ contactInfo, updateSection }) => {
  return (
    <div className="px-5 pt-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent mb-8">
        Contact Information
      </h2>

      <div className="mt-6">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:transform hover:scale-[1.02]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <Input
                label="Address"
                placeholder="Short Address"
                type="text"
                value={contactInfo.location || ""}
                onChange={({ target }) => updateSection("location", target.value)}
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
              />
            </div>
            
            <Input
              label="Email"
              placeholder="john@example.com"
              type="email"
              value={contactInfo.email || ""}
              onChange={({ target }) => updateSection("email", target.value)}
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
            />

            <Input
              label="Phone Number"
              placeholder="2512512511"
              type="text"
              value={contactInfo.phone || ""}
              onChange={({ target }) => updateSection("phone", target.value)}
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
            />

            <Input
              label="LinkedIn"
              placeholder="https://linkedin.com/in/username"
              type="text"
              value={contactInfo.linkedin || ""}
              onChange={({ target }) => updateSection("linkedin", target.value)}
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
            />

            <Input
              label="Github"
              placeholder="https://github.com/username"
              type="text"
              value={contactInfo.github || ""}
              onChange={({ target }) => updateSection("github", target.value)}
              className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
            />

            <div className="md:col-span-2">
              <Input
                label="Portfolio / Website"
                placeholder="https://yourWebsite.com"
                type="text"
                value={contactInfo.website || ""}
                onChange={({ target }) => updateSection("website", target.value)}
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoForm;