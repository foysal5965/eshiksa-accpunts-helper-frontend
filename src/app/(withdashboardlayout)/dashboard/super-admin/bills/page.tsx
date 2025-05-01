
// pages/admins.js
'use client'
import React, { useState } from 'react';
import { Container, TextField, Typography } from '@mui/material';
import { toast } from 'sonner';
import { useCollegesQuery } from '@/app/redux/api/collegeApi';
import Loading from '@/app/components/shared/loading/loading';
import CollegeTable from '@/app/components/tables/collegeTable';
import { useDebounced } from '@/app/redux/hook';
import { useBillsQuery } from '@/app/redux/api/billApi';
import BillsTable from '@/app/components/tables/BillsTable';

const BillsPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const query: Record<string, any> = {};
    const debouncedTerm = useDebounced({
      searchQuery: searchTerm,
      delay: 600,
    });
    if (!!debouncedTerm) {
      query["searchTerm"] = searchTerm;
    }
  


  const { data: bills, isLoading } = useBillsQuery({ ...query })
  
//   const [deleteAdmin]= useDeleteadminMutation()

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
        <TextField
        label="Search"
        variant="outlined"
        fullWidth
        onChange={(e:any) => setSearchTerm(e.target.value)}
        size="small"
        placeholder="Search"
        sx={{ marginBottom: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        Bills List
      </Typography>
      <BillsTable bills={bills?.data}  />
    </Container>
  );
};

export default BillsPage;
