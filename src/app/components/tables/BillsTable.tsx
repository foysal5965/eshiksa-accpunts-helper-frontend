
'use client'
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';

const BillsTable = ({ bills }:any) => {
   
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
        <Table aria-label="admin table">
          <TableHead>
            <TableRow>
              <TableCell>College Name</TableCell>
              <TableCell>Billing Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills?.map((bill:any, index:any) => (
              <TableRow
                key={bill.id}
                component={motion.tr}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TableCell>{bill.college.collegeName}</TableCell>
                <TableCell>{bill.billingTime}</TableCell>
                <TableCell>{bill.billUpdate}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    // onClick={() => handleDelete(college.id)}
                    component={motion.button}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </motion.div>
  );
};

export default BillsTable;
