import { forwardRef } from "react";
import { Box, Typography, Grid } from "@mui/material";

const CustomTemplate = forwardRef(({ resumeData, backgroundImage }, ref) => {
  const { personalInfo, education, experience, skills, projects } = resumeData;

  return (
    <Box
      ref={ref}
      sx={{
        p: 4,
        maxWidth: "800px",
        margin: "0 auto",
        position: "relative",
        minHeight: "1131px", // A4 height ratio
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.1,
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h3" gutterBottom>
            {personalInfo.firstName} {personalInfo.lastName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {personalInfo.email} • {personalInfo.phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {personalInfo.address}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {/* Summary */}
            {personalInfo.summary && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Professional Summary
                </Typography>
                <Typography variant="body1">{personalInfo.summary}</Typography>
              </Box>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Professional Experience
                </Typography>
                {experience.map((exp, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
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

            {/* Projects */}
            {projects.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Projects
                </Typography>
                {projects.map((project, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {project.name}
                    </Typography>
                    <Typography variant="body2">
                      {project.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Technologies: {project.technologies}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Education */}
            {education.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Education
                </Typography>
                {education.map((edu, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
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
                <Typography variant="h6" gutterBottom>
                  Skills
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {skills.map((skill, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      sx={{
                        bgcolor: "rgba(0, 0, 0, 0.05)",
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});

export default CustomTemplate;
