import React, { useState } from "react";
import "./records.css"; // Import the CSS file

type Transaction = {
  id: number;
  name: string;
  date: string;
  category: string;
  amount: number;
  type: "Income" | "Expense";
};

const Records: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories] = useState<string[]>(["Food", "Transport", "Shopping", "Entertainment", "Rent", "Salary", "Investment" , "Coupons" , "Grants" , "Refunds" , "Lottery" , "Awards" , "Baby" , "Beauty" , "Bills" , "Car" , "Clothing" , "Education" , "Electronics" , "Health" , "Home" , "Insurance" ,"Social" , "Sports" , "Tax" , "Telephone" ]);

  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: 0,
    name: "",
    date: "",
    category: categories[0],
    amount: 0,
    type: "Expense",
  });

  const handleAddTransaction = () => {
    if (!newTransaction.name || !newTransaction.date || newTransaction.amount <= 0) {
      alert("Please fill in all the fields correctly.");
      return;
    }

    setTransactions([...transactions, { ...newTransaction, id: Date.now() }]);
    setNewTransaction({
      id: 0,
      name: "",
      date: "",
      category: categories[0],
      amount: 0,
      type: "Expense",
    });
  };

  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
  };

  return (
    <div className="container">
      {/* Transaction Form */}
      <div className="form-container">
        <h2 className="heading">Add Transaction</h2>

        <input
          type="text"
          placeholder="Enter transaction name"
          value={newTransaction.name}
          onChange={(e) => setNewTransaction({ ...newTransaction, name: e.target.value })}
        />

        <input
          type="date"
          placeholder="Select date"
          value={newTransaction.date}
          onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
        />
         <div className="selectcateg" >
        <select
          value={newTransaction.category}
          onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })} 
          >
          <option value="" disabled>Select category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
          
                   </div>

        <input
          type="number"
          placeholder="Enter amount"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
        />
          <div className="selectcateg" >
        <select
          value={newTransaction.type}
          onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as "Income" | "Expense" })}
          >
          <option value="" disabled>Select type</option>
          <option value="Expense">Expense</option>
          <option value="Income">Income</option>
        </select>
          
                    </div>

        <button onClick={handleAddTransaction}>Add Transaction</button>

        <section className="lastquote">
          <p>
            "Wealth is not about having a lot of money; it’s about having a lot of options..."
          </p>
          <p className="writer">– Inspired by Chris Rock and modern financial freedom principles.</p>
        </section>
      </div>

      {/* Transactions Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className={tx.type === "Income" ? "income" : "expense"}>{tx.type}</td>
                  <td>{tx.date}</td>
                  <td>{tx.category}</td>
                  <td>${tx.amount}</td>
                  <td>{tx.name}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteTransaction(tx.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "#999" }}>No transactions added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Records;