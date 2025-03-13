import React from "react";
import { Box, Button } from "@mui/material";

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
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{ my: 2 }}
    >
      <Button
        variant="contained"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <Box>
        Page {currentPage + 1} of {totalPages}
      </Box>
      <Button
        variant="contained"
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
      <Button variant="outlined" onClick={onAddPage}>
        Add Page
      </Button>
    </Box>
  );
};

export default MultiPageNavigator;
