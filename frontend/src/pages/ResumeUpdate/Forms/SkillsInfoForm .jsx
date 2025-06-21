import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import RatingInput from "../../../components/ResumeSections/RatingInput";

const SkillsInfoForm = ({
  skillsInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent mb-8">
        Skills
      </h2>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></span>
          Technical Skills
        </h3>
        <div className="flex flex-col gap-4">
          {skillsInfo.map((skill, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl relative hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Skill Name"
                  placeholder="JavaScript"
                  type="text"
                  value={skill.name || ""}
                  onChange={({ target }) =>
                    updateArrayItem(index, "name", target.value)
                  }
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl transition-all duration-200"
                />

                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-300 block mb-3">
                    Proficiency ({skill.progress / 20 || 0}/5)
                  </label>
                  <div className="mt-2">
                    <RatingInput
                      value={skill.progress || 0}
                      total={5}
                      onChange={(newValue) =>
                        updateArrayItem(index, "progress", newValue)
                      }
                      activeColor="#10b981"
                      inactiveColor="#374151"
                    />
                  </div>
                </div>
              </div>
              
              {skillsInfo.length > 1 && (
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
            className="self-start flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-emerald-500/25"
            onClick={() => {
              addArrayItem({
                name: "",
                progress: 0,
              });
            }}
          >
            <LuPlus className="w-4 h-4" />
            Add Skill
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsInfoForm;