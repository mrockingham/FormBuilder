import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Divider,
  Container,
} from "@mui/material";
import React, { useState } from "react";

import { useForm, Controller, set } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useFormStore from "../stores/formStore";
import useBuilderStore from "../stores/designBuilderStore";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import { mockData } from "../components/MockData";

interface FormData {
  name: string;
  event: string;
}
const infoBoxStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "10px",
  marginBottom: "10px",
  height: "200px",
  width: "200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
};

const LandingPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: {
      name: "",
      event: "",
    },
  });

  // Access Zustand store functions
  const { saveForm, setCurrentForm, resetCurrentForm, currentForm, forms } =
    useFormStore();
  const { setElements } = useBuilderStore();

  const handleClose = () => {
    setOpen(false);
    reset();
    resetCurrentForm(); // Clear the current form in the store
  };

  const handleSelectForm = (form: any) => {
    setCurrentForm(form);
    setElements(form.elements);
    console.log(form);
    navigate(`/builder/new`);
  };

  const onSubmit = (data: FormData) => {
    const newForm = { id: uuidv4(), ...data }; // Add a unique ID to the form

    saveForm(newForm); // Save form to the store
    setCurrentForm(newForm);

    navigate("/builder/" + newForm.id);
    // handleClose();
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      {/* <div>

      <div style={infoBoxStyle}>
        <div style={{ fontWeight: "bold" }}>Jobs</div>
        <div>7</div>
      </div>
      <div style={infoBoxStyle}>
        <div style={{ fontWeight: "bold" }}>Jobs</div>
        <div>7</div>
      </div>
    </div> */}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingX={2}
      >
        <div>Saved Forms</div>
        <Button
          onClick={() => {
            setOpen(true);
            setCurrentForm({ id: "", name: "", event: "" }); // Set initial form
          }}
        >
          Add Form
        </Button>
      </Box>
      <Divider />
      <Container
        maxWidth="md"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <h1>Saved Forms</h1>
        <Divider />
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
            {mockData.map((form) => (
              <div key={form.id} style={infoBoxStyle}>
                <div style={{ fontWeight: "bold" }}>{form.name}</div>
                <Button
                  onClick={() => handleSelectForm(form)}
                  variant="contained"
                >
                  Edit Form
                </Button>
              </div>
            ))}
          </Box>
        </Box>
      </Container>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Create Form</DialogTitle>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: "16px" }}>
          {/* Controlled Select Dropdown */}
          <Controller
            name="event"
            control={control}
            rules={{ required: "Please select an event" }}
            render={({ field, fieldState: { error } }) => (
              <FormControl fullWidth margin="normal" error={!!error}>
                <InputLabel id="event-select-label">Select Event</InputLabel>
                <Select
                  {...field}
                  labelId="event-select-label"
                  id="event-select"
                  label="Select Event"
                >
                  <MenuItem value="event1">Event 1</MenuItem>
                  <MenuItem value="event2">Event 2</MenuItem>
                  <MenuItem value="event3">Event 3</MenuItem>
                </Select>
                {error && (
                  <p style={{ color: "red", margin: 0 }}>{error.message}</p>
                )}
              </FormControl>
            )}
          />

          {/* Controlled TextField 1 */}
          <Controller
            name="name"
            control={control}
            rules={{ required: "name is required" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="name"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </form>

        <Button>
          <Link to="/builder">Go to Builder</Link>
        </Button>
      </Dialog>
    </div>
  );
};

export default LandingPage;
