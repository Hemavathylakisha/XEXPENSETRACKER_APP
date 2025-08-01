
import {
  Box, Typography, Button, Modal, TextField, Stack
} from '@mui/material';
import { useState } from 'react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '12px',
  width: 500,
  color:'#3b3b3b'
};

const Wallet = ({balance, setBalance}) => {
    const [open, setOpen] = useState(false);
    const [amountToAdd, setAmountToAdd] = useState("");
    
    const handleAdd = () => {
        const price = parseFloat(amountToAdd);
        if(!isNaN(price) && price > 0){
            setBalance((prev)=> prev + price);
            setAmountToAdd('')
            setOpen(false)
        }else{
          alert("Amount is not valid")  
        }
    }

  return (
    <Box  textAlign="center" mt={4} sx={{background:"#9b9b9b", borderRadius:"10px", width: "30%",
    height: "220px", display:"flex", justifyContent:"center",alignItems:"center", flexDirection:"column"}}>
        <Typography variant='h4'>Wallet Balance : ${balance.toFixed(2)}</Typography>
        <Button type="button" label="+ Add Income" variant="contained" onClick={()=>setOpen(true)} sx={{ mt: 2 , background:"#51d331ff"}}>+ Add Income</Button>

        <Modal open={open} onClose={()=>setOpen(false)}>
            <Box sx={modalStyle}>
                <Typography variant='h3' mb={2}>Add Balance</Typography>
                <Box spacing={3}>
                    <TextField 
                    name="IncomeAmount"
                    value={amountToAdd}
                    label="Income Amount"
                    placeholder="Income Amount"
                    onChange={(e)=>setAmountToAdd(e.target.value)}
                    type="number" sx={{marginRight:"10px"}}
                    />
                    <Button type="submit" variant='contained' size="medium" onClick={handleAdd} sx={{marginRight:"10px", marginTop:"10px",background:"#ce801aff"}}>Add Balance</Button>
                    <Button variant='outlined' size="medium" onClick={()=>setOpen(false)} sx={{marginTop:"10px"}}>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    </Box>
  );
}

export default Wallet;
