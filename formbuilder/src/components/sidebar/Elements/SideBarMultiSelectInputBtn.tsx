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
          <Box textAlign={"center"} fontWeight={600} m={2}>
            Select Elements
          </Box>
          <Box
            mb={2}
            display="flex"
            justifyContent={"space-around"}
            flexWrap={"wrap"}
          >
            <div>
              <Box mb={1}>Check Box</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "checkboxInput",
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
                <IoIosCheckboxOutline
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
              <Box mb={1}>Radio Button</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "radioInput",
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
                <IoIosRadioButtonOn
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
              <Box mb={1}>Select</Box>
              <Button
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "selectInput",
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
                <MdArrowDropDown
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
