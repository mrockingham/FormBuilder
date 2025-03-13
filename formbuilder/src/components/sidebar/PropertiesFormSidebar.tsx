// src/components/PropertiesFormSidebar.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import useBuilderStore from "../../stores/designBuilderStore";
import { FormElements } from "../FormElements";
import {
  addQuestion,
  getQuestions,
} from "../../services/controllers/questionController"; // adjust path if needed
import { useNavigate } from "react-router-dom";

const PropertiesFormSidebar: React.FC = () => {
  const { selectedElement, setSelectedElement } = useBuilderStore();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | string>(
    ""
  );

  // Fetch available questions once on mount
  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const qs = await getQuestions();
        setQuestions(qs);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchAllQuestions();
  }, []);

  if (!selectedElement) return null;

  const PropertiesForm =
    FormElements[selectedElement.type]?.propertiesComponent;

  // When a question is selected from the dropdown,
  // find it and map its fields into the expected structure.
  const handleQuestionSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    const questionId = e.target.value as number;
    setSelectedQuestionId(questionId);
    const question = questions.find((q) => q.question_id === questionId);
    if (question) {
      // Map the question fields to the builder element structure.
      // Adjust this mapping as needed.
      const mappedExtraAttr = {
        label: question.question_text || "",
        name: question.question_type || "",
        required: false, // default value (adjust if your API provides this)
        placeholder: question.question_text || "",
        options: question.options ? JSON.stringify(question.options) : "",
        question_text: question.question_text || "",
        question_type_id: question.question_type_id || 0,
        min_length: question.min_length || 0,
        max_length: question.max_length || 0,
        validation_type: question.validation_type || "",
        validation_message: question.validation_message || "",
        image_path: question.image_path || "",
        style: question.style || "",
        is_ffs: question.is_ffs || false,
      };

      setSelectedElement({
        id: question.question_id,
        type: "TextField", // Adjust based on your question type; here assuming TextField
        size: selectedElement.size || "100%",
        extraAttr: mappedExtraAttr,
      });
    }
  };

  console.log("PropertiesForm", PropertiesForm);
  // Function to save (or update) the current question.
  const handleSaveQuestion = async () => {
    try {
      const payload = {
        question_text: selectedElement.extraAttr.label,
        question_type_id: selectedElement.extraAttr.question_type_id,
        min_length: selectedElement.extraAttr.min_length,
        max_length: selectedElement.extraAttr.max_length,
        validation_type: selectedElement.extraAttr.validation_type,
        validation_message: selectedElement.extraAttr.validation_message,
        image_path: selectedElement.extraAttr.image_path,
        style: selectedElement.extraAttr.style,
        is_ffs: selectedElement.extraAttr.is_ffs,
        question_name: selectedElement.type, // or any other field you want to send
      };

      // Here, we're using addQuestion to save the question.
      // You might replace this with updateQuestion if the question exists.
      await addQuestion(payload);
      alert("Question saved successfully!");
      // Optionally navigate, e.g., navigate(`/builder/${selectedElement.id}`);
    } catch (error) {
      console.error("Error saving question:", error);
      alert("Failed to save question.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxHeight: "80vh",
        overflowY: "auto",
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Element Properties</h3>
        <Button variant="outlined" onClick={() => setSelectedElement(null)}>
          <AiOutlineClose />
        </Button>
      </Box>
      <Divider sx={{ mb: 4 }} />

      {/* Dropdown to select an existing question */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="select-question-label">Select Question</InputLabel>
        <Select
          labelId="select-question-label"
          label="Select Question"
          value={selectedQuestionId}
          onChange={handleQuestionSelect}
        >
          {questions.map((q) => (
            <MenuItem key={q.question_id} value={q.question_id}>
              {q.question_text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <PropertiesForm elementInstance={selectedElement} />

      {/* <Button variant="contained" color="primary" onClick={handleSaveQuestion}>
        Save Question
      </Button> */}
    </Box>
  );
};

export default PropertiesFormSidebar;
