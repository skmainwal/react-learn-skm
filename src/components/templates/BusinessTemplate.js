import { forwardRef } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";

const BusinessTemplate = forwardRef(({ resumeData }, ref) => {
  const { personalInfo, education, experience, skills, projects } = resumeData;

  return (
    <Box
      ref={ref}
      sx={{
        p: 4,
        maxWidth: "800px",
        margin: "0 auto",
        bgcolor: "#ffffff",
        color: "#2b2b2b",
      }}
    >
      {/* Header with border bottom */}
      <Box sx={{ borderBottom: "3px solid #003366", pb: 2, mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            color: "#003366",
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {personalInfo.firstName} {personalInfo.lastName}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={8}>
            <Typography variant="body1" sx={{ color: "#666" }}>
              {personalInfo.summary}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
              <Typography variant="body2">{personalInfo.email}</Typography>
              <Typography variant="body2">{personalInfo.phone}</Typography>
              <Typography variant="body2">{personalInfo.address}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Experience Section */}
      {experience.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              color: "#003366",
              fontWeight: 600,
              borderBottom: "2px solid #003366",
              pb: 1,
              mb: 3,
            }}
          >
            PROFESSIONAL EXPERIENCE
          </Typography>
          {experience.map((exp, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    {exp.duration}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {exp.position}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#003366", mb: 1 }}
                  >
                    {exp.company}
                  </Typography>
                  <Typography variant="body2">{exp.description}</Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              color: "#003366",
              fontWeight: 600,
              borderBottom: "2px solid #003366",
              pb: 1,
              mb: 3,
            }}
          >
            EDUCATION
          </Typography>
          {education.map((edu, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    {edu.year}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {edu.degree}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#003366", mb: 1 }}
                  >
                    {edu.school}
                  </Typography>
                  <Typography variant="body2">{edu.description}</Typography>
                </Grid>
              </Grid>
            </Box>
          ))}
        </Box>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              color: "#003366",
              fontWeight: 600,
              borderBottom: "2px solid #003366",
              pb: 1,
              mb: 3,
            }}
          >
            SKILLS & EXPERTISE
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            {skills.map((skill, index) => (
              <Box
                key={index}
                sx={{
                  bgcolor: "#f8f9fa",
                  border: "1px solid #003366",
                  px: 2,
                  py: 0.75,
                  borderRadius: 0,
                  fontSize: "0.9rem",
                }}
              >
                {skill}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              color: "#003366",
              fontWeight: 600,
              borderBottom: "2px solid #003366",
              pb: 1,
              mb: 3,
            }}
          >
            NOTABLE PROJECTS
          </Typography>
          {projects.map((project, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {project.name}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                {project.description}
              </Typography>
              <Typography variant="body2" sx={{ color: "#003366" }}>
                Technologies: {project.technologies}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
});

export default BusinessTemplate;
