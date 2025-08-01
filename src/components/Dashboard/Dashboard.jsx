import { useEffect, useState } from 'react';
import Wallet from '../Wallet/Wallet';
import Expenses from '../Expenses/Expenses';
import ExpenseList from '../ExpenseList/ExpenseList';
import ExpenseSummary from '../ExpenseSummary/ExpenseSummary';
import ExpenseTrends from '../ExpenseTrends/ExpenseTrends';
import AddExpenseModal from '../AddExpenseModal/AddExpenseModal';
import EditExpenseModal from '../EditExpenseModal/EditExpenseModal';
import '../Dashboard/Dashboard.css';

const Dashboard = () => {
  const [balance, setBalance] = useState(() => {
    const stored = localStorage.getItem("walletBalance");
    return stored ? parseFloat(stored) : 5000;
  });

  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem('expenses');
    return stored ? JSON.parse(stored) : [];
  });

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("walletBalance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses(prev => [...prev, expense]);
    setBalance(prev => prev - expense.price);
  };

  const handleEdit = (expense) => {
    setExpenseToEdit(expense);
    setOpenEditModal(true);
  };

  const updateExpense = (updatedExpense, amountDiff) => {
    setExpenses(prev =>
      prev.map(exp => (exp.id === updatedExpense.id ? updatedExpense : exp))
    );
    setBalance(prev => prev - amountDiff);
  };

  const deleteExpense = (id, price) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
    setBalance(prev => prev + price);
  };

  const total = expenses.reduce((acc, expense) => acc + expense.price, 0);

  return (
    <>
      <div className='Wcontainer'>
      
        <Wallet balance={balance} setBalance={setBalance} />

        {/* Add Expense button */}
        <Expenses total={total} onAddClick={() => setOpenModal(true)} />
             {/* Summary and Trends */}
        <ExpenseSummary expenses={expenses} />
        
        </div>
        <div style={{display:"flex", justifyContent:"space-between"}}>
        {/* Modals */}
        {openModal && (
          <AddExpenseModal
            open={openModal}
            handleClose={() => setOpenModal(false)}
            addExpense={addExpense}
            balance={balance}
          />
        )}

        {openEditModal && expenseToEdit && (
          <EditExpenseModal
            open={openEditModal}
            handleClose={() => setOpenEditModal(false)}
            expense={expenseToEdit}
            updateExpense={updateExpense}
            balance={balance}
          />
        )}

        {/* Expense List now rendered here */}
        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={deleteExpense}
        />
         
        <ExpenseTrends expenses={expenses} />          
      </div>
    </>
  );
};

export default Dashboard;
