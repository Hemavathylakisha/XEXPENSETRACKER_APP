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
        <ListItem
          key={expense.id}
          secondaryAction={ 
            <Box sx={{Width:"18%",display: "flex", gap: "10px", alignItems: "center"}}>
              {/* <Typography fontWeight="bold"
                    color="#f1b718ff">₹{expense.price}</Typography> */}
              <IconButton onClick={() => onEdit(expense)} sx={{backgroundColor:"#f3ef17ff", borderRadius:"15px"}}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(expense.id, expense.price)} sx={{backgroundColor:"#f72525ff", borderRadius:"15px"}}>
                <DeleteIcon />
              </IconButton>              
            </Box>
          }
          sx={{borderBottom:"1px solid #dedede"}}
        >
          <ListItemText
            primary={
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body1" fontWeight="bold">
                  {expense.title}
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="#70e412ff">
                  ₹{expense.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {expense.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {expense.date}
                </Typography>
              </Box>
            }
            // secondary={`${expense.category} | ${expense.date}`}
          />
        </ListItem>
      ))}
    </List>
    </Box>
  );
};

export default ExpenseList;
