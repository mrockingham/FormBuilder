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
          <Box fontWeight={600} m={2}>
            Date & Time Elements
          </Box>
          <Box
            mb={2}
            ml={2}
            gap={3}
            display="flex"
            justifyContent="flex-start"
            flexWrap={"wrap"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Box mb={1}>Date</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "dateInput",
                  })
                }
                sx={{
                  height: "50px",
                  width: "50px",
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
                    border: "1px solid dodgerblue",
                    width: "30px",
                    boxShadow: `16px 10px 40px #5e625c,
                                -16px -10px 32px #ffffff`,
                  }}
                  size={20}
                />
              </Button>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Box mb={1}>Time </Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "timeInput",
                  })
                }
                sx={{
                  height: "50px",
                  width: "50px",
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
                    border: "1px solid dodgerblue",
                    width: "30px",
                    boxShadow: `16px 10px 40px #5e625c,
                                -16px -10px 32px #ffffff`,
                  }}
                  size={20}
                />
              </Button>
            </Box>
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
