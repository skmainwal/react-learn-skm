import { forwardRef } from "react";
import { Box, Typography, Divider } from "@mui/material";

const ProfessionalTemplate = forwardRef(({ resumeData }, ref) => {
  const { personalInfo, education, experience, skills, projects } = resumeData;

  return (
    <Box
      ref={ref}
      sx={{
        p: 4,
        maxWidth: "800px",
        margin: "0 auto",
        bgcolor: "#ffffff",
        color: "#333333",
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#1a237e", fontWeight: "bold" }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", gap: 2, color: "#555" }}>
          <Typography variant="body2">{personalInfo.email}</Typography>
          <Typography variant="body2">|</Typography>
          <Typography variant="body2">{personalInfo.phone}</Typography>
          <Typography variant="body2">|</Typography>
          <Typography variant="body2">{personalInfo.address}</Typography>
        </Box>
      </Box>

      {/* Summary */}
      {personalInfo.summary && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#1a237e", fontWeight: "bold" }}
          >
            PROFESSIONAL SUMMARY
          </Typography>
          <Divider sx={{ mb: 1.5 }} />
          <Typography variant="body1">{personalInfo.summary}</Typography>
        </Box>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#1a237e", fontWeight: "bold" }}
          >
            PROFESSIONAL EXPERIENCE
          </Typography>
          <Divider sx={{ mb: 1.5 }} />
          {experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {exp.position}
                </Typography>
                <Typography variant="body2">{exp.duration}</Typography>
              </Box>
              <Typography
                variant="subtitle2"
                sx={{ color: "#555", fontWeight: "bold", mb: 0.5 }}
              >
                {exp.company}
              </Typography>
              <Typography variant="body2">{exp.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#1a237e", fontWeight: "bold" }}
          >
            EDUCATION
          </Typography>
          <Divider sx={{ mb: 1.5 }} />
          {education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {edu.degree}
                </Typography>
                <Typography variant="body2">{edu.year}</Typography>
              </Box>
              <Typography
                variant="subtitle2"
                sx={{ color: "#555", fontWeight: "bold", mb: 0.5 }}
              >
                {edu.school}
              </Typography>
              <Typography variant="body2">{edu.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#1a237e", fontWeight: "bold" }}
          >
            SKILLS
          </Typography>
          <Divider sx={{ mb: 1.5 }} />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {skills.map((skill, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  bgcolor: "#e8eaf6",
                  color: "#1a237e",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 0.5,
                  border: "1px solid #1a237e",
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
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#1a237e", fontWeight: "bold" }}
          >
            PROJECTS
          </Typography>
          <Divider sx={{ mb: 1.5 }} />
          {projects.map((project, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {project.name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                {project.description}
              </Typography>
              <Typography variant="body2" sx={{ color: "#555" }}>
                <strong>Technologies:</strong> {project.technologies}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
});

export default ProfessionalTemplate;
