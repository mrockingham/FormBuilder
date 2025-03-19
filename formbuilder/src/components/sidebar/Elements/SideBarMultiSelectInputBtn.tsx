import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { IoIosRadioButtonOn } from "react-icons/io";
import { IoIosCheckboxOutline } from "react-icons/io";
import { MdArrowDropDown } from "react-icons/md";
import SideBarElementsSelectSize from "./SideBarElementsSelectSize";

// Will make into one button
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
              <Box color="#1976D2" mb={1}>
                Check
              </Box>
              <Box
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "checkboxInput",
                  })
                }
                sx={{
                  height: "60px",
                  padding: "6px",
                  borderRadius: "8px",
                  width: "60px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#f4f5f8",
                  border: "1px solid lightgray",
                  boxShadow: "0 0 8px gray",
                  "&:hover": {
                    boxShadow: "0 0 10px gray", // change box shadow on hover
                    cursor: "pointer", // add cursor pointer on hover
                    scale: "1.08",
                  },
                }}
              >
                <Box
                  bgcolor={"white"}
                  height={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  alignContent={"space-between"}
                  borderRadius={"8px"}
                  textAlign={"center"}
                  sx={{ borderRadius: "8px" }}
                >
                  <IoIosCheckboxOutline
                    style={{
                      color: "#1976D2",
                      // border: "1px solid dodgerblue",
                      width: "30px",
                      // boxShadow: `16px 10px 40px #5e625c,
                      //         -16px -10px 32px #ffffff`,
                    }}
                    size={30}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Box style={{ visibility: "hidden" }} mb={1}>
                Radio
              </Box>
              <Box
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "radioInput",
                  })
                }
                sx={{
                  height: "60px",
                  padding: "6px",
                  borderRadius: "8px",
                  width: "60px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "#f4f5f8",
                  border: "1px solid lightgray",
                  boxShadow: "0 0 8px gray",
                  "&:hover": {
                    boxShadow: "0 0 10px gray", // change box shadow on hover
                    cursor: "pointer", // add cursor pointer on hover
                    scale: "1.08",
                  },
                }}
              >
                <Box
                  bgcolor={"white"}
                  height={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  alignContent={"space-between"}
                  borderRadius={"8px"}
                  textAlign={"center"}
                  sx={{ borderRadius: "8px" }}
                  color={"#1976D2"}
                >
                  <Box mb={1}>Radio</Box>
                  <IoIosRadioButtonOn
                    style={{
                      // border: "1px solid dodgerblue",
                      width: "30px",
                      // boxShadow: `16px 10px 40px #5e625c,
                      //         -16px -10px 32px #ffffff`,
                    }}
                    size={20}
                  />
                </Box>
              </Box>
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
                  backgroundColor: "#f3f9ff",
                  border: "1px solid lightgray",
                  boxShadow: "0 0 8px gray",
                  "&:hover": {
                    scale: "1.08",
                    boxShadow: "0 0 12px gray",
                    cursor: "pointer",
                  },
                }}
              >
                <MdArrowDropDown
                  style={{
                    border: "1px solid dodgerblue",
                    width: "30px",
                    // boxShadow: `16px 10px 80px #5e625c,
                    //           -16px -10px 32px #ffffff`,
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
