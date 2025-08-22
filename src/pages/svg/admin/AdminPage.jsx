import {
  Box,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdmApartments from "./apartments/AdmApartments";
import {
  AddBusiness,
  Apartment,
  ChevronLeft,
  ChevronRight,
  Construction,
  LocalParking,
  Logout,
  Note,
  Person,
  Public,
  Receipt,
  RequestPage,
  RequestQuote,
} from "@mui/icons-material";
import AdminProjectPage from "./project/AdminProjectPage";
import AdminNewsPage from "./news/AdminNewsPage";
import AdminParkinPage from "./parking/AdminParkingPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notes from "../../../components/admin/notes/Notes";
import Login from "../../../components/auth/Login";
import AdmRequestPage from "./requests/AdmRequestPage";

const AdminPage = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
      }}
    >
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: open ? "210px" : "60px",
          backgroundColor: "#1d1d3a",
          flexShrink: 0,
          transition: "width 0.2s ease-in-out",
          position: "fixed",
          height: "100vh",
          top: 0,
          left: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: open ? "flex-end" : "center",
            height: "max-content",
            py: "5px",
            pr: "2px",
          }}
        >
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
        <Divider />
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            "& span": {
              color: "white",
              transition: "display 0.35s ease-in-out",
              display: open ? "block" : "none",
            },
          }}
        >
          <ListItem disablePadding sx={{ height: "40px" }}>
            <ListItemButton onClick={() => navigate("")}>
              <ListItemIcon>
                <Apartment sx={{ color: "#c1ac40" }} />
              </ListItemIcon>
              <ListItemText primary="Apartamentet" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ height: "40px" }}>
            <ListItemButton onClick={() => navigate("news")}>
              <ListItemIcon>
                <Public sx={{ color: "#c1ac40" }} />
              </ListItemIcon>
              <ListItemText primary="Lajmet" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ height: "40px" }}>
            <ListItemButton onClick={() => navigate("project")}>
              <ListItemIcon>
                <Construction sx={{ color: "#c1ac40" }} />
              </ListItemIcon>
              <ListItemText primary="Projektet" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ height: "40px" }}>
            <ListItemButton onClick={() => navigate("garage")}>
              <ListItemIcon>
                <LocalParking sx={{ color: "#c1ac40" }} />
              </ListItemIcon>
              <ListItemText primary="Garazha" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ height: "40px" }}>
            <ListItemButton onClick={() => navigate("project")}>
              <ListItemIcon>
                <AddBusiness sx={{ color: "#c1ac40" }} />
              </ListItemIcon>
              <ListItemText primary="Lokalet" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ height: "40px" }}>
            <ListItemButton>
              <ListItemIcon>
                <Person sx={{ color: "#c1ac40" }} />
              </ListItemIcon>
              <ListItemText primary="Klientët" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ height: "40px" }}>
            <ListItemButton onClick={() => navigate("notes")}>
              <ListItemIcon>
                <Note sx={{ color: "#c1ac40" }} />
              </ListItemIcon>
              <ListItemText primary="Shënimet" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ height: "40px" }}>
            <ListItemButton onClick={() => navigate("d")}>
              <ListItemIcon>
                <Receipt sx={{ color: "#c1ac40" }} />
              </ListItemIcon>
              <ListItemText primary="Shitje" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ height: "40px" }}>
            <ListItemButton onClick={() => navigate("requests")}>
              <ListItemIcon>
                <RequestPage sx={{ color: "#c1ac40" }} />
              </ListItemIcon>
              <ListItemText primary="Kërkesat" />
            </ListItemButton>
          </ListItem>
        </List>
        <List
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
          }}
        >
          <ListItem disablePadding sx={{ height: "40px" }}>
            <ListItemButton
              onClick={() => {
                localStorage.removeItem("session");
                window.location.reload();
              }}
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Shkyqu" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          height: "100%",
          p: "10px",
          ml: open ? "210px" : "60px",
          transition: "margin-left 0.2s ease-in-out",
        }}
      >
        <Routes>
          <Route path="" element={<AdmApartments />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/project" element={<AdminProjectPage />} />
          <Route path="/news" element={<AdminNewsPage />} />
          <Route path="/garage" element={<AdminParkinPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/requests" element={<AdmRequestPage />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminPage;
