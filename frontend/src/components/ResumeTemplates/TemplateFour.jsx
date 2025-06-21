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

const DEFAULT_THEME = ["#F5F5F5", "#E0E0E0", "#CCCCCC", "#666666", "#333333"];

const SectionTitle = ({ text, color, showUnderline = true }) => {
  return (
    <div className="mb-4">
      <h2 
        className={`text-sm font-bold uppercase tracking-wide ${showUnderline ? 'border-b-2 pb-2' : ''}`}
        style={{ 
          color: color,
          borderBottomColor: showUnderline ? color : 'transparent'
        }}
      >
        {text}
      </h2>
    </div>
  );
};

const SkillBar = ({ skill, color }) => {
  const percentage = skill.progress || 70;
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium" style={{ color: color }}>
          {skill.name}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-300"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color
          }}
        ></div>
      </div>
    </div>
  );
};

const TemplateFour = ({ resumeData, colorPalette, containerWidth }) => {
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
      className="bg-white max-w-4xl mx-auto"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : "none",
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >
      {/* Header Section */}
      <div 
        className="px-8 py-6"
        style={{ backgroundColor: themeColors[0] || '#F5F5F5' }}
      >
        <div className="flex justify-between items-start">
          <div>
            <div 
              className="text-xs uppercase tracking-wider mb-1"
              style={{ color: themeColors[4] || '#333333' }}
            >
              RESUME
            </div>
            <h1 
              className="text-2xl font-bold uppercase tracking-wide mb-1"
              style={{ color: themeColors[4] || '#333333' }}
            >
              {resumeData.profileInfo.fullName}
            </h1>
            <p 
              className="text-sm uppercase tracking-wide"
              style={{ color: themeColors[3] || '#666666' }}
            >
              {resumeData.profileInfo.designation}
            </p>
          </div>
          
          <div className="text-right text-xs space-y-1">
            <div className="flex items-center justify-end gap-2">
              <span style={{ color: themeColors[4] || '#333333' }}>E</span>
              <span style={{ color: themeColors[3] || '#666666' }}>
                {resumeData.contactInfo.email}
              </span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <span style={{ color: themeColors[4] || '#333333' }}>P</span>
              <span style={{ color: themeColors[3] || '#666666' }}>
                {resumeData.contactInfo.phone}
              </span>
            </div>
            <div className="flex items-center justify-end gap-2">
              <span style={{ color: themeColors[4] || '#333333' }}>A</span>
              <span style={{ color: themeColors[3] || '#666666' }}>
                {resumeData.contactInfo.location}
              </span>
            </div>
            {resumeData.contactInfo.website && (
              <div className="flex items-center justify-end gap-2">
                <span style={{ color: themeColors[4] || '#333333' }}>W</span>
                <span style={{ color: themeColors[3] || '#666666' }}>
                  {resumeData.contactInfo.website}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <SectionTitle 
            text="WELCOME TO MY RESUME" 
            color={themeColors[4] || '#333333'}
            showUnderline={false}
          />
        </div>

        {/* Profile Section */}
        <div className="mb-6">
          <SectionTitle 
            text="PROFILE" 
            color={themeColors[4] || '#333333'}
          />
          <p 
            className="text-xs leading-relaxed text-justify"
            style={{ color: themeColors[3] || '#666666' }}
          >
            {resumeData.profileInfo.summary}
          </p>
        </div>

        {/* Career Objective Section */}
        <div className="mb-6">
          <SectionTitle 
            text="CAREER OBJECTIVE" 
            color={themeColors[4] || '#333333'}
          />
          <p 
            className="text-xs leading-relaxed text-justify"
            style={{ color: themeColors[3] || '#666666' }}
          >
            5+ years of experience as a Creative Director. A dynamic and strategic leader known for developing and 
            executing inventive and creative brand-building experiences. Successful in devising and applying new ideas 
            and innovation to build a client's company competitive advantage.
          </p>
        </div>

        {/* Work Experience Section */}
        <div className="mb-6">
          <SectionTitle 
            text="WORK EXPERIENCE" 
            color={themeColors[4] || '#333333'}
          />
          
          {resumeData.workExperience.map((data, index) => (
            <div key={`work_${index}`} className="mb-6 flex">
              <div className="w-24 flex-shrink-0">
                <div 
                  className="text-xs font-bold mb-1"
                  style={{ color: themeColors[4] || '#333333' }}
                >
                  {formatYearMonth(data.startDate)} - {formatYearMonth(data.endDate)}
                </div>
                <div 
                  className="text-xs font-bold mb-1"
                  style={{ color: themeColors[4] || '#333333' }}
                >
                  {data.role}
                </div>
                <div 
                  className="text-xs italic"
                  style={{ color: themeColors[3] || '#666666' }}
                >
                  {data.company}
                </div>
              </div>
              
              <div className="flex-1 ml-8">
                <div 
                  className="text-xs font-bold mb-2"
                  style={{ color: themeColors[4] || '#333333' }}
                >
                  Post Graduated in Graphics Designing
                </div>
                <p 
                  className="text-xs leading-relaxed"
                  style={{ color: themeColors[3] || '#666666' }}
                >
                  {data.description.split('\n')[0] || 'Assists the department head in carrying out digital marketing companies works closely with promotions'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section - Three Columns */}
        <div className="grid grid-cols-3 gap-8">
          {/* Education Column */}
          <div>
            <SectionTitle 
              text="EDUCATION" 
              color={themeColors[4] || '#333333'}
            />
            
            {resumeData.education.map((data, index) => (
              <div key={`education_${index}`} className="mb-4 flex items-start">
                <div className="w-4 h-4 rounded-full border-2 flex-shrink-0 mt-1 mr-3"
                  style={{ borderColor: themeColors[3] || '#666666' }}
                >
                </div>
                <div>
                  <div 
                    className="text-xs font-bold"
                    style={{ color: themeColors[4] || '#333333' }}
                  >
                    {data.degree}
                  </div>
                  <div 
                    className="text-xs"
                    style={{ color: themeColors[3] || '#666666' }}
                  >
                    {formatYearMonth(data.startDate)} - {formatYearMonth(data.endDate)}
                  </div>
                  <div 
                    className="text-xs italic"
                    style={{ color: themeColors[3] || '#666666' }}
                  >
                    {data.institution}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skills Column */}
          <div>
            <SectionTitle 
              text="MY SKILLS" 
              color={themeColors[4] || '#333333'}
            />
            
            {resumeData.skills.map((skill, index) => (
              <SkillBar 
                key={`skill_${index}`} 
                skill={skill} 
                color={themeColors[4] || '#333333'}
              />
            ))}
          </div>

          {/* Reference Column */}
          <div>
            <SectionTitle 
              text="REFERENCE" 
              color={themeColors[4] || '#333333'}
            />
            
            <div className="space-y-4">
              <div>
                <div 
                  className="text-xs font-bold mb-1"
                  style={{ color: themeColors[4] || '#333333' }}
                >
                  Harper Russo
                </div>
                <div 
                  className="text-xs mb-1"
                  style={{ color: themeColors[3] || '#666666' }}
                >
                  Wardens Inc.
                </div>
                <div 
                  className="text-xs"
                  style={{ color: themeColors[3] || '#666666' }}
                >
                  123-456-7890
                </div>
              </div>
              
              <div>
                <div 
                  className="text-xs font-bold mb-1"
                  style={{ color: themeColors[4] || '#333333' }}
                >
                  Francois Mercer
                </div>
                <div 
                  className="text-xs mb-1"
                  style={{ color: themeColors[3] || '#666666' }}
                >
                  Wardens Inc.
                </div>
                <div 
                  className="text-xs"
                  style={{ color: themeColors[3] || '#666666' }}
                >
                  123-456-7890
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <div className="mt-8">
            <SectionTitle 
              text="PROJECTS" 
              color={themeColors[4] || '#333333'}
            />
            
            <div className="grid grid-cols-2 gap-6">
              {resumeData.projects.map((project, index) => (
                <div key={`project_${index}`} className="mb-4">
                  <div 
                    className="text-xs font-bold mb-1"
                    style={{ color: themeColors[4] || '#333333' }}
                  >
                    {project.title}
                  </div>
                  <p 
                    className="text-xs leading-relaxed mb-2"
                    style={{ color: themeColors[3] || '#666666' }}
                  >
                    {project.description}
                  </p>
                  {(project.github || project.liveDemo) && (
                    <div 
                      className="text-xs"
                      style={{ color: themeColors[3] || '#666666' }}
                    >
                      {project.github && (
                        <div>GitHub: {project.github}</div>
                      )}
                      {project.liveDemo && (
                        <div>Live: {project.liveDemo}</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages Section */}
        {resumeData.languages && resumeData.languages.length > 0 && (
          <div className="mt-8">
            <SectionTitle 
              text="LANGUAGES" 
              color={themeColors[4] || '#333333'}
            />
            
            <div className="grid grid-cols-3 gap-4">
              {resumeData.languages.map((lang, index) => (
                <div key={`lang_${index}`} className="text-xs">
                  <span style={{ color: themeColors[4] || '#333333' }}>
                    {lang.name}
                  </span>
                  <span style={{ color: themeColors[3] || '#666666' }}>
                    {' '}({lang.proficiency})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <div className="mt-8">
            <SectionTitle 
              text="CERTIFICATIONS" 
              color={themeColors[4] || '#333333'}
            />
            
            <div className="grid grid-cols-2 gap-6">
              {resumeData.certifications.map((cert, index) => (
                <div key={`cert_${index}`} className="mb-3">
                  <div 
                    className="text-xs font-bold"
                    style={{ color: themeColors[4] || '#333333' }}
                  >
                    {cert.title}
                  </div>
                  <div 
                    className="text-xs"
                    style={{ color: themeColors[3] || '#666666' }}
                  >
                    {cert.issuer} - {cert.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateFour;