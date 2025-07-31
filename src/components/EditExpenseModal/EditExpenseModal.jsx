import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Typography, TextField, Button, MenuItem, Stack
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
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (expense) {
      setTitle(expense.title);
      setAmount(expense.amount.toString());
      setCategory(expense.category);
      setDate(expense.date);
    }
  }, [expense]);

  const handleSubmit = () => {
    const newAmount = parseFloat(amount);
    if (!title || !amount || !category || !date) {
      alert('Please fill in all fields');
      return;
    }

    const amountDiff = newAmount - expense.amount;

    if (amountDiff > balance) {
      alert("You don't have enough balance to increase this expense.");
      return;
    }

    const updated = {
      ...expense,
      title,
      amount: newAmount,
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
            label="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          />
            <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px' }}
            >
            <option value="">Select a Category</option>
            {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
            ))}
            </select>
          <TextField
            name="Date"
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit} sx={{background:"#ce801aff"}}>
            Save Changes
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default EditExpenseModal;

