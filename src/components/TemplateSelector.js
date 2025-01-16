import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { useState } from "react";
import CustomTemplateUpload from "./CustomTemplateUpload";

// Template preview data with base64 images
const templates = [
  {
    id: "modern",
    name: "Modern",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y1ZjVmNSIvPgo8cmVjdCB3aWR0aD0iODAlIiBoZWlnaHQ9IjEwJSIgeD0iMTAlIiB5PSIxMCUiIGZpbGw9IiMxOTc2ZDIiLz4KPHJlY3Qgd2lkdGg9IjYwJSIgaGVpZ2h0PSI1JSIgeD0iMTAlIiB5PSIyNSUiIGZpbGw9IiNjY2NjY2MiLz4KPHJlY3Qgd2lkdGg9IjgwJSIgaGVpZ2h0PSI1JSIgeD0iMTAlIiB5PSIzNSUiIGZpbGw9IiNlMGUwZTAiLz4KPHJlY3Qgd2lkdGg9IjgwJSIgaGVpZ2h0PSI1JSIgeD0iMTAlIiB5PSI0NSUiIGZpbGw9IiNlMGUwZTAiLz4KPHJlY3Qgd2lkdGg9IjgwJSIgaGVpZ2h0PSI1JSIgeD0iMTAlIiB5PSI1NSUiIGZpbGw9IiNlMGUwZTAiLz4KPC9zdmc+",
    description: "A clean and modern design with a focus on readability",
    category: "creative",
  },
  {
    id: "professional",
    name: "Professional",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZmZmZiIvPgo8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxNSUiIGZpbGw9IiMxYTIzN2UiLz4KPHJlY3Qgd2lkdGg9IjgwJSIgaGVpZ2h0PSI1JSIgeD0iMTAlIiB5PSIyMCUiIGZpbGw9IiMzMzMzMzMiLz4KPHJlY3Qgd2lkdGg9IjgwJSIgaGVpZ2h0PSI1JSIgeD0iMTAlIiB5PSIzMCUiIGZpbGw9IiM2NjY2NjYiLz4KPHJlY3Qgd2lkdGg9IjgwJSIgaGVpZ2h0PSI1JSIgeD0iMTAlIiB5PSI0MCUiIGZpbGw9IiM2NjY2NjYiLz4KPC9zdmc+",
    description: "Traditional layout perfect for corporate positions",
    category: "professional",
  },
  {
    id: "creative",
    name: "Creative",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZmZmZiIvPgo8cGF0aCBkPSJNMCwwIEwzMDAsMCBMMzAwLDE1MCBMMCw4MCBaIiBmaWxsPSIjZmY0MDgxIi8+CjxyZWN0IHdpZHRoPSI2MCUiIGhlaWdodD0iNSUiIHg9IjEwJSIgeT0iMjUlIiBmaWxsPSIjZmZmZmZmIi8+CjxyZWN0IHdpZHRoPSI4MCUiIGhlaWdodD0iNSUiIHg9IjEwJSIgeT0iMzUlIiBmaWxsPSIjMzMzMzMzIi8+CjxyZWN0IHdpZHRoPSI4MCUiIGhlaWdodD0iNSUiIHg9IjEwJSIgeT0iNDUlIiBmaWxsPSIjMzMzMzMzIi8+Cjwvc3ZnPg==",
    description: "Stand out with this creative and unique design",
    category: "creative",
  },
  {
    id: "minimal",
    name: "Minimal",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZmZmZiIvPgo8cmVjdCB3aWR0aD0iNjAlIiBoZWlnaHQ9IjUlIiB4PSIyMCUiIHk9IjEwJSIgZmlsbD0iIzMzMzMzMyIvPgo8cmVjdCB3aWR0aD0iNDAlIiBoZWlnaHQ9IjMlIiB4PSIzMCUiIHk9IjIwJSIgZmlsbD0iIzY2NjY2NiIvPgo8cmVjdCB3aWR0aD0iNjAlIiBoZWlnaHQ9IjMlIiB4PSIyMCUiIHk9IjMwJSIgZmlsbD0iIzY2NjY2NiIvPgo8cmVjdCB3aWR0aD0iNjAlIiBoZWlnaHQ9IjMlIiB4PSIyMCUiIHk9IjQwJSIgZmlsbD0iIzY2NjY2NiIvPgo8L3N2Zz4=",
    description: "Simple and elegant design that lets your content shine",
    category: "minimal",
  },
  {
    id: "executive",
    name: "Executive",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZmZmZiIvPgo8cmVjdCB3aWR0aD0iOTAlIiBoZWlnaHQ9IjIwJSIgeD0iNSUiIHk9IjUlIiBzdHJva2U9IiMyYzNlNTAiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8cmVjdCB3aWR0aD0iNzAlIiBoZWlnaHQ9IjUlIiB4PSIxNSUiIHk9IjMwJSIgZmlsbD0iIzJjM2U1MCIvPgo8cmVjdCB3aWR0aD0iNzAlIiBoZWlnaHQ9IjUlIiB4PSIxNSUiIHk9IjQwJSIgZmlsbD0iIzM0NDk1ZSIvPgo8cmVjdCB3aWR0aD0iNzAlIiBoZWlnaHQ9IjUlIiB4PSIxNSUiIHk9IjUwJSIgZmlsbD0iIzM0NDk1ZSIvPgo8L3N2Zz4=",
    description: "Sophisticated design for senior-level positions",
    category: "professional",
  },
  {
    id: "corporate",
    name: "Corporate",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZmZmZiIvPgo8cmVjdCB3aWR0aD0iNzAlIiBoZWlnaHQ9IjE1JSIgeD0iMCIgeT0iMCIgZmlsbD0iIzE0MjEzZCIvPgo8cmVjdCB3aWR0aD0iMzAlIiBoZWlnaHQ9IjE1JSIgeD0iNzAlIiB5PSIwIiBmaWxsPSIjMTQyMTNkIiBmaWxsLW9wYWNpdHk9IjAuOCIvPgo8cmVjdCB3aWR0aD0iODAlIiBoZWlnaHQ9IjUlIiB4PSIxMCUiIHk9IjI1JSIgZmlsbD0iIzY2NiIvPgo8cmVjdCB3aWR0aD0iODAlIiBoZWlnaHQ9IjUlIiB4PSIxMCUiIHk9IjM1JSIgZmlsbD0iIzY2NiIvPgo8L3N2Zz4=",
    description: "Clean and professional corporate design",
    category: "professional",
  },
  {
    id: "business",
    name: "Business",
    image:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2ZmZmZmZiIvPgo8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIyMCUiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzAwMzM2NiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxyZWN0IHdpZHRoPSI4MCUiIGhlaWdodD0iNSUiIHg9IjEwJSIgeT0iMzAlIiBmaWxsPSIjMDAzMzY2Ii8+CjxyZWN0IHdpZHRoPSI4MCUiIGhlaWdodD0iNSUiIHg9IjEwJSIgeT0iNDAlIiBmaWxsPSIjMDAzMzY2IiBmaWxsLW9wYWNpdHk9IjAuOCIvPgo8L3N2Zz4=",
    description: "Elegant business-focused layout",
    category: "professional",
  },
];

const TemplateSelector = ({ onSelect }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const categories = ["all", "professional", "creative", "minimal"];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const filteredTemplates = templates.filter(
    (template) =>
      categories[currentTab] === "all" ||
      template.category === categories[currentTab]
  );

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Choose Your Resume Template{" "}
      </Typography>{" "}
      <Typography
        variant="subtitle1"
        gutterBottom
        align="center"
        sx={{ mb: 4 }}
      >
        Select from our professionally designed templates or upload your own{" "}
      </Typography>{" "}
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        centered
        sx={{ mb: 4 }}
      >
        {" "}
        {categories.map((category) => (
          <Tab
            key={category}
            label={category.charAt(0).toUpperCase() + category.slice(1)}
          />
        ))}{" "}
      </Tabs>{" "}
      <Grid container spacing={4} justifyContent="center">
        {" "}
        {filteredTemplates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
              onClick={() => onSelect(template)}
            >
              <Box
                sx={{
                  position: "relative",
                  height: 0,
                  paddingTop: "141.4%",
                  overflow: "hidden",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <CardMedia
                  component="img"
                  image={template.image}
                  alt={template.name}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    padding: 2,
                    backgroundColor: "#ffffff",
                  }}
                />{" "}
              </Box>{" "}
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="h2"
                  sx={{ fontWeight: "bold" }}
                >
                  {" "}
                  {template.name}{" "}
                </Typography>{" "}
                <Typography variant="body2" color="text.secondary">
                  {" "}
                  {template.description}{" "}
                </Typography>{" "}
              </CardContent>{" "}
            </Card>{" "}
          </Grid>
        ))}{" "}
      </Grid>{" "}
      <Divider sx={{ my: 6 }} />{" "}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Upload Your Own Template{" "}
        </Typography>{" "}
        <CustomTemplateUpload onSelect={onSelect} />{" "}
      </Box>{" "}
    </Box>
  );
};

export default TemplateSelector;
