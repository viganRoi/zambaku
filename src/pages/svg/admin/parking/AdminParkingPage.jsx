import { Box } from '@mui/material'
import React from 'react'
import AdmParkingHeader from '../../../../components/admin/parking/AdmParkingHeader'
import AdmParkingTable from '../../../../components/admin/parking/AdmParkingTable'
import AdmParkingModal from '../../../../components/admin/parking/AdmParkingModal'

const AdminParkingPage = () => {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        maxHeight: 'calc(100% - 120px)',
        bgcolor: 'lightgray',
        borderRadius: '10px',
        p: 1.5,
    }}>
       <AdmParkingHeader />
       <AdmParkingTable />
       <AdmParkingModal /> 
    </Box>
  )
}

export default AdminParkingPage