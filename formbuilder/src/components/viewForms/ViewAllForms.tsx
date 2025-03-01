import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { fetchForms } from "../../services/controllers/formController";
import { useNavigate } from "react-router-dom";
import useBuilderStore from "../../stores/designBuilderStore";
import useFormStore from "../../stores/formStore";

const ViewAllForms = () => {
  const [forms, setForms] = useState<any>([]);

  const { setCurrentForm } = useFormStore();
  const { setElements } = useBuilderStore();

  const navigate = useNavigate();

  useEffect(() => {
    const getForms = async () => {
      try {
        const response = await fetchForms();
        setForms(response);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    getForms();
  }, []);

  const handleSelectForm = (form: any) => {
    console.log("Selected form", form);
    setCurrentForm(form.name);

    // First parse attempt
    let parsedData;
    try {
      parsedData = JSON.parse(form.form_data);
    } catch (error) {
      console.error("Error parsing form_data:", error);
      return;
    }

    // Check if the result is still a string.
    if (typeof parsedData === "string") {
      try {
        parsedData = JSON.parse(parsedData);
      } catch (error) {
        console.error("Error parsing form_data a second time:", error);
        return;
      }
    }

    console.log("Parsed form_data", parsedData);
    console.log("Type of parsedData:", typeof parsedData); // should be 'object'
    console.log("Is Array:", Array.isArray(parsedData)); // should be true

    setElements(parsedData);
    // Optionally, navigate to the form builder page:
    navigate(`/builder/${form.id}`);
  };

  console.log("Forms", forms);
  return (
    <div>
      {" "}
      <Box
        display={"flex"}
        flexDirection={"column"}
        flexGrow={1}
        bgcolor={"lightblue"}
        // style={{
        //   backgroundColor: "", // Replace with your actual CSS variable or color code
        //   backgroundImage: `url(./diagonal-lines.svg)`,
        // }}
      >
        <Box display={"flex"} mt={6} gap={4} padding={4}>
          {forms?.map(
            (form: {
              id: React.Key | null | undefined;
              name: string;
              form_data: string;
            }) => (
              <div key={form.id}>
                <div style={{ fontWeight: "bold" }}>{form.title}</div>
                <Button
                  onClick={() => handleSelectForm(form)}
                  variant="contained"
                >
                  Edit Form
                </Button>
              </div>
            )
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ViewAllForms;
