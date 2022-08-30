import React from "react";
import MainTable from "../elements/MainTable";
import AddSubjectModal from "../elements/AddSubjectModal";
import { Box } from "@mui/material";

const Landing = () => {
  return (
    <div>
      <MainTable></MainTable>
      <Box display="flex" justifyContent="right" width="100vw">
        <AddSubjectModal></AddSubjectModal>
      </Box>
    </div>
  );
};

export default Landing;
