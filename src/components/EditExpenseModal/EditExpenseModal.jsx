import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Typography, TextField, Button, Stack
} from '@mui/material';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'background.paper',
  boxShadow: 24,
  padding: 4,
  borderRadius: '12px',
  width: 350
};

const categories = ['Food', 'Travel', 'Shopping', 'Entertainment', 'Health', 'Other'];

const EditExpenseModal = ({ open, handleClose, expense, updateExpense, balance }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setPrice(expense.price.toString());
      setCategory(expense.category);
      setDate(expense.date);
    }
  }, [expense]);

  const handleSubmit = () => {
    const newAmount = parseFloat(price);
    if (!title || !price || !category || !date) {
      alert('Please fill in all fields');
      return;
    }

    const amountDiff = newAmount - expense.price;

    if (amountDiff > balance) {
      alert("You don't have enough balance to increase this expense.");
      return;
    }

    const updated = {
      ...expense,
      title,
      price: newAmount,
      category,
      date
    };

    updateExpense(updated, amountDiff); // parent handles state and wallet balance
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>Edit Expense</Typography>
        <Stack spacing={2}>
          <TextField
            name="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            name="price"
            label="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
          />
            <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px' }}
            >
            <option value="" name="category">Select a Category</option>
            {categories.map((cat) => (
                <option key={cat} value={cat} name={cat}>{cat}</option>
            ))}
            </select>
          <TextField
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit} sx={{background:"#ce801aff"}} type="submit">
            Save Changes
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditExpenseModal;

