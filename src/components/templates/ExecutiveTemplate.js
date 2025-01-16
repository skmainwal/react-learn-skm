import { forwardRef } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";

const ExecutiveTemplate = forwardRef(({ resumeData }, ref) => {
  const { personalInfo, education, experience, skills, projects } = resumeData;

  return (
    <Box
      ref={ref}
      sx={{
        p: 4,
        maxWidth: "800px",
        margin: "0 auto",
        bgcolor: "#ffffff",
        color: "#2c3e50",
        position: "relative",
      }}
    >
      {/* Header with elegant border */}
      <Box
        sx={{
          borderBottom: "2px solid #2c3e50",
          borderTop: "2px solid #2c3e50",
          py: 3,
          px: 4,
          mb: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            letterSpacing: 2,
            color: "#2c3e50",
            textTransform: "uppercase",
          }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ mt: 1, letterSpacing: 1, color: "#34495e" }}
        >
          {personalInfo.email} • {personalInfo.phone}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#34495e" }}>
          {personalInfo.address}
        </Typography>
      </Box>

      {/* Summary */}
      {personalInfo.summary && (
        <Box sx={{ mb: 4, px: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 2,
              color: "#2c3e50",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Executive Summary
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontStyle: "italic",
              color: "#34495e",
              lineHeight: 1.6,
            }}
          >
            {personalInfo.summary}
          </Typography>
        </Box>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          {/* Experience */}
          {experience.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: "#2c3e50",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Professional Experience
              </Typography>
              {experience.map((exp, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#2c3e50" }}
                  >
                    {exp.position}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "#34495e", mb: 1 }}
                  >
                    {exp.company}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#7f8c8d", mb: 1, fontStyle: "italic" }}
                  >
                    {exp.duration}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#34495e" }}>
                    {exp.description}
                  </Typography>
                  {index < experience.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
              ))}
            </Box>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: "#2c3e50",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Key Projects
              </Typography>
              {projects.map((project, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#2c3e50" }}
                  >
                    {project.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: "#34495e" }}>
                    {project.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#7f8c8d", fontStyle: "italic" }}
                  >
                    Technologies: {project.technologies}
                  </Typography>
                  {index < projects.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
              ))}
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={5}>
          {/* Education */}
          {education.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: "#2c3e50",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Education
              </Typography>
              {education.map((edu, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#2c3e50" }}
                  >
                    {edu.degree}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "#34495e" }}
                  >
                    {edu.school}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#7f8c8d", fontStyle: "italic", mb: 1 }}
                  >
                    {edu.year}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#34495e" }}>
                    {edu.description}
                  </Typography>
                  {index < education.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
              ))}
            </Box>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  mb: 3,
                  color: "#2c3e50",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Core Competencies
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
                {skills.map((skill, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      color: "#2c3e50",
                      border: "1px solid #2c3e50",
                      px: 2,
                      py: 0.5,
                      borderRadius: 0,
                      fontWeight: "500",
                      textTransform: "uppercase",
                      fontSize: "0.75rem",
                      letterSpacing: 0.5,
                    }}
                  >
                    {skill}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
});

export default ExecutiveTemplate;
