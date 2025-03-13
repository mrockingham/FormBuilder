import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const SidebarRight: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [showOpenButton, setShowOpenButton] = useState(false);

  const toggleOpenSidebar = () => {
    // When opening, hide the open button immediately and show sidebar content.
    setShowOpenButton(false);
    setOpen(true);
  };

  const toggleCloseSidebar = () => {
    // When closing, collapse the sidebar, then after 0.5s show the open button.
    setOpen(false);
    setTimeout(() => {
      setShowOpenButton(true);
    }, 500);
  };

  return (
    <>
      {/* Open button (on the left edge) appears only when showOpenButton is true */}
      {showOpenButton && (
        <Box
          sx={{ position: "fixed", right: 0, top: 100, bottom: 0, zIndex: 100 }}
        >
          <aside
            style={{
              height: "100%",
              maxWidth: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              //   overflowY: "auto",
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
          width: open ? "350px" : "0px",
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
              boxShadow: `-20px -20px 60px #c6cdc1, 20px 20px 60px #ffffff`,
              overflowY: "auto",
              backgroundColor: "white",
            }}
          >
            <Box>Select Event</Box>
            <Box>Form Name</Box>
            <Box>Total Questions</Box>
            <Box>Page Title</Box>
            <Box>Page Info</Box>
            <Box>Page Number</Box>
            <Button>Add Page</Button>
          </aside>
        </Box>
      </Box>
    </>
  );
};

export default SidebarRight;
