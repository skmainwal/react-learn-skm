import { forwardRef } from "react";
import { Box, Typography, Divider } from "@mui/material";

const ModernTemplate = forwardRef(({ resumeData }, ref) => {
  const { personalInfo, education, experience, skills, projects } = resumeData;

  return (
    <Box ref={ref} sx={{ p: 4, maxWidth: "800px", margin: "0 auto" }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          {personalInfo.firstName} {personalInfo.lastName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {personalInfo.email} • {personalInfo.phone}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {personalInfo.address}
        </Typography>
      </Box>

      {/* Summary */}
      {personalInfo.summary && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "primary.main" }}>
            Professional Summary
          </Typography>
          <Typography variant="body1">{personalInfo.summary}</Typography>
        </Box>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "primary.main" }}>
            Professional Experience
          </Typography>
          {experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {exp.position}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {exp.company} | {exp.duration}
              </Typography>
              <Typography variant="body2">{exp.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "primary.main" }}>
            Education
          </Typography>
          {education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {edu.degree}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                {edu.school} | {edu.year}
              </Typography>
              <Typography variant="body2">{edu.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "primary.main" }}>
            Skills
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {skills.map((skill, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  bgcolor: "primary.light",
                  color: "white",
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                {skill}
              </Typography>
            ))}
          </Box>
        </Box>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "primary.main" }}>
            Projects
          </Typography>
          {projects.map((project, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {project.name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {project.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Technologies: {project.technologies}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
});

export default ModernTemplate;
