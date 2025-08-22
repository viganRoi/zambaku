import React, { useContext, useEffect, useState } from 'react'
import AdmApartmentHeader from '../../../../components/admin/apartments/AdmApartmentHeader'
import AdmApartmentTable from '../../../../components/admin/apartments/AdmApartmentTable'
import { Box } from '@mui/material'
import AdmApartmentModal from '../../../../components/admin/apartments/AdmApartmentModal'
import AdmApartmentIdModal from '../../../../components/admin/apartments/AdmApartmentIdModal'



const AdmApartments = () => {
  
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    }}>
        <AdmApartmentHeader />
        <AdmApartmentTable />
        <AdmApartmentModal />
        <AdmApartmentIdModal />
    </Box>
  )
}

export default AdmApartments