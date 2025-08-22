import { Popover } from "@mui/material";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

import {
  CheckBox,
  CheckBoxOutlineBlank,
  Close,
  Edit,
  SupportAgent,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getSession,
//   handleLoginModalState,
//   isAuthorized,
// } from "../../../features/auth/AuthSlice";
import { toast } from "react-toastify";
import {
  setApartmentEditData,
  setApartmentEditModalState,
} from "../../features/apartment/ApartmentEditSlice";
// import { updateIsSold } from "../../../features/apartment/ApartmentAPI";
import axios from "axios";
import axiosInstance from "../auth/axiosInstance";
import { BASE_URL } from "../../utils/consts";

const ContextMenuParking = ({ menu, setMenu }) => {
  const dispatch = useDispatch();
  const status = null;
  const handleClose = () => {
    setMenu((prev) => ({
      ...prev,
      open: false,
    }));
  };
  React.useEffect(() => {
    if (status === "updateApartment_isSold_success") {
      handleClose();
      toast.success("Dokumenti u ruaj me sukses", {
        position: "top-right",
        onClose: () => {
          dispatch(resetStatusAndMsgTophane());
        },
      });
    }
    if (status === "updateApartment_isSold_rejected") {
      handleClose();
      toast.error("Gabim ne ruajtjen e dokumentit", {
        position: "top-right",
        onClose: () => {
          dispatch(resetStatusAndMsgTophane());
        },
      });
    }
  }, [status]);
  // if(!isAuthorized()) return
  console.log(menu)

  return (
    <Popover
      open={menu?.open}
      anchorEl={menu?.anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Paper sx={{ width: 350, maxWidth: "100%" }}>
        <MenuList>
          <MenuItem
            onClick={() => {
              const dataToUpdate = {
                isSold: !menu?.data.isSold,
                id: menu?.data.id,
              };
              // dispatch(updateIsSold(dataToUpdate));
              axiosInstance.get(`${BASE_URL}/api/v1/parking/update/sold?id=${dataToUpdate.id}&isSold=${dataToUpdate.isSold}`).then(
                res => {
                  toast.success('U ruajt me sukses')
                }
              ).catch(err => {
                toast.error('Ka ndodhur nje gabim!')
              })
            }}
          >
            <ListItemIcon>
              {menu?.data?.isSold ? (
                <CheckBoxOutlineBlank fontSize="small" />
              ) : (
                <CheckBox fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>
              {menu?.data?.isSold
                ? "Etiketo si jo e shitur"
                : "Etiketo si e shitur"}
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              const dataToUpdate = {
                isReserved: !menu?.data.isReserved,
                id: menu?.data.id,
              };
              
              axiosInstance.get(`${BASE_URL}/api/v1/parking/update/reserved?id=${dataToUpdate.id}&isReserved=${dataToUpdate.isReserved}`).then(
                res => {
                  toast.success('U ruajt me sukses')
                }
              ).catch(err => {
                toast.error('Ka ndodhur nje gabim!')
              })
            }}
          >
            <ListItemIcon>
              {menu?.data?.isReserved ? (
                <CheckBoxOutlineBlank fontSize="small" />
              ) : (
                <CheckBox fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>
              {menu?.data?.isReserved
                ? "Etiketo si jo e rezervuar"
                : "Etiketo si e rezervuar"}
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              const dataToUpdate = {
                isRent: !menu?.data.isRent,
                id: menu?.data.id,
              };
              
              axiosInstance.get(`${BASE_URL}/api/v1/parking/update/rent?id=${dataToUpdate.id}&isRent=${dataToUpdate.isRent}`).then(
                res => {
                  toast.success('U ruajt me sukses')
                }
              ).catch(err => {
                toast.error('Ka ndodhur nje gabim!')
              })
            }}
          >
            <ListItemIcon>
              {menu?.data?.isRent ? (
                <CheckBoxOutlineBlank fontSize="small" />
              ) : (
                <CheckBox fontSize="small" />
              )}
            </ListItemIcon>
            <ListItemText>
              {menu?.data?.isRent
                ? "Largo etiketimin si parking me qera"
                : "Etiketo si parking me qera"}
            </ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(setApartmentEditModalState(true));
              dispatch(setApartmentEditData(menu?.data));
              setMenu((prev) => ({ ...prev, open: false, anchorEl: null }));
            }}
            // onClick={() => {
            //   const session = getSession()
            //   const length = session ? Object.keys(session).length : 0;
            //   if(length > 1 && session?.isAuth === true){
            //     dispatch(setApartmentEditModalState(true))
            //     dispatch(setApartmentEditModalData(data))
            //     setMenu((prev) => ({...prev, open: false, anchorEl: null}))
            //   }
            //   else{
            //     dispatch(handleLoginModalState(true) )
            //   }
            // }}
          >
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>{'Edito'}</ListItemText>
          </MenuItem>
          <MenuItem
          // onClick={() => {
          //   const session = getSession()
          //   const length = session ? Object.keys(session).length : 0;
          //   if(length > 1 && session?.isAuth === true){
          //     dispatch(handleSalesModalState(true))
          //     dispatch(handleSalesModalData(data))
          //     setMenu((prev) => ({...prev, open: false, anchorEl: null}))
          //   }
          //   else{
          //     dispatch(handleLoginModalState(true) )
          //   }
          // }}
          >
            <ListItemIcon>
              <SupportAgent fontSize="small" />
            </ListItemIcon>
            <ListItemText>{''}</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              setMenu((prev) => ({ ...prev, open: false, anchorEl: null }));
            }}
          >
            <ListItemIcon>
              <Close fontSize="small" />
            </ListItemIcon>
            <ListItemText>{'Mbyll'}</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    </Popover>
  );
};

export default ContextMenuParking;
