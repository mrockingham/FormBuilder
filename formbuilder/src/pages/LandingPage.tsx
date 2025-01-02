import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useFormStore from "../stores/formStore";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs

interface FormData {
  name: string;
  event: string;
}

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

  const handleClose = () => {
    setOpen(false);
    reset();
    resetCurrentForm(); // Clear the current form in the store
  };

  const onSubmit = (data: FormData) => {
    const newForm = { id: uuidv4(), ...data }; // Add a unique ID to the form

    saveForm(newForm); // Save form to the store
    setCurrentForm(newForm);

    navigate("/builder");
    // handleClose();
  };

  return (
    <>
      <div>LandingPage</div>

      <Button
        onClick={() => {
          setOpen(true);
          setCurrentForm({ id: "", name: "", event: "" }); // Set initial form
        }}
      >
        Create Builder
      </Button>

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
    </>
  );
};

export default LandingPage;
