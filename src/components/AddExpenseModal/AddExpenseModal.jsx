
import { Box, Typography, Button, Modal, TextField, MenuItem} from '@mui/material';
import React, {useState} from 'react';
import {v4 as expid} from 'uuid';


const categories = ['Food', 'Travel', 'Shopping', 'Entertainment', 'Health', 'Other']

const AddExpenseModal = ({open, handleClose, balance, addExpense}) => {
    const [title, setTitle] = useState('');
    const [price, setPrice]= useState('');
    const [category, setCategory] = useState('Food');
    const [date, setDate]= useState('');
    
    const handleReset = () => {
        setTitle('');
        setCategory('Food');
        setPrice('');
        setDate('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedAmount  = Number(price);
       if (!title.trim() || parsedAmount <= 0 || !category || !date) {
          alert('Please fill in all fields');
          return;
        }
        if (parsedAmount > balance) {
        alert("You don't have enough balance in the expense");
        return;
}

        const newExpense = {
        id: expid(),
        title: title.trim(),
        price: parsedAmount,
        category,
        date,
        };
        addExpense(newExpense);
        handleReset();
        handleClose();
    }

  return (
    <Modal open={open} onClose={handleClose} >
        <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: '12px',
      width: 350,color:'#3b3b3b'
    }}
  >
    <Typography variant="h6" gutterBottom>
      Add Expense
    </Typography>

    <TextField
      name="title"
      label="Title"
      value={title}
      type="text"
      placeholder="Enter expense title"
      onChange={(e) => setTitle(e.target.value)}
      fullWidth
      sx={{ mt: 2 }}
    />
    <TextField
       name="price"
        type="number"
        label="Price"
        placeholder="Enter amount"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      fullWidth
      sx={{ mt: 2 }}
    />
       <TextField
          select
          name="category"
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          required
           data-testid="category"
          SelectProps={{ native: true }} // <-- ADD THIS LINE
          InputProps={{ style: { backgroundColor: "white" } }}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
    </TextField>
    <TextField
        name="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
        />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
      <Button variant="contained" onClick={handleSubmit} sx={{background:"#ce801aff"}} type="submit" >
        Add Expense
      </Button>
      <Button variant="outlined" onClick={handleClose}>
        Cancel
      </Button>
    </Box>
  </Box>
    </Modal>
  );
}

export default AddExpenseModal;
