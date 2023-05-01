import React, { useState, useEffect } from 'react';

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
            <h2>{account.name}</h2>
            <p>Balance: {account.balance}</p>
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
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAccount = { id: Date.now(), name, balance };
    handleAddAccount(newAccount);
    setName('');
    setBalance(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Account Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="number"
        placeholder="Starting Balance"
        value={balance}
        onChange={(event) => setBalance(event.target.value)}
      />
      <button type="submit">Add Account</button>
    </form>
  );
}

function Home() {
  const [accounts, setAccounts] = useState([]);
  const [numberOfAccounts, setNumberOfAccounts] = useState(0);

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
