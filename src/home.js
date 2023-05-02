import React, { useState, useEffect } from 'react';

const initState = {
  accounts: [
    {
      id: 1,
      customerName: 'Israa Othman',
      accountNumber: '123456',
      accountType: 'Savings',
    },
    {
      id: 2,
      customerName: 'Ahmad Zahran',
      accountNumber: '987654',
      accountType: 'Student accounts',
    },
  ],
};

function Header() {
  return (
    <header>
      <h1>My Bank</h1>
    </header>
  );
}

function Main({ accounts, handleAddAccount, handleDeleteAccount }) {
  return (
    <main>
      <AccountForm handleAddAccount={handleAddAccount} />
      <div>
        {accounts.map((account) => (
          <div key={account.id}>
            <h2>{account.customerName}</h2>
            <p>Account Number: {account.accountNumber}</p>
            <p>Account Type: {account.accountType}</p>
            <button onClick={() => handleDeleteAccount(account)}>
              Delete Account
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

function Footer({ numberOfAccounts }) {
  return (
    <footer>
      <p>Total accounts: {numberOfAccounts}</p>
    </footer>
  );
}

function AccountForm({ handleAddAccount }) {
  const [customerName, setCustomerName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAccount = {
      id: Date.now(),
      customerName,
      accountNumber,
      accountType,
    };
    handleAddAccount(newAccount);
    setCustomerName('');
    setAccountNumber('');
    setAccountType('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(event) => setCustomerName(event.target.value)}
      />
      <input
        type="text"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(event) => setAccountNumber(event.target.value)}
      />
      <input
        type="text"
        placeholder="Account Type"
        value={accountType}
        onChange={(event) => setAccountType(event.target.value)}
      />
      <button type="submit">Add Account</button>
    </form>
  );
}

function Home() {
  const [accounts, setAccounts] = useState(initState.accounts);
  const [numberOfAccounts, setNumberOfAccounts] = useState(
    initState.accounts.length
  );

  useEffect(() => {
    const storedAccounts = localStorage.getItem('accounts');
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts));
      setNumberOfAccounts(JSON.parse(storedAccounts).length);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  const handleAddAccount = (newAccount) => {
    setAccounts([...accounts, newAccount]);
    setNumberOfAccounts(numberOfAccounts + 1);
  };

  const handleDeleteAccount = (accountToDelete) => {
    const filteredAccounts = accounts.filter(
      (account) => account.id !== accountToDelete.id
    );
    setAccounts(filteredAccounts);
    setNumberOfAccounts(numberOfAccounts - 1);
  };

  return (
    <div>
      <Header />
      <Main
        accounts={accounts}
        handleAddAccount={handleAddAccount}
        handleDeleteAccount={handleDeleteAccount}
      />
      <Footer numberOfAccounts={numberOfAccounts} />
    </div>
  );
}

export default Home;
