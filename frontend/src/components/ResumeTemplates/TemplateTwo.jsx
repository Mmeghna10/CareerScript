/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react";
import {
  LuMapPinHouse,
  LuMail,
  LuPhone,
  LuGithub,
  LuRss,
  LuUser,
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri";
import ContactInfo from "../ResumeSections/ContactInfo";
import EducationInfo from "../ResumeSections/EducationInfo";
import { formatYearMonth } from "../../utils/helper";
import LanguageSection from "../ResumeSections/LanguageSection";
import WorkExperience from "../ResumeSections/WorkExperience";
import ProjectInfo from "../ResumeSections/ProjectInfo";
import SkillSection from "../ResumeSections/SkillSection";
import CertificationInfo from "../ResumeSections/CertificationInfo";

const DEFAULT_THEME = ["#000000", "#333333", "#F5F5F5", "#666666", "#999999"];

const Title = ({ text, color }) => {
  return (
    <div className="mb-3">
      <h2 
        className="text-sm font-bold uppercase tracking-wide border-b-2 pb-1"
        style={{ 
          color: color,
          borderBottomColor: color 
        }}
      >
        {text}
      </h2>
    </div>
  );
};

const ContactItem = ({ icon, value, color }) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="text-sm" style={{ color: color }}>
        {icon}
      </div>
      <span className="text-xs" style={{ color: color }}>{value}</span>
    </div>
  );
};

const TemplateTwo = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(800);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setBaseWidth(actualBaseWidth);
    setScale(containerWidth / baseWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-6 bg-white"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      {/* Header Section */}
      <div className="mb-6">
        <h1 
          className="text-3xl font-bold uppercase tracking-wide"
          style={{ color: themeColors[3] || themeColors[0] }}
        >
          {resumeData.profileInfo.fullName}
        </h1>
        <p 
          className="text-sm mt-1"
          style={{ color: themeColors[4] || themeColors[1] }}
        >
          {resumeData.profileInfo.designation}
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-4">
          {/* Contact Section */}
          <div className="mb-6">
            <Title text="Contact" color={themeColors[3] || themeColors[0]} />
            <div className="space-y-1">
              <ContactItem
                icon={<LuPhone />}
                value={resumeData.contactInfo.phone}
                color={themeColors[4] || themeColors[1]}
              />
              <ContactItem
                icon={<LuMail />}
                value={resumeData.contactInfo.email}
                color={themeColors[4] || themeColors[1]}
              />
              <ContactItem
                icon={<LuMapPinHouse />}
                value={resumeData.contactInfo.location}
                color={themeColors[4] || themeColors[1]}
              />
              <ContactItem
                icon={<LuRss />}
                value={resumeData.contactInfo.website}
                color={themeColors[4] || themeColors[1]}
              />
              {resumeData.contactInfo.linkedin && (
                <ContactItem
                  icon={<RiLinkedinLine />}
                  value={resumeData.contactInfo.linkedin}
                  color={themeColors[4] || themeColors[1]}
                />
              )}
              {resumeData.contactInfo.github && (
                <ContactItem
                  icon={<LuGithub />}
                  value={resumeData.contactInfo.github}
                  color={themeColors[4] || themeColors[1]}
                />
              )}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-6">
            <Title text="Education" color={themeColors[3] || themeColors[0]} />
            {resumeData.education.map((data, index) => (
              <div key={`education_${index}`} className="mb-3">
                <div 
                  className="text-xs font-bold"
                  style={{ color: themeColors[3] || themeColors[0] }}
                >
                  {formatYearMonth(data.startDate)} - {formatYearMonth(data.endDate)}
                </div>
                <div 
                  className="text-xs font-semibold mt-1"
                  style={{ color: themeColors[3] || themeColors[0] }}
                >
                  {data.institution}
                </div>
                <div 
                  className="text-xs"
                  style={{ color: themeColors[4] || themeColors[1] }}
                >
                  {data.degree}
                </div>
              </div>
            ))}
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <Title text="Skills" color={themeColors[3] || themeColors[0]} />
            <div className="space-y-1">
              {resumeData.skills.map((skill, index) => (
                <div 
                  key={`skill_${index}`} 
                  className="text-xs flex items-center"
                >
                  <span 
                    className="mr-2"
                    style={{ color: themeColors[3] || themeColors[0] }}
                  >
                    •
                  </span>
                  <span style={{ color: themeColors[4] || themeColors[1] }}>
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Section */}
          <div className="mb-6">
            <Title text="Languages" color={themeColors[3] || themeColors[0]} />
            <div className="space-y-1">
              {resumeData.languages.map((lang, index) => (
                <div 
                  key={`lang_${index}`} 
                  className="text-xs flex items-center"
                >
                  <span 
                    className="mr-2"
                    style={{ color: themeColors[3] || themeColors[0] }}
                  >
                    •
                  </span>
                  <span style={{ color: themeColors[4] || themeColors[1] }}>
                    {lang.name} ({lang.proficiency})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-8">
          {/* Profile Section */}
          <div className="mb-6">
            <Title text="Profile" color={themeColors[3] || themeColors[0]} />
            <p 
              className="text-xs leading-relaxed"
              style={{ color: themeColors[4] || themeColors[1] }}
            >
              {resumeData.profileInfo.summary}
            </p>
          </div>

          {/* Work Experience Section */}
          <div className="mb-6">
            <Title text="Work Experience" color={themeColors[3] || themeColors[0]} />
            {resumeData.workExperience.map((data, index) => (
              <div key={`work_${index}`} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div 
                      className="text-xs font-bold"
                      style={{ color: themeColors[3] || themeColors[0] }}
                    >
                      {data.company}
                    </div>
                    <div 
                      className="text-xs"
                      style={{ color: themeColors[4] || themeColors[1] }}
                    >
                      {data.role}
                    </div>
                  </div>
                  <div 
                    className="text-xs text-right font-bold"
                    style={{ color: themeColors[3] || themeColors[0] }}
                  >
                    {formatYearMonth(data.startDate)} - {formatYearMonth(data.endDate)}
                  </div>
                </div>
                <div className="text-xs mt-2">
                  {data.description.split('\n').map((point, pointIndex) => (
                    <div key={pointIndex} className="mb-1 flex items-start">
                      <span 
                        className="mr-2 mt-0.5"
                        style={{ color: themeColors[3] || themeColors[0] }}
                      >
                        •
                      </span>
                      <span style={{ color: themeColors[4] || themeColors[1] }}>
                        {point.trim()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Projects Section */}
          <div className="mb-6">
            <Title text="Projects" color={themeColors[3] || themeColors[0]} />
            {resumeData.projects.map((project, index) => (
              <div key={`project_${index}`} className="mb-3">
                <div 
                  className="text-xs font-bold"
                  style={{ color: themeColors[3] || themeColors[0] }}
                >
                  {project.title}
                </div>
                <div 
                  className="text-xs mt-1"
                  style={{ color: themeColors[4] || themeColors[1] }}
                >
                  {project.description}
                </div>
                {(project.github || project.liveDemo) && (
                  <div 
                    className="text-xs mt-1"
                    style={{ color: themeColors[4] || themeColors[1] }}
                  >
                    {project.github && (
                      <span className="mr-4">
                        <span style={{ color: themeColors[3] || themeColors[0] }}>GitHub:</span> {project.github}
                      </span>
                    )}
                    {project.liveDemo && (
                      <span>
                        <span style={{ color: themeColors[3] || themeColors[0] }}>Live:</span> {project.liveDemo}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Certifications Section */}
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <div className="mb-6">
              <Title text="Certifications" color={themeColors[3] || themeColors[0]} />
              {resumeData.certifications.map((cert, index) => (
                <div key={`cert_${index}`} className="mb-2">
                  <div 
                    className="text-xs font-bold"
                    style={{ color: themeColors[3] || themeColors[0] }}
                  >
                    {cert.title}
                  </div>
                  <div 
                    className="text-xs"
                    style={{ color: themeColors[4] || themeColors[1] }}
                  >
                    {cert.issuer} - {cert.year}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Interests Section */}
          {resumeData.interests.length > 0 && resumeData.interests[0] != "" && (
            <div className="mb-6">
              <Title text="Interests" color={themeColors[3] || themeColors[0]} />
              <div 
                className="text-xs"
                style={{ color: themeColors[4] || themeColors[1] }}
              >
                {resumeData.interests.filter(interest => interest).join(", ")}
              </div>
            </div>
          )}

          {/* Reference Section */}
          <div>
            <Title text="Reference" color={themeColors[3] || themeColors[0]} />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div 
                  className="text-xs font-bold"
                  style={{ color: themeColors[3] || themeColors[0] }}
                >
                  Estelle Darcy
                </div>
                <div 
                  className="text-xs"
                  style={{ color: themeColors[4] || themeColors[1] }}
                >
                  Wardens Inc. / CTO
                </div>
                <div 
                  className="text-xs"
                  style={{ color: themeColors[4] || themeColors[1] }}
                >
                  Phone: 123-456-7890
                </div>
                <div 
                  className="text-xs"
                  style={{ color: themeColors[4] || themeColors[1] }}
                >
                  Email: hello@reallygreatsite.com
                </div>
              </div>
              <div>
                <div 
                  className="text-xs font-bold"
                  style={{ color: themeColors[3] || themeColors[0] }}
                >
                  Harper Richard
                </div>
                <div 
                  className="text-xs"
                  style={{ color: themeColors[4] || themeColors[1] }}
                >
                  Wardens Inc. / CEO
                </div>
                <div 
                  className="text-xs"
                  style={{ color: themeColors[4] || themeColors[1] }}
                >
                  Phone: 123-456-7890
                </div>
                <div 
                  className="text-xs"
                  style={{ color: themeColors[4] || themeColors[1] }}
                >
                  Email: hello@reallygreatsite.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateTwo;