import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { CiTextAlignJustify } from "react-icons/ci";
import { MdPowerInput } from "react-icons/md";
import SideBarElementsSelectSize from "./SideBarElementsSelectSize";

const SideBarTextInputBtn = () => {
  const [showSelectedElement, setShowSelectedElement] = useState({
    showElements: false,
    Element: "",
  });

  return (
    <>
      {!showSelectedElement.showElements ? (
        <Box>
          <Box fontWeight={600} m={2}>
            Input Elements
          </Box>
          <Box
            mb={2}
            ml={2}
            display="flex"
            gap={3}
            justifyContent={"flex-start"}
            flexWrap={"wrap"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              {/* <Box mb={1}>Text</Box> */}
              <Box
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "textInput",
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
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  alignContent={"space-between"}
                  borderRadius={"8px"}
                  textAlign={"center"}
                  sx={{ borderRadius: "8px" }}
                >
                  <MdPowerInput
                    color={"#1976D2"}
                    style={{
                      // backgroundColor: "#1976D2",
                      marginTop: "3px",
                      // border: "1px solid dodgerblue",
                    }}
                    size={38}
                  />

                  <Box
                    bgcolor={"#1976D2"}
                    color="white"
                    height={"15px"}
                    width={"100%"}
                    fontSize={"14px"}
                    sx={{ borderRadius: "2px" }}
                    pb={0.2}
                  >
                    Text
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              {/* <Box mb={1}> Area</Box> */}
              <Box
                onClick={() =>
                  setShowSelectedElement({
                    showElements: true,
                    Element: "textAreaInput",
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
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  alignContent={"space-between"}
                  borderRadius={"8px"}
                  textAlign={"center"}
                  sx={{ borderRadius: "8px" }}
                >
                  <CiTextAlignJustify
                    color={"#1976D2"}
                    style={{
                      // backgroundColor: "#1976D2",
                      marginTop: "3px",
                      // border: "1px solid dodgerblue",
                    }}
                    size={32}
                  />
                  <Box
                    bgcolor={"#1976D2"}
                    color="white"
                    height={"15px"}
                    width={"100%"}
                    fontSize={"14px"}
                    sx={{ borderRadius: "2px" }}
                    pb={0.2}
                  >
                    Area
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : showSelectedElement.showElements &&
        showSelectedElement.Element === "textInput" ? (
        <SideBarElementsSelectSize
          input={"textInput"}
          setShowSelectedElement={setShowSelectedElement}
        />
      ) : (
        <SideBarElementsSelectSize
          input={"textAreaInput"}
          setShowSelectedElement={setShowSelectedElement}
        />
      )}
    </>
  );
};

export default SideBarTextInputBtn;
