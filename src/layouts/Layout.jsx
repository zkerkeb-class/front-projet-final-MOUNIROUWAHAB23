import { useLocation, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

export default function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}
