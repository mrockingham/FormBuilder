// src/components/SidebarRight.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tabs,
  Tab,
  TextField,
  Divider,
} from "@mui/material";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineExpandMore } from "react-icons/md";
import {
  addEvent,
  getEvents,
} from "../../services/controllers/eventCfontroller";
import { useNavigate } from "react-router-dom";

// Define a type for your event data (adjust as needed)
interface EventData {
  id: number;
  form_name: string;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  background_color: string;
  primary_color: string;
  campaign_code: string;
  event_type_id: string;
  active: string;
  // ... any additional fields
}

const textFieldStyle = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "lightblue",
      boxShadow: "0 0 10px lightgray",
      borderRadius: "16px",
      height: "90%",
    },
    "& input": {
      padding: "12px",
      fontSize: "14px",
    },
  },
};

const SidebarRight: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [showOpenButton, setShowOpenButton] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [displayNewEvent, setDisplayNewEvent] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | "">("");

  const navigate = useNavigate();

  // Initialize form using react-hook-form
  const form = useForm<EventData>({
    mode: "onBlur",
    defaultValues: {
      title: "Event Title",
      start_date: "",
      end_date: "",
      location: "location",
      background_color: "",
      primary_color: "",
      campaign_code: "",
      event_type_id: "",
      active: "",
    },
  });

  // Fetch events from the API on mount
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await getEvents();
        // Assume the API returns { events: EventData[] }
        setEvents(response);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEventData();
  }, []);
  console.log("events", events);
  // Reset form defaults on mount (or when needed)
  useEffect(() => {
    form.reset({
      title: "Event Title",
      start_date: "",
      end_date: "",
      location: "location",
      background_color: "",
      primary_color: "",
      campaign_code: "",
      event_type_id: "",
      active: "",
    });
  }, [form]);

  const applyChanges = (values: EventData) => {
    // For now we simply update the form values

    form.setValue("title", values.title);
    form.setValue("start_date", values.start_date);
    form.setValue("end_date", values.end_date);
    form.setValue("location", values.location);
    form.setValue("background_color", values.background_color);
    form.setValue("primary_color", values.primary_color);
    form.setValue("campaign_code", values.campaign_code);
    form.setValue("event_type_id", values.event_type_id);
    form.setValue("active", values.active);
  };

  const toggleOpenSidebar = () => {
    setShowOpenButton(false);
    setOpen(true);
  };

  const toggleCloseSidebar = () => {
    setOpen(false);
    setTimeout(() => {
      setShowOpenButton(true);
    }, 700); // matching transition duration
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // New Event form component
  const newEvent = () => {
    return (
      <Box>
        <form
          onBlur={form.handleSubmit(applyChanges)}
          onSubmit={(e) => e.preventDefault()}
        >
          <Box
            style={{
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <Controller
              control={form.control}
              name="title"
              render={({ field }) => (
                <TextField
                  sx={textFieldStyle}
                  label="Event Title"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              )}
            />

            <Controller
              control={form.control}
              name="event_type_id"
              render={({ field }) => (
                <TextField
                  sx={textFieldStyle}
                  label="Event Type"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              )}
            />

            <Controller
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <TextField
                  sx={textFieldStyle}
                  label="Start Date"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              )}
            />

            <Controller
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <TextField
                  sx={textFieldStyle}
                  label="End Date"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              )}
            />

            <Controller
              control={form.control}
              name="location"
              render={({ field }) => (
                <TextField
                  sx={textFieldStyle}
                  label="Location"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              )}
            />

            <Controller
              control={form.control}
              name="campaign_code"
              render={({ field }) => (
                <TextField
                  sx={textFieldStyle}
                  label="Campaign Code"
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                  }}
                />
              )}
            />
          </Box>
          {/* Save Event button */}
          <Button
            variant="contained"
            onClick={async () => {
              try {
                const values = form.getValues();
                await addEvent(values);
                alert("Event saved successfully!");
              } catch (error) {
                console.error("Error saving event:", error);
                alert("Failed to save event.");
              }
            }}
            sx={{ mt: 2 }}
          >
            Save Event
          </Button>
        </form>
      </Box>
    );
  };

  return (
    <>
      {/* Open button */}
      {showOpenButton && (
        <Box
          sx={{ position: "fixed", right: 0, top: 100, bottom: 0, zIndex: 100 }}
        >
          <aside
            style={{
              height: "100%",
              maxWidth: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "transparent",
            }}
          >
            <Button onClick={toggleOpenSidebar}>
              <FaArrowAltCircleLeft size={26} />
            </Button>
          </aside>
        </Box>
      )}

      {/* Sidebar content */}
      <Box
        style={{
          height: "100%",
          width: open ? "550px" : "0px",
          transition: "width 0.7s ease",
          flexDirection: "column",
          flexGrow: 1,
          gap: "10px",
          backgroundColor: "transparent",
        }}
      >
        <Box display={"flex"} height={"100%"}>
          <Box
            style={{
              position: "relative",
              right: "-30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "transparent",
            }}
          >
            <Button
              style={{ margin: "0", padding: "0" }}
              onClick={toggleCloseSidebar}
            >
              <FaArrowAltCircleRight size={26} />
            </Button>
          </Box>
          <aside
            style={{
              boxShadow: "0 0 8px gray",
              overflowY: "auto",
              backgroundColor: "white",
              width: "100%",
            }}
          >
            <Box sx={{ pl: 2, pr: 2, pt: 2 }}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="select-event-label">Select Event</InputLabel>
                <Select
                  sx={textFieldStyle}
                  variant="standard"
                  labelId="select-event-label"
                  label="Select Event"
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value as number)}
                >
                  <MenuItem onClick={() => setDisplayNewEvent(true)} value="">
                    New Event
                  </MenuItem>
                  {events?.map((event) => (
                    <MenuItem
                      key={event.id}
                      value={event.id}
                      onClick={() => setDisplayNewEvent(false)}
                    >
                      {event.title} -{" "}
                      {new Date(event.start_date).toLocaleDateString()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Divider sx={{ mt: 6, mb: 2 }} />
            {displayNewEvent ? (
              newEvent()
            ) : (
              <form
                onBlur={form.handleSubmit(applyChanges)}
                onSubmit={(e) => e.preventDefault()}
              >
                <Box
                  style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <Controller
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <Box gap="5px" display="flex" flexDirection="column">
                        <div>Location</div>
                        <TextField
                          sx={textFieldStyle}
                          // label="Location"
                          {...field}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") e.currentTarget.blur();
                          }}
                        />
                      </Box>
                    )}
                  />
                  <Box>Total Questions</Box>
                  {/* <Controller
                    control={form.control}
                    name="page_title"
                    render={({ field }) => (
                      <TextField
                        sx={textFieldStyle}
                        label="Page Title"
                        {...field}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") e.currentTarget.blur();
                        }}
                      />
                    )}
                  /> */}
                  <Box>Page Info</Box>
                  <Box>Page Number</Box>
                  <Button>Add Page</Button>
                </Box>
              </form>
            )}
          </aside>
        </Box>
      </Box>
    </>
  );
};

export default SidebarRight;
