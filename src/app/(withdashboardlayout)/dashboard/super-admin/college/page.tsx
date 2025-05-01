// pages/admins.js
'use client'
import React, { useState } from 'react';
import { Container, TextField, Typography } from '@mui/material';
import { toast } from 'sonner';
import { useCollegesQuery } from '@/app/redux/api/collegeApi';
import Loading from '@/app/components/shared/loading/loading';
import CollegeTable from '@/app/components/tables/collegeTable';
import { useDebounced } from '@/app/redux/hook';

const AdminPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const query: Record<string, any> = {};
    const debouncedTerm = useDebounced({
      searchQuery: searchTerm,
      delay: 600,
    });
    if (!!debouncedTerm) {
      query["searchTerm"] = searchTerm;
    }
  


  const { data: colleges, isLoading } = useCollegesQuery({ ...query })
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
        label="Search Courses"
        variant="outlined"
        fullWidth
        onChange={(e:any) => setSearchTerm(e.target.value)}
        size="small"
        placeholder="search doctors"
        sx={{ marginBottom: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        Collge List
      </Typography>
      <CollegeTable colleges={colleges?.data}  />
    </Container>
  );
};

export default AdminPage;
