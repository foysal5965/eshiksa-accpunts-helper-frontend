// pages/admins.js
'use client'
import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { toast } from 'sonner';
import { useAdminQuery } from '@/app/redux/api/adminApi';
import Loading from '@/app/components/shared/loading/loading';
import AdminTable from '@/app/components/tables/AdminTable';

const AdminPage = () => {
  
  const query = {}

  const { data: admins, isLoading } = useAdminQuery({ ...query })
  // const [deleteAdmin]= useDeleteadminMutation()

  const handleDelete = async(adminId: any) => {
    // const res = await deleteAdmin(adminId)
    // if(res){
    //   toast.success('Admin data deleted successfuly!!')
    // }
  };
  if (isLoading) {
    return <Loading />
  }
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admins List
      </Typography>
      <AdminTable admins={admins?.data}  />
    </Container>
  );
};

export default AdminPage;
