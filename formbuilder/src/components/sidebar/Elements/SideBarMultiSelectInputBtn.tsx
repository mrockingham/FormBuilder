import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import SideBarElementsSelectSize from "./SideBarElementsSelectSize";

const SideBarMultiSelectInputBtn = () => {
  const [showSelectedElement, setShowSelectedElement] = useState({
    showElements: false,
    Element: "",
  });

  return (
    <>
      {!showSelectedElement.showElements ? (
        <Box>
          <Box fontWeight={600} m={2}>
            Select Elements
          </Box>
          <Box
            mb={2}
            ml={2}
            display="flex"
            gap={3}
            flexWrap={"wrap"}
            justifyContent={"flex-start"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Box mb={1}>Check</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "checkboxInput",
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
                <IoIosCheckboxOutline
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
              <Box mb={1}>Radio</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "radioInput",
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
                <IoIosRadioButtonOn
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
              <Box mb={1}>Select</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "selectInput",
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
                <MdArrowDropDown
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
          {showSelectedElement.Element === "checkboxInput" && (
            <SideBarElementsSelectSize
              input={"checkboxInput"}
              setShowSelectedElement={setShowSelectedElement}
            />
          )}
          {showSelectedElement.Element === "radioInput" && (
            <SideBarElementsSelectSize
              input={"radioInput"}
              setShowSelectedElement={setShowSelectedElement}
            />
          )}
          {showSelectedElement.Element === "selectInput" && (
            <SideBarElementsSelectSize
              input={"selectInput"}
              setShowSelectedElement={setShowSelectedElement}
            />
          )}
        </>
      )}
    </>
  );
};

export default SideBarMultiSelectInputBtn;
