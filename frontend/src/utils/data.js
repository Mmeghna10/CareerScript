import TEMPLATE_ONE_IMG from '../assets/template-one.jpg'
import TEMPLATE_TWO_IMG from '../assets/template-two.png'
import TEMPLATE_THREE_IMG from '../assets/template-three.png'
import TEMPLATE_FOUR_IMG from '../assets/template-four.png'

export const resumeTemplates = [
    {
        id: '01',
        thumbnailImg: TEMPLATE_ONE_IMG,
        colorPaletteCode: 'themeOne'
    },
    {
          id: '02',
        thumbnailImg: TEMPLATE_TWO_IMG,
        colorPaletteCode: 'themeTwo'
    },
    {
          id: '03',
        thumbnailImg: TEMPLATE_THREE_IMG,
        colorPaletteCode: 'themeThree'
    },
    {
          id: '04',
        thumbnailImg: TEMPLATE_FOUR_IMG,
        colorPaletteCode: 'themeFour'
    },
]

export const themeColorPalette = {
  themeOne: [
    // Row 1
    ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],
    
    // Row 2
    ["#E9FBF8", "#B4EFF7", "#93E2DA", "#2AC9A0", "#3D4C5A"],
    ["#F5F4FF", "#E0DBFF", "#C9C2F8", "#8579D1", "#4B4B5C"],
    ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#445361"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#5A5A5A"],
    ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#7F9CF5", "#2D3748"],
    
    // Row 3
    ["#F4FFFD", "#D3F2F2", "#B0E9D4", "#34C79D", "#384C48"],
    ["#FFF7F0", "#FFE6D9", "#FFD2BA", "#FF9561", "#4C4743"],
    ["#F9FCFF", "#E3F0F9", "#C0DDEE", "#6CA6CF", "#464545"],
    ["#FFFDf6", "#FFF4D7", "#FFE7A0", "#FFD000", "#57534E"],
    ["#FFFCFF", "#C8F0FF", "#99E0FF", "#007BA7", "#2B3A42"],
    
    // Row 4 (Neutrals)
    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#4A4A4A", "#222222"],
    ["#E3F2FD", "#90CAF9", "#A8D2F4", "#1E88E5", "#0D47A1"],
  ]
};

export const DUMMY_RESUME_DATA = {
    profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "John Doe",
        designation: "Senior Software Engineer",
        summary: 
        "Passionate and results-driven developer with 6+ years of experiemce"
    },
    contactInfo:{
        email: "john.doe@gmail.com",
        phone: "+1234567890",
        location: "123 usa dalhoise. India",
        linkedin: "https://linkedin.com/meghna",
        github: "https://github.com/meghna",
        website: "https://meghs.com/"
    },
     workExperience: [
                {
                    company: "StartUp",
                    role: "Junior Web dev",
                    startDate: "2012-16",
                    endDate: "2016-02",
                    description:"Built responsive designs for startups and bussiness",
                },
                {
                    company: "Full Stack Developer",
                    role: "Senio Web dev",
                    startDate: "2024-25",
                    endDate: "2025-02",
                    description:"Built responsive designs for startups and bussiness",
                },
                {
                    company: "Nvidea",
                    role: "Graphic dev",
                    startDate: "2019-16",
                    endDate: "2022-02",
                    description:"Built responsive designs for startups and bussiness",
                },
            ],
            education: [
                {
                    degree: "B-tech",
                    institution: "ABES-IT",
                    startDate: "2007-06",
                    endDate: "2011-06",
                },
                {
                    degree: "M-tech",
                    institution: "ABES-IT",
                    startDate: "2007-06",
                    endDate: "2011-06",
                },
            ],
            skills: [
                {name: "HTML",progress: 85},
                {name: "CSS",progress: 95},
                {name: "JS",progress: 85},
                {name: "Gsap",progress: 75},
                {name: "MONGODB",progress: 65},
                {name: "TypeScript",progress: 85},
            ],
            projects: [
                {
                    title: "Travel App",
                    description: "A task and team management app built with Mern stack",
                    github: "https://github.com/meghna/Travel",
                    liveDemo: "https://github.com/meghnaDemo/Travel",
                },
                {
                    title: "Video App",
                    description: "A task and team management app built with NextJS",
                    github: "https://github.com/meghna/Travel",
                    liveDemo: "https://github.com/meghnaDemo/Travel",
                },
                {
                    title: "Blog App",
                    description: "A task and team management app built with HTML, CSS, PHP, JS",
                    github: "https://github.com/meghna/Travel",
                    liveDemo: "https://github.com/meghnaDemo/Travel",
                },
            ],
            certifications: [
                {
                    title: "FULL STACK DEELOPER",
                    issue: "APNA COLLEGE",
                    year: "2012",
                },
                {
                    title: "JAVA WITH DSSA",
                    issue: "CODECAMP",
                    year: "2014",
                },
                {
                    title: "JAVASCRIPT PRACTICE",
                    issue: "EDURREKA",
                    year: "2011",
                },
            ],
            languages: [
            {name: "English", progress: 100 },
            {name: "Hindi", progress: 100 },
            {name: "Arabic", progress: 100 },
            ],
            interests: ["Reading", "Badminton", "Chess"],
};