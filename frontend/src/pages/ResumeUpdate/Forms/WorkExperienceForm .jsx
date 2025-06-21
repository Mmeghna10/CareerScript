import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const WorkExperienceForm = ({
  workExperience,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent mb-8">
        Work Experience
      </h2>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
          Professional Experience
        </h3>
        <div className="flex flex-col gap-4">
          {workExperience.map((experince, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl relative hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Company"
                  placeholder="ABC Corp"
                  type="text"
                  value={experince.company || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "company", target.value)
                  }
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl transition-all duration-200"
                />

                <Input
                  label="Role"
                  placeholder="Frontend Developer"
                  type="text"
                  value={experince.role || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "role", target.value)
                  }
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl transition-all duration-200"
                />

                <Input
                  label="Start Date"
                  type="month"
                  value={experince.startDate || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "startDate", target.value)
                  }
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl transition-all duration-200"
                />

                <Input
                  label="End Date"
                  type="month"
                  value={experince.endDate || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "endDate", target.value)
                  }
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl transition-all duration-200"
                />
              </div>
              
              <div className="mt-6">
                <label className="text-sm font-medium text-gray-300 block mb-3">
                  Description
                </label>
                <textarea
                  placeholder="What did you do in this role?"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl transition-all duration-200 resize-none focus:outline-none"
                  rows={3}
                  value={experince.description || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "description", target.value)
                  }
                />
              </div>
              
              {workExperience.length > 1 && (
                <button
                  type="button"
                  className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full transition-all duration-200 group"
                  onClick={() => removeArrayItem(index)}
                >
                  <LuTrash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="self-start flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            onClick={() => {
              addArrayItem({
                company: "",
                role: "",
                startDate: "",
                endDate: "",
                description: "",
              });
            }}
          >
            <LuPlus className="w-4 h-4" />
            Add Work Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceForm;