import { useRef } from "react";
import { Box, Button, Paper } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import ModernTemplate from "./templates/ModernTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import ExecutiveTemplate from "./templates/ExecutiveTemplate";
import CorporateTemplate from "./templates/CorporateTemplate";
import BusinessTemplate from "./templates/BusinessTemplate";
import CustomTemplate from "./templates/CustomTemplate";

const ResumePreview = ({ template, resumeData }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getTemplate = () => {
    if (template.isCustom) {
      return (
        <CustomTemplate
          ref={componentRef}
          resumeData={resumeData}
          backgroundImage={template.image}
        />
      );
    }
    switch (template.id) {
      case "modern":
        return <ModernTemplate ref={componentRef} resumeData={resumeData} />;
      case "professional":
        return (
          <ProfessionalTemplate ref={componentRef} resumeData={resumeData} />
        );
      case "creative":
        return <CreativeTemplate ref={componentRef} resumeData={resumeData} />;
      case "minimal":
        return <MinimalTemplate ref={componentRef} resumeData={resumeData} />;
      case "executive":
        return <ExecutiveTemplate ref={componentRef} resumeData={resumeData} />;
      case "corporate":
        return <CorporateTemplate ref={componentRef} resumeData={resumeData} />;
      case "business":
        return <BusinessTemplate ref={componentRef} resumeData={resumeData} />;
      default:
        return <ModernTemplate ref={componentRef} resumeData={resumeData} />;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrint}
        sx={{ mb: 2 }}
      >
        Download PDF{" "}
      </Button>{" "}
      <Paper
        sx={{
          width: "100%",
          height: "calc(100vh - 200px)",
          overflow: "auto",
          p: 3,
        }}
      >
        {" "}
        {getTemplate()}{" "}
      </Paper>{" "}
    </Box>
  );
};

export default ResumePreview;
