'use client'
import { useAddCollegeMutation } from '@/app/redux/api/collegeApi';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion'
import { useState } from 'react';
import { toast } from 'sonner';
const AddCollege = () => {
    const [collegeName, setCollegeName] = useState('');
    const [collegeAddress, setCollegeAddress] = useState('');
    const [cloudSpacePricePerUnit, setCloudSpacePricePerUnit] = useState<number>(0)
    const [addCollege, {isLoading}]= useAddCollegeMutation()
    const collegeData = {
        collegeName,
        collegeAddress,
        cloudSpacePricePerUnit
    }
    const handleSubmit = async (e: any)=>{
        e.preventDefault();
        try{
            const res = await addCollege(collegeData)
            if (res?.data?.data?.id) {
                setCloudSpacePricePerUnit(0);
                setCollegeAddress('')
                setCollegeName('')
                toast.success('College Added Successfuly')
            }
        }catch{

        }
    }
  return (
    <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
>
    <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
            Add College
        </Typography>
        
        <Typography fontWeight={400} color='red' align="center" gutterBottom>
            {/* {error? error : ''} */}
           
            
        </Typography>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                {/* Category Name */}
                <Grid item xs={12}>
                    <TextField
                        label="College Name"
                        variant="outlined"
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="College Address"
                        variant="outlined"
                        value={collegeAddress}
                        onChange={(e) => setCollegeAddress(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Per Unit Price"
                        variant="outlined"
                        value={cloudSpacePricePerUnit}
                        onChange={(e) => setCloudSpacePricePerUnit(Number(e.target.value))}

                        required
                    />
                </Grid>

                

                {/* Submit Button */}
                <Grid item xs={12}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Button sx={{
                            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient color
                            borderRadius: '15px', // Rounded button
                            padding: '10px 20px',
                            color: '#fff', // Text color
                            fontSize: '15px',
                            fontWeight: 'bold', // Initial shadow

                        }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={isLoading} // Disable button while loading
                        >
                            {isLoading ? 'Creating...' : 'Add College'}
                        </Button>
                    </motion.div>
                </Grid>
            </Grid>
        </form>

       
    </Paper>
</motion.div>
);
  
};

export default AddCollege;
