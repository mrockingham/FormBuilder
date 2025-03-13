import { Box, Button, Card, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  fetchForms,
  deleteForm,
} from "../../services/controllers/formController";
import { useNavigate } from "react-router-dom";
import useBuilderStore from "../../stores/designBuilderStore";
import useFormStore from "../../stores/formStore";
import { IoFilterOutline } from "react-icons/io5";
import { FaSortAlphaDown } from "react-icons/fa";
import { BsList, BsViewList } from "react-icons/bs";

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

  console.log("Forms", forms);
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
    navigate(`/builder/edit/${form.id}`);
  };

  console.log("Forms", forms);
  return (
    <div>
      <Box display={"flex"} gap={2} mt={1}>
        <Box>
          <IoFilterOutline />
          {"filter "}
        </Box>
        <Box>
          <FaSortAlphaDown />
          Sort
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Box display={"flex"} gap={1}>
            <BsList />
            <BsViewList />
          </Box>
          List
        </Box>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        flexGrow={1}
        // bgcolor={"lightblue"}
        // style={{
        //   backgroundColor: "", // Replace with your actual CSS variable or color code
        //   backgroundImage: `url(./diagonal-lines.svg)`,
        // }}
      >
        <Box
          display={"flex"}
          mt={2}
          gap={4}
          padding={4}
          height={"180px"}
          width={"400px"}
        >
          {forms?.map(
            (form: { id: number; title: string; form_data: string }) => (
              <Card
                key={form.id}
                sx={{
                  // border: "1px solid black",

                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  width: "100%",
                  backgroundColor: "#ECF4E6",
                  border: "1px solid lightgray",
                  boxShadow: "0 0 8px gray",
                  "&:hover": {
                    backgroundColor: "#C6E2B5", // change background color on hover
                    boxShadow: "0 0 12px gray", // change box shadow on hover
                    cursor: "pointer", // add cursor pointer on hover
                  },
                }}
              >
                <Box ml={2} mt={1} style={{ fontWeight: "bold" }}>
                  {form.title}
                </Box>
                <Box
                  ml={1}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"flex-start"}
                  gap={1}
                >
                  <div>ID:</div>
                  <div>Event:</div>
                  <div>Questions:</div>
                </Box>
                <Box mb={2} display={"flex"} justifyContent={"center"}>
                  <Button
                    onClick={() => handleSelectForm(form)}
                    variant="contained"
                  >
                    Edit Form
                  </Button>
                  {/* <Button
                    onClick={() => deleteForm(form?.id)}
                    variant="contained"
                    color="error"
                    >
                    Delete Form
                    </Button> */}
                </Box>
              </Card>
            )
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ViewAllForms;
