import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline } from "@mui/material";
import "./App.css";

// Components
import TemplateSelector from "./components/TemplateSelector";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" className="App">
        {" "}
        {!selectedTemplate ? (
          <TemplateSelector onSelect={setSelectedTemplate} />
        ) : (
          <div style={{ display: "flex", gap: "2rem", padding: "2rem 0" }}>
            <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />{" "}
            <ResumePreview
              template={selectedTemplate}
              resumeData={resumeData}
            />{" "}
          </div>
        )}{" "}
      </Container>{" "}
    </ThemeProvider>
  );
}

export default App;
