import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Payment from './pages/Payment';
import { Provider } from './store';

function App() {
  return (
    <Provider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Provider>
  );
}

export default App;

