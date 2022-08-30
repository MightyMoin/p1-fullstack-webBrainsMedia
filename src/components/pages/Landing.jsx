import React from "react";
import MainTable from "../elements/MainTable";
import AddSubjectModal from "../elements/AddSubjectModal";
import { Box, Typography } from "@mui/material";

const Landing = () => {
  return (
    <Box p={2}>
      <Box sx={{ textAlign: "center", fontWeight: "medium", color: '#002B5B' }} mb={2} >
        <Typography variant="h3">Subject Activity Tracker</Typography>
      </Box>
      <MainTable></MainTable>
      <Box display="flex" justifyContent="right" width="100%">
        <AddSubjectModal></AddSubjectModal>
      </Box>
    </Box>
  );
};

export default Landing;
