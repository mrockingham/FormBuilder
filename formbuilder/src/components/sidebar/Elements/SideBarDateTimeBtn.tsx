import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { MdDateRange, MdAccessTime } from "react-icons/md";
import SideBarElementsSelectSize from "./SideBarElementsSelectSize";

const SideBarDateTimeBtn = () => {
  const [showSelectedElement, setShowSelectedElement] = useState({
    showElements: false,
    Element: "",
  });

  return (
    <>
      {!showSelectedElement.showElements ? (
        <Box>
          <Box textAlign="center" fontWeight={600} m={2}>
            Date & Time Elements
          </Box>
          <Box mb={2} display="flex" justifyContent="space-around">
            <div>
              <Box mb={1}>Date Input</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "dateInput",
                  })
                }
                sx={{
                  height: "100px",
                  width: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ECF4E6",
                  border: "1px solid lightgray",
                  boxShadow: "0 0 8px gray",
                  "&:hover": {
                    backgroundColor: "#C6E2B5",
                    boxShadow: "0 0 12px gray",
                    cursor: "pointer",
                  },
                }}
              >
                <MdDateRange
                  style={{
                    border: "1px solid limegreen",
                    width: "60px",
                    boxShadow: `16px 10px 40px #5e625c,
                                -16px -10px 32px #ffffff`,
                  }}
                  size={20}
                />
              </Button>
            </div>
            <div>
              <Box mb={1}>Time Input</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "timeInput",
                  })
                }
                sx={{
                  height: "100px",
                  width: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ECF4E6",
                  border: "1px solid lightgray",
                  boxShadow: "0 0 8px gray",
                  "&:hover": {
                    backgroundColor: "#C6E2B5",
                    boxShadow: "0 0 12px gray",
                    cursor: "pointer",
                  },
                }}
              >
                <MdAccessTime
                  style={{
                    border: "1px solid limegreen",
                    width: "60px",
                    boxShadow: `16px 10px 40px #5e625c,
                                -16px -10px 32px #ffffff`,
                  }}
                  size={20}
                />
              </Button>
            </div>
          </Box>
        </Box>
      ) : (
        <>
          {showSelectedElement.Element === "dateInput" && (
            <SideBarElementsSelectSize
              input={"dateInput"}
              setShowSelectedElement={setShowSelectedElement}
            />
          )}
          {showSelectedElement.Element === "timeInput" && (
            <SideBarElementsSelectSize
              input={"timeInput"}
              setShowSelectedElement={setShowSelectedElement}
            />
          )}
        </>
      )}
    </>
  );
};

export default SideBarDateTimeBtn;
