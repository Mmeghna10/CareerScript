import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";
import RatingInput from "../../../components/ResumeSections/RatingInput";

const AdditionalInfoForm = ({
  languages,
  interests,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent mb-8">
        Additional Info
      </h2>

      {/* Language Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></span>
          Languages
        </h3>
        <div className="flex flex-col gap-4">
          {languages?.map((lang, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl relative hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Language"
                  placeholder="e.g English"
                  type="text"
                  value={lang?.name || ""}
                  onChange={({ target }) =>
                    updateArrayItem("languages", index, "name", target.value)
                  }
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
                />

                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-3">
                    Proficiency
                  </label>
                  <RatingInput
                    value={lang?.progress || 0}
                    onChange={(value) =>
                      updateArrayItem("languages", index, "progress", value)
                    }
                    total={5}
                    activeColor="#3b82f6"
                    inactiveColor="#374151"
                  />
                </div>
              </div>
              {languages.length > 1 && (
                <button
                  type="button"
                  className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full transition-all duration-200 group"
                  onClick={() => removeArrayItem("languages", index)}
                >
                  <LuTrash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="self-start flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            onClick={() => addArrayItem("languages", { name: "", progress: 0 })}
          >
            <LuPlus className="w-4 h-4" />
            Add Language
          </button>
        </div>
      </div>

      {console.log(interests)}

      {/* Interests Section */}
      <div className="mt-12 mb-8">
        <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></span>
          Interests
        </h3>
        <div className="flex flex-col gap-4">
          {interests?.map((interest, index) => (
            <div 
              key={index} 
              className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-4 rounded-2xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <Input
                placeholder="e.g Reading, Photography, Traveling"
                value={interest || ""}
                onChange={({ target }) =>
                  updateArrayItem("interests", index, null, target.value)
                }
                className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20 rounded-xl transition-all duration-200 pr-12"
              />
              {interests.length > 1 && (
                <button
                  type="button"
                  className="absolute top-9 right-5 p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full transition-all duration-200 group"
                  onClick={() => removeArrayItem("interests", index)}
                >
                  <LuTrash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            className="self-start flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-green-500/25"
            onClick={() => addArrayItem("interests", "")}
          >
            <LuPlus className="w-4 h-4" />
            Add Interest
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;