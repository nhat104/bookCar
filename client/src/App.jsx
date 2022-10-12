import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import { ClientLayout, AdminLayout } from './layout';
import Admin from './pages/Admin';
import DriverRate from './pages/DriverRate';
import HomePage from './pages/HomePage';
import OrderManagement from './pages/OrderManagement';
import Payment from './pages/Payment';
import Report from './pages/Report';
import { Provider } from './store';

const AuthRoute = ({ type = 'private', children }) => {
  const user = localStorage.getItem('user');
  const layout = type === 'public' ? <ClientLayout /> : <AdminLayout />;
  if (type === 'private' && (!user || !JSON.parse(user).role)) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {layout}
      {children}
    </>
  );
};

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<AuthRoute type="public" />}>
          <Route path="" element={<HomePage />} />
          <Route path="payment" element={<Payment />} />
          <Route path="ticket-info" element={<OrderManagement />} />
        </Route>
        <Route path="/admin" element={<AuthRoute type="private" />}>
          <Route path="" element={<Admin />} />
          <Route path="report">
            <Route path="" element={<Report />} />
            <Route path="driver-rate" element={<DriverRate />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;

