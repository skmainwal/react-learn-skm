import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const ResumeForm = ({ resumeData, setResumeData }) => {
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const addSection = (section) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [
        ...prev[section],
        section === "education"
          ? { school: "", degree: "", year: "", description: "" }
          : section === "experience"
          ? { company: "", position: "", duration: "", description: "" }
          : section === "projects"
          ? { name: "", description: "", technologies: "" }
          : "",
      ],
    }));
  };

  const removeSection = (section, index) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  return (
    <Box component={Paper} sx={{ p: 3, width: "100%", maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Personal Information{" "}
      </Typography>{" "}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={resumeData.personalInfo.firstName}
          onChange={handlePersonalInfoChange}
        />{" "}
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={resumeData.personalInfo.lastName}
          onChange={handlePersonalInfoChange}
        />{" "}
      </Box>{" "}
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={resumeData.personalInfo.email}
        onChange={handlePersonalInfoChange}
        sx={{ mb: 2 }}
      />{" "}
      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={resumeData.personalInfo.phone}
        onChange={handlePersonalInfoChange}
        sx={{ mb: 2 }}
      />{" "}
      <TextField
        fullWidth
        label="Address"
        name="address"
        value={resumeData.personalInfo.address}
        onChange={handlePersonalInfoChange}
        sx={{ mb: 2 }}
      />{" "}
      <TextField
        fullWidth
        label="Professional Summary"
        name="summary"
        multiline
        rows={4}
        value={resumeData.personalInfo.summary}
        onChange={handlePersonalInfoChange}
        sx={{ mb: 3 }}
      />{" "}
      <Divider sx={{ my: 3 }} /> {/* Education Section */}{" "}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Education{" "}
          <IconButton color="primary" onClick={() => addSection("education")}>
            <AddIcon />
          </IconButton>{" "}
        </Typography>{" "}
        {resumeData.education.map((edu, index) => (
          <Box key={index} sx={{ mb: 2, position: "relative" }}>
            <IconButton
              size="small"
              sx={{ position: "absolute", right: 0, top: 0 }}
              onClick={() => removeSection("education", index)}
            >
              <DeleteIcon />
            </IconButton>{" "}
            <TextField
              fullWidth
              label="School"
              value={edu.school}
              onChange={(e) =>
                handleArrayChange("education", index, "school", e.target.value)
              }
              sx={{ mb: 1 }}
            />{" "}
            <TextField
              fullWidth
              label="Degree"
              value={edu.degree}
              onChange={(e) =>
                handleArrayChange("education", index, "degree", e.target.value)
              }
              sx={{ mb: 1 }}
            />{" "}
            <TextField
              fullWidth
              label="Year"
              value={edu.year}
              onChange={(e) =>
                handleArrayChange("education", index, "year", e.target.value)
              }
              sx={{ mb: 1 }}
            />{" "}
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={2}
              value={edu.description}
              onChange={(e) =>
                handleArrayChange(
                  "education",
                  index,
                  "description",
                  e.target.value
                )
              }
            />{" "}
          </Box>
        ))}{" "}
      </Box>{" "}
      <Divider sx={{ my: 3 }} /> {/* Experience Section */}{" "}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Experience{" "}
          <IconButton color="primary" onClick={() => addSection("experience")}>
            <AddIcon />
          </IconButton>{" "}
        </Typography>{" "}
        {resumeData.experience.map((exp, index) => (
          <Box key={index} sx={{ mb: 2, position: "relative" }}>
            <IconButton
              size="small"
              sx={{ position: "absolute", right: 0, top: 0 }}
              onClick={() => removeSection("experience", index)}
            >
              <DeleteIcon />
            </IconButton>{" "}
            <TextField
              fullWidth
              label="Company"
              value={exp.company}
              onChange={(e) =>
                handleArrayChange(
                  "experience",
                  index,
                  "company",
                  e.target.value
                )
              }
              sx={{ mb: 1 }}
            />{" "}
            <TextField
              fullWidth
              label="Position"
              value={exp.position}
              onChange={(e) =>
                handleArrayChange(
                  "experience",
                  index,
                  "position",
                  e.target.value
                )
              }
              sx={{ mb: 1 }}
            />{" "}
            <TextField
              fullWidth
              label="Duration"
              value={exp.duration}
              onChange={(e) =>
                handleArrayChange(
                  "experience",
                  index,
                  "duration",
                  e.target.value
                )
              }
              sx={{ mb: 1 }}
            />{" "}
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={exp.description}
              onChange={(e) =>
                handleArrayChange(
                  "experience",
                  index,
                  "description",
                  e.target.value
                )
              }
            />{" "}
          </Box>
        ))}{" "}
      </Box>{" "}
      <Divider sx={{ my: 3 }} /> {/* Skills Section */}{" "}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Skills{" "}
          <IconButton color="primary" onClick={() => addSection("skills")}>
            <AddIcon />
          </IconButton>{" "}
        </Typography>{" "}
        {resumeData.skills.map((skill, index) => (
          <Box key={index} sx={{ mb: 2, position: "relative" }}>
            <IconButton
              size="small"
              sx={{ position: "absolute", right: 0, top: 0 }}
              onClick={() => removeSection("skills", index)}
            >
              <DeleteIcon />
            </IconButton>{" "}
            <TextField
              fullWidth
              label="Skill"
              value={skill}
              onChange={(e) =>
                handleArrayChange("skills", index, "", e.target.value)
              }
            />{" "}
          </Box>
        ))}{" "}
      </Box>{" "}
      <Divider sx={{ my: 3 }} /> {/* Projects Section */}{" "}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Projects{" "}
          <IconButton color="primary" onClick={() => addSection("projects")}>
            <AddIcon />
          </IconButton>{" "}
        </Typography>{" "}
        {resumeData.projects.map((project, index) => (
          <Box key={index} sx={{ mb: 2, position: "relative" }}>
            <IconButton
              size="small"
              sx={{ position: "absolute", right: 0, top: 0 }}
              onClick={() => removeSection("projects", index)}
            >
              <DeleteIcon />
            </IconButton>{" "}
            <TextField
              fullWidth
              label="Project Name"
              value={project.name}
              onChange={(e) =>
                handleArrayChange("projects", index, "name", e.target.value)
              }
              sx={{ mb: 1 }}
            />{" "}
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={2}
              value={project.description}
              onChange={(e) =>
                handleArrayChange(
                  "projects",
                  index,
                  "description",
                  e.target.value
                )
              }
              sx={{ mb: 1 }}
            />{" "}
            <TextField
              fullWidth
              label="Technologies Used"
              value={project.technologies}
              onChange={(e) =>
                handleArrayChange(
                  "projects",
                  index,
                  "technologies",
                  e.target.value
                )
              }
            />{" "}
          </Box>
        ))}{" "}
      </Box>{" "}
    </Box>
  );
};

export default ResumeForm;
