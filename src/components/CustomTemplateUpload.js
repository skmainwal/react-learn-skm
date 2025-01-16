import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomTemplateUpload = ({ onSelect }) => {
  const [customTemplates, setCustomTemplates] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleTemplateUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newTemplate = {
          id: `custom-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ""),
          image: e.target.result,
          description: "Custom uploaded template",
          isCustom: true,
        };
        setCustomTemplates((prev) => [...prev, newTemplate]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setOpenDialog(true);
  };

  const handleConfirmSelection = () => {
    if (selectedTemplate) {
      onSelect(selectedTemplate);
    }
    setOpenDialog(false);
  };

  const handleDeleteTemplate = (templateId) => {
    setCustomTemplates((prev) =>
      prev.filter((template) => template.id !== templateId)
    );
  };

  return (
    <Box>
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="template-upload"
          type="file"
          onChange={handleTemplateUpload}
        />{" "}
        <label htmlFor="template-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
            sx={{ mb: 2 }}
          >
            Upload Custom Template{" "}
          </Button>{" "}
        </label>{" "}
        <Typography variant="body2" color="text.secondary">
          Upload your own template design(Supported formats: PNG, JPG, JPEG){" "}
        </Typography>{" "}
      </Box>{" "}
      {customTemplates.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {" "}
          {customTemplates.map((template) => (
            <Paper
              key={template.id}
              sx={{
                width: 250,
                p: 2,
                position: "relative",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  transition: "transform 0.2s",
                },
              }}
              onClick={() => handleTemplateSelect(template)}
            >
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  bgcolor: "rgba(255,255,255,0.8)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTemplate(template.id);
                }}
              >
                <DeleteIcon />
              </IconButton>{" "}
              <Box
                component="img"
                src={template.image}
                alt={template.name}
                sx={{
                  width: "100%",
                  height: 300,
                  objectFit: "contain",
                  mb: 1,
                }}
              />{" "}
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {" "}
                {template.name}{" "}
              </Typography>{" "}
              <Typography variant="body2" color="text.secondary">
                Custom Template{" "}
              </Typography>{" "}
            </Paper>
          ))}{" "}
        </Box>
      )}{" "}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle> Use Custom Template </DialogTitle>{" "}
        <DialogContent>
          <Typography>
            Would you like to use this custom template for your resume ?
          </Typography>{" "}
        </DialogContent>{" "}
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}> Cancel </Button>{" "}
          <Button onClick={handleConfirmSelection} variant="contained">
            Use Template{" "}
          </Button>{" "}
        </DialogActions>{" "}
      </Dialog>{" "}
    </Box>
  );
};

export default CustomTemplateUpload;
