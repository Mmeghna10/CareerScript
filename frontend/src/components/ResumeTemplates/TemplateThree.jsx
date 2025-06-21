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

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];

const SectionHeader = ({ text, bgColor }) => {
  return (
    <div className="mb-4">
      <div 
        className="text-white text-center py-2 px-4 font-bold text-sm uppercase tracking-wide"
        style={{ backgroundColor: bgColor }}
      >
        {text}
      </div>
    </div>
  );
};

const TemplateThree = ({ resumeData, colorPalette, containerWidth }) => {
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
      className="p-8 bg-white max-w-4xl mx-auto"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-2" style={{ color: themeColors[3] }}>
          {resumeData.profileInfo.fullName}
        </h1>
        <p className="text-base mb-6" style={{ color: themeColors[4] }}>
          {resumeData.profileInfo.designation}
        </p>
        
        {/* Contact Info - Horizontal Layout with dots */}
        <div className="flex justify-center items-center flex-wrap text-sm" style={{ color: themeColors[4] }}>
          <span className="inline-flex items-center gap-1">
            <LuPhone className="text-xs" />
            {resumeData.contactInfo.phone}
          </span>
          
          <span className="mx-3" style={{ color: themeColors[4] }}>•</span>
          
          <span className="inline-flex items-center gap-1">
            <LuMapPinHouse className="text-xs" />
            {resumeData.contactInfo.location}
          </span>
          
          <span className="mx-3" style={{ color: themeColors[4] }}>•</span>
          
          <span className="inline-flex items-center gap-1">
            <LuRss className="text-xs" />
            {resumeData.contactInfo.website}
          </span>
          
          <span className="mx-3" style={{ color: themeColors[4] }}>•</span>
          
          <span className="inline-flex items-center gap-1">
            <LuMail className="text-xs" />
            {resumeData.contactInfo.email}
          </span>
        </div>
      </div>

      {/* About Me Section */}
      <div className="mb-8">
        <SectionHeader text="About Me" bgColor={themeColors[3]} />
        <p className="text-sm leading-relaxed text-justify" style={{ color: themeColors[4] }}>
          {resumeData.profileInfo.summary}
        </p>
      </div>

      {/* Work Experience Section */}
      <div className="mb-8">
        <SectionHeader text="Work Experience" bgColor={themeColors[3]} />
        
        {resumeData.workExperience.map((data, index) => (
          <div key={`work_${index}`} className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-sm font-bold" style={{ color: themeColors[3] }}>
                  {data.company} - {data.role}
                </h3>
              </div>
              <div className="text-sm font-bold" style={{ color: themeColors[3] }}>
                {formatYearMonth(data.startDate).toUpperCase()}-{data.endDate === 'Present' ? 'NOW' : formatYearMonth(data.endDate).toUpperCase()}
              </div>
            </div>
            
            <p className="text-sm mb-3 text-justify leading-relaxed" style={{ color: themeColors[4] }}>
              {data.description.split('\n')[0]}
            </p>
            
            <ul className="text-sm space-y-1">
              {data.description.split('\n').slice(1).filter(point => point.trim()).map((point, pointIndex) => (
                <li key={pointIndex} className="flex items-start">
                  <span className="mr-2 mt-1" style={{ color: themeColors[3] }}>•</span>
                  <span className="leading-relaxed" style={{ color: themeColors[4] }}>{point.trim()}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education Section */}
      <div className="mb-8">
        <SectionHeader text="Education" bgColor={themeColors[3]} />
        
        {resumeData.education.map((data, index) => (
          <div key={`education_${index}`} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold" style={{ color: themeColors[3] }}>
                  {data.institution}
                </h3>
                <p className="text-sm" style={{ color: themeColors[4] }}>{data.degree}</p>
              </div>
              <div className="text-sm font-bold" style={{ color: themeColors[3] }}>
                {formatYearMonth(data.startDate).toUpperCase()}-{formatYearMonth(data.endDate).toUpperCase()}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Skills Section */}
      <div className="mb-8">
        <SectionHeader text="Skills" bgColor={themeColors[3]} />
        
        <div className="grid grid-cols-3 gap-x-8 gap-y-2">
          {resumeData.skills.map((skill, index) => (
            <div key={`skill_${index}`} className="text-sm" style={{ color: themeColors[4] }}>
              • {skill.name}
            </div>
          ))}
        </div>
      </div>

      {/* Projects Section */}
      {resumeData.projects && resumeData.projects.length > 0 && (
        <div className="mb-8">
          <SectionHeader text="Projects" bgColor={themeColors[3]} />
          
          {resumeData.projects.map((project, index) => (
            <div key={`project_${index}`} className="mb-4">
              <h3 className="text-sm font-bold mb-1" style={{ color: themeColors[3] }}>
                {project.title}
              </h3>
              <p className="text-sm text-justify leading-relaxed mb-2" style={{ color: themeColors[4] }}>
                {project.description}
              </p>
              {(project.github || project.liveDemo) && (
                <div className="text-sm" style={{ color: themeColors[4] }}>
                  {project.github && (
                    <span className="mr-4">GitHub: {project.github}</span>
                  )}
                  {project.liveDemo && (
                    <span>Live Demo: {project.liveDemo}</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications Section */}
      {resumeData.certifications && resumeData.certifications.length > 0 && (
        <div className="mb-8">
          <SectionHeader text="Certifications" bgColor={themeColors[3]} />
          
          {resumeData.certifications.map((cert, index) => (
            <div key={`cert_${index}`} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold" style={{ color: themeColors[3] }}>
                    {cert.title}
                  </h3>
                  <p className="text-sm" style={{ color: themeColors[4] }}>{cert.issuer}</p>
                </div>
                <div className="text-sm font-bold" style={{ color: themeColors[3] }}>
                  {cert.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Languages Section */}
      {resumeData.languages && resumeData.languages.length > 0 && (
        <div className="mb-8">
          <SectionHeader text="Languages" bgColor={themeColors[3]} />
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {resumeData.languages.map((lang, index) => (
              <div key={`lang_${index}`} className="text-sm" style={{ color: themeColors[4] }}>
                • {lang.name} ({lang.proficiency})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interests Section */}
      {resumeData.interests && resumeData.interests.length > 0 && resumeData.interests[0] != "" && (
        <div className="mb-6">
          <SectionHeader text="Interests" bgColor={themeColors[3]} />
          
          <div className="grid grid-cols-3 gap-x-8 gap-y-2">
            {resumeData.interests.filter(interest => interest).map((interest, index) => (
              <div key={`interest_${index}`} className="text-sm" style={{ color: themeColors[4] }}>
                • {interest}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateThree;