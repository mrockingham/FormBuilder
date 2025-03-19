import React from "react";
import { Box, Button } from "@mui/material";
import {
  FaArrowAltCircleUp,
  FaArrowAltCircleDown,
  FaPlusCircle,
} from "react-icons/fa";

interface MultiPageNavigatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onAddPage: () => void;
}

const MultiPageNavigator: React.FC<MultiPageNavigatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onAddPage,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <Button
        variant="text"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FaArrowAltCircleUp size={20} />
      </Button>
      <Box>Page</Box>
      <Box>
        {currentPage + 1} of {totalPages}
      </Box>
      <Button
        variant="text"
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <FaArrowAltCircleDown size={20} />
      </Button>
      <Button
        style={{ display: "flex", flexDirection: "column" }}
        variant="text"
        onClick={onAddPage}
      >
        <Box>Add</Box>
        <FaPlusCircle size={20} />
      </Button>
    </Box>
  );
};

export default MultiPageNavigator;
