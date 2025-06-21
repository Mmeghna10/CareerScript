import React from "react";
import Input from "../../../components/Inputs/Input";
import { LuPlus, LuTrash2 } from "react-icons/lu";

const ProjectDetailForm = ({
  projectInfo,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent mb-8">
        Projects
      </h2>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></span>
          Portfolio Projects
        </h3>
        <div className="flex flex-col gap-4">
          {projectInfo.map((project, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl relative hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <Input
                    label="Project Title"
                    placeholder="Portfolio Website"
                    type="text"
                    value={project.title || ""}
                    onChange={({ target }) =>
                      updateArrayItem(index, "title", target.value)
                    }
                    className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl transition-all duration-200"
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-300 block mb-3">
                    Description
                  </label>
                  <textarea
                    placeholder="Short description about the project"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl transition-all duration-200 resize-none focus:outline-none"
                    rows={3}
                    value={project.description || ""}
                    onChange={({ target }) =>
                      updateArrayItem(index, "description", target.value)
                    }
                  />
                </div>

                <Input
                  label="Github Link"
                  placeholder="https://github.com/username"
                  type="url"
                  value={project.github || ""}
                  onChange={({ target }) => updateArrayItem(index, "github", target.value)}
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl transition-all duration-200"
                />

                <Input
                  label="Live Demo URL"
                  placeholder="https://yourproject.live"
                  type="url"
                  value={project.liveDemo || ""}
                  onChange={({ target }) => updateArrayItem(index, "liveDemo", target.value)}
                  className="bg-gray-800/50 border-gray-600/50 text-white placeholder-gray-400 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl transition-all duration-200"
                />
              </div>

              {projectInfo.length > 1 && (
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
            className="self-start flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold hover:from-orange-700 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
            onClick={() => {
              addArrayItem({
                title: "",
                description: "",
                github: "",
                liveDemo: "",
              });
            }}
          >
            <LuPlus className="w-4 h-4" />
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailForm;