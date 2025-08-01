import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Expenses = ({ total, onAddClick }) => {
  return (
    <Box sx={{background:"#9b9b9b", borderRadius:"10px", width: "30%", marginTop:"32px",
    height: "220px", display:"flex", justifyContent:"center",alignItems:"center", flexDirection:"column"}}>
      <Typography variant='h4'>Add Expense: ₹{total}</Typography>
      <Button
      data-testid="add-expense-button"
      type="submit"
        variant="contained"
        onClick={onAddClick}
        sx={{ mt: 2 , background:"#e03f34ff"}}
      >
        + Add Expense
      </Button>
    </Box>
  );
};

export default Expenses;
