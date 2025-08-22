import { Box } from "@mui/material";
import React from "react";
import AdmNewsHeader from "../../../../components/admin/news/AdmNewsHeader";
import AdmNewsTable from "../../../../components/admin/news/AdmNewsTable";
import AdmNewsModal from "../../../../components/admin/news/AdmNewsModal";

const AdminNewsPage = () => {
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
      <AdmNewsHeader />
      <AdmNewsTable />
      <AdmNewsModal />
    </Box>
  );
};

export default AdminNewsPage;
