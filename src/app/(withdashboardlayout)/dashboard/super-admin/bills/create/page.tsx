'use client'
import React, { useState } from 'react';
import {
    Container, Grid, TextField, Typography, MenuItem, Button, Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import { useCollegesQuery } from '@/app/redux/api/collegeApi';
import { useCreateBillMutation } from '@/app/redux/api/billApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


const fieldNames = [
    { name: 'admissionMsg', label: 'Admission Message', type: 'number' },
    { name: 'groupMsg', label: 'Group Message', type: 'number' },
    { name: 'proReMigraMsg', label: 'Promotion/Readmission/Migration Message', type: 'number' },
    { name: 'professionalAddMsg', label: 'Professional Admission Message', type: 'number' },
    { name: 'stdNtsMsg', label: 'Student Notice Message', type: 'number' },
    { name: 'absentMsg', label: 'Absent Message', type: 'number' },
    { name: 'TutionFeeMsg', label: 'Tuition Fee Message', type: 'number' },
    { name: 'billingTime', label: 'Billing Time' },
    { name: 'cloudSpaceUnit', label: 'Billing Unit', type: 'number' },
];

const CreateBillPage = () => {
    const [formData, setFormData] = useState({
        collegeId: '',
        companyName: '',
        admissionMsg: 0,
        groupMsg: 0,
        proReMigraMsg: 0,
        professionalAddMsg: 0,
        stdNtsMsg: 0,
        absentMsg: 0,
        TutionFeeMsg: 0,
        billingTime: '',
        cloudSpaceUnit: 0,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const query = {}
    const { data, isLoading } = useCollegesQuery({ ...query })
    const collegeData = data?.data
    const [createBill, { isLoading: billLoading }] = useCreateBillMutation()
    const router = useRouter()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        const parsedValue = type === 'number' ? Number(value) : value;
        setFormData(prev => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();
    //     if (isSubmitting) return;
    
    //     setIsSubmitting(true);
    
    //    await createBill(formData)
    // };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
          const response = await fetch('http://localhost:3000/api/v1/bill/create-bill', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
        //   if (!response.ok) {
        //     const err = await response.json();
        //     toast.error(err.message || "Bill creation failed.");
        //     return;
        //   }
      
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
      
          // 👇 Open PDF in a new browser tab
          window.open(url, '_blank');
      
          toast.success('Bill created and opened!');
        } catch (err) {
          console.error(err);
          toast.error("Something went wrong.");
        } finally {
          setIsSubmitting(false);
        }
      };
      
      

    return (
        <Container maxWidth="md" sx={{ mt: 5 }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Generate Student Bill
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="Select College"
                                    name="collegeId"
                                    value={formData.collegeId}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    disabled={isLoading} // disable while loading
                                >
                                    {isLoading ? (
                                        <MenuItem disabled>Loading colleges...</MenuItem>
                                    ) : (
                                        collegeData?.map((college: any) => (
                                            <MenuItem key={college.id} value={college.id}>
                                                {college.collegeName}
                                            </MenuItem>
                                        ))
                                    )}
                                </TextField>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    select
                                    label="Select Company"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                >
                                    <MenuItem value="ESHIKSA">eShiksa</MenuItem>
                                    <MenuItem value="ARCHIMAZE">ARCHIMAZE</MenuItem>
                                </TextField>
                            </Grid>

                            {fieldNames.map(field => (
                                <Grid item xs={12} sm={6} key={field.name}>
                                    <TextField
                                        type={field.type}
                                        name={field.name}
                                        label={field.label}
                                        value={formData[field.name as keyof typeof formData]}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            ))}

                            <Grid item xs={12}>
                                <Button sx={{
                                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                                    borderRadius: '15px', // Rounded button
                                    padding: '10px 10px',
                                    color: '#fff', // Text color
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    // width: '150px' // Initial shadow

                                }} fullWidth type='submit' disabled={billLoading}>Create Bill</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </motion.div>
        </Container>
    );
};

export default CreateBillPage;
