import { forwardRef } from "react";
import { Box, Typography, Grid } from "@mui/material";

const CreativeTemplate = forwardRef(({ resumeData }, ref) => {
  const { personalInfo, education, experience, skills, projects } = resumeData;

  return (
    <Box
      ref={ref}
      sx={{
        p: 4,
        maxWidth: "800px",
        margin: "0 auto",
        bgcolor: "#ffffff",
        position: "relative",
      }}
    >
      {/* Decorative Element */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "200px",
          bgcolor: "#ff4081",
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <Grid container spacing={3} sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Grid item xs={12} sx={{ color: "white", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {personalInfo.firstName}
            <br />
            {personalInfo.lastName}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">{personalInfo.email}</Typography>
            <Typography variant="body1">{personalInfo.phone}</Typography>
            <Typography variant="body1">{personalInfo.address}</Typography>
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Summary */}
          {personalInfo.summary && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#ff4081",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                About Me
              </Typography>
              <Typography variant="body1">{personalInfo.summary}</Typography>
            </Box>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#ff4081",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                Experience
              </Typography>
              {experience.map((exp, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {exp.position}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#ff4081", mb: 1 }}
                  >
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
              <Typography
                variant="h5"
                sx={{
                  color: "#ff4081",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                Projects
              </Typography>
              {projects.map((project, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {project.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {project.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#ff4081", fontStyle: "italic" }}
                  >
                    {project.technologies}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Education */}
          {education.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#ff4081",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                Education
              </Typography>
              {education.map((edu, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: "#ff4081" }}>
                    {edu.school}
                  </Typography>
                  <Typography variant="body2">{edu.year}</Typography>
                  <Typography variant="body2">{edu.description}</Typography>
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
                  color: "#ff4081",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {skills.map((skill, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      bgcolor: "rgba(255, 64, 129, 0.1)",
                      color: "#ff4081",
                      px: 2,
                      py: 0.5,
                      borderRadius: "20px",
                      border: "2px solid #ff4081",
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

export default CreativeTemplate;
