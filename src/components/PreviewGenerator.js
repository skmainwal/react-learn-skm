import { useEffect } from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import html2canvas from "html2canvas";

const sampleData = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, City, State 12345",
    summary:
      "Experienced professional with a track record of success in project management and team leadership.",
  },
  education: [
    {
      school: "University of Technology",
      degree: "Bachelor of Science in Computer Science",
      year: "2018-2022",
      description:
        "Major in Software Engineering, Minor in Business Administration",
    },
  ],
  experience: [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Software Developer",
      duration: "2020 - Present",
      description:
        "Led development team in creating enterprise-level applications. Implemented CI/CD pipelines and improved code quality.",
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "Python", "AWS"],
  projects: [
    {
      name: "E-commerce Platform",
      description:
        "Developed a full-stack e-commerce platform with React and Node.js",
      technologies: "React, Node.js, MongoDB, AWS",
    },
  ],
};

const PreviewGenerator = () => {
  const generatePreview = async (TemplateComponent, filename) => {
    const element = document.createElement("div");
    element.style.width = "800px";
    element.style.position = "absolute";
    element.style.left = "-9999px";
    document.body.appendChild(element);

    const template = <TemplateComponent resumeData={sampleData} />;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const image = canvas.toDataURL("image/png");

      // Save the image
      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error("Error generating preview:", error);
    }

    document.body.removeChild(element);
  };

  useEffect(() => {
    const templates = [
      { component: ModernTemplate, name: "modern-preview" },
      { component: ProfessionalTemplate, name: "professional-preview" },
      { component: CreativeTemplate, name: "creative-preview" },
      { component: MinimalTemplate, name: "minimal-preview" },
      { component: ExecutiveTemplate, name: "executive-preview" },
    ];

    const generatePreviews = async () => {
      for (const template of templates) {
        await generatePreview(template.component, template.name);
      }
    };

    generatePreviews();
  }, []);

  return null;
};

export default PreviewGenerator;
