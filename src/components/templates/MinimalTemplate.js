import { forwardRef } from "react";
import { Box, Typography, Divider } from "@mui/material";

const MinimalTemplate = forwardRef(({ resumeData }, ref) => {
  const { personalInfo, education, experience, skills, projects } = resumeData;

  return (
    <Box
      ref={ref}
      sx={{
        p: 4,
        maxWidth: "800px",
        margin: "0 auto",
        bgcolor: "#ffffff",
        fontFamily: "'Helvetica Neue', sans-serif",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 5, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 300, letterSpacing: 1, mb: 2 }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </Typography>
        <Typography variant="body1" sx={{ color: "#666" }}>
          {personalInfo.email} • {personalInfo.phone}
        </Typography>
        <Typography variant="body1" sx={{ color: "#666" }}>
          {personalInfo.address}
        </Typography>
      </Box>

      {/* Summary */}
      {personalInfo.summary && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            {personalInfo.summary}
          </Typography>
        </Box>
      )}

      <Divider sx={{ mb: 5 }} />

      {/* Experience */}
      {experience.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 300, letterSpacing: 1, mb: 3 }}
          >
            Experience
          </Typography>
          {experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {exp.position}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                {exp.company} • {exp.duration}
              </Typography>
              <Typography variant="body2">{exp.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 300, letterSpacing: 1, mb: 3 }}
          >
            Education
          </Typography>
          {education.map((edu, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {edu.degree}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666", mb: 1 }}>
                {edu.school} • {edu.year}
              </Typography>
              <Typography variant="body2">{edu.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 300, letterSpacing: 1, mb: 3 }}
          >
            Skills
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "center",
            }}
          >
            {skills.map((skill, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  px: 2,
                  py: 0.5,
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  color: "#666",
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
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 300, letterSpacing: 1, mb: 3 }}
          >
            Projects
          </Typography>
          {projects.map((project, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {project.name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {project.description}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                {project.technologies}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
});

export default MinimalTemplate;
