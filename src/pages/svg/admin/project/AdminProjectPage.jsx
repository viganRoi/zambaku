import { Box } from "@mui/material";
import React from "react";
import AdmProjectTable from "../../../../components/admin/project/AdmProjectTable";
import AdmProjectModal from "../../../../components/admin/project/AdmProjectModal";
import AdmProjectHeader from "../../../../components/admin/project/AdmProjectHeader";

const AdminProjectPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        maxHeight: "100%",
        bgcolor: "white",
        borderRadius: "10px",
        p: 1.5,
      }}
    >
      <AdmProjectHeader />
      <AdmProjectTable />
      <AdmProjectModal />
    </Box>
  );
};

export default AdminProjectPage;
