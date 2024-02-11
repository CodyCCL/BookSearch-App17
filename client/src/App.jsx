import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import { ApolloProvider } from '@apollo/client';

function App() {
  return (
    <>
    <ApolloProvider>
      <Navbar />
      <Outlet />
      </ApolloProvider>
    </>
  );
}

export default App;
