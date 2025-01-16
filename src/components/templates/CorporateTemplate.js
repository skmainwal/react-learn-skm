import { forwardRef } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";

const CorporateTemplate = forwardRef(({ resumeData }, ref) => {
  const { personalInfo, education, experience, skills, projects } = resumeData;

  return (
    <Box
      ref={ref}
      sx={{
        p: 4,
        maxWidth: "800px",
        margin: "0 auto",
        bgcolor: "#ffffff",
        color: "#333",
      }}
    >
      {/* Header */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={8}>
          <Typography variant="h3" sx={{ color: "#14213d", fontWeight: 600 }}>
            {personalInfo.firstName} {personalInfo.lastName}
          </Typography>
          <Typography variant="h6" sx={{ color: "#14213d", opacity: 0.8 }}>
            Professional Summary
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {personalInfo.summary}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ textAlign: "right" }}>
            <Typography variant="body1">{personalInfo.email}</Typography>
            <Typography variant="body1">{personalInfo.phone}</Typography>
            <Typography variant="body1">{personalInfo.address}</Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3, borderColor: "#14213d" }} />

      {/* Experience */}
      {experience.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ color: "#14213d", mb: 2, fontWeight: 600 }}
          >
            Professional Experience
          </Typography>
          {experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Grid item xs={8}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {exp.position}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "#14213d" }}>
                    {exp.company}
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right" }}>
                  <Typography variant="subtitle2" sx={{ color: "#666" }}>
                    {exp.duration}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {exp.description}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ color: "#14213d", mb: 2, fontWeight: 600 }}
          >
            Education
          </Typography>
          {education.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Grid item xs={8}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: "#14213d" }}>
                    {edu.school}
                  </Typography>
                </Grid>
                <Grid item xs={4} sx={{ textAlign: "right" }}>
                  <Typography variant="subtitle2" sx={{ color: "#666" }}>
                    {edu.year}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {edu.description}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{ color: "#14213d", mb: 2, fontWeight: 600 }}
          >
            Technical Skills
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {skills.map((skill, index) => (
              <Typography
                key={index}
                sx={{
                  bgcolor: "#f8f9fa",
                  border: "1px solid #14213d",
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: "0.9rem",
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
          <Typography
            variant="h5"
            sx={{ color: "#14213d", mb: 2, fontWeight: 600 }}
          >
            Key Projects
          </Typography>
          {projects.map((project, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {project.name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {project.description}
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                Technologies: {project.technologies}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
});

export default CorporateTemplate;
