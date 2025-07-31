
import { Box, Typography, Button, Modal, TextField} from '@mui/material';
import React, {useState} from 'react';
import {v4 as expid} from 'uuid';


const categories = ['Food', 'Travel', 'Shopping', 'Entertainment', 'Health', 'Other']

const AddExpenseModal = ({open, handleClose, balance, addExpense}) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount]= useState('');
    const [category, setCategory] = useState('');
    const [date, setDate]= useState('');
    
    const handleReset = () => {
        setTitle('');
        setCategory('');
        setAmount('');
        setDate('');
    }

    const handleSubmit = () => {
        const parsedAmount  = parseFloat(amount);
        if(!title || !parsedAmount || !category || !date){
          alert('Please fill in all fields');
            return;  
        }
        if(amount > balance){
            alert("You don't have a enough balance in the expense");
        }

        const newExpense = {
        id: expid(),
        title,
        amount: parsedAmount,
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
      placeholder="Title"
      onChange={(e) => setTitle(e.target.value)}
      fullWidth
      sx={{ mt: 2 }}
    />
    <TextField
      name="price"
      label="amount"
      type="number"
      placeholder="Price"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      fullWidth
      sx={{ mt: 2 }}
    />
        <select
    name="category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    style={{ width: '100%', padding: '10px', marginTop: '8px', borderRadius: '4px' }}
    >
    <option value="" name="category">Select a Category</option>
    {categories.map((cat) => (
        <option key={cat} value={cat} name={cat}>
        {cat}
        </option>
    ))}
    </select>
    <TextField
        name="date"
        label="date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        sx={{ mt: 2 }}
        />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
      <Button variant="contained" onClick={handleSubmit} sx={{background:"#ce801aff"}}>
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
