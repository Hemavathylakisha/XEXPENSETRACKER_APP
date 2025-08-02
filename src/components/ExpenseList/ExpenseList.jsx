import React from 'react';
import {
  List, ListItem, ListItemText, IconButton,
  Typography, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ExpenseList = ({ expenses, onEdit, onDelete}) => {
  return (
    <Box sx={{width:"65%"}}>
        <Typography variant="h5" align='left'>Recent Transactions</Typography>
    <List sx={{background:"#ffffff",borderRadius:"10px",color:"#3d3d3d"}}>
      {expenses.map((expense) => (
        <ListItem key={expense.id} sx={{ borderBottom: "1px solid #dedede" }}
  secondaryAction={
    <Box sx={{ width: "18%", display: "flex", gap: "10px", alignItems: "center" }}>
      <IconButton onClick={() => onEdit(expense)} sx={{ backgroundColor: "#f3ef17ff", borderRadius: "15px" }}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => onDelete(expense.id, expense.price)} sx={{ backgroundColor: "#f72525ff", borderRadius: "15px" }}>
        <DeleteIcon />
      </IconButton>
    </Box>
  }
>
  <ListItemText
    primary={
      <Typography variant="body1" fontWeight="bold">
        {`${expense.title.charAt(0).toUpperCase() + expense.title.slice(1)} - ₹${expense.price}`}
      </Typography>
    }
    secondary={
      <Typography variant="body2" color="text.secondary">
        {`${expense.category.charAt(0).toUpperCase() + expense.category.slice(1)} - ${expense.date}`}
      </Typography>
    }
  />
</ListItem>
      ))}
    </List>
    </Box>
  );
};

export default ExpenseList;
