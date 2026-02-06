import { logoutApi } from "../../../services/auth";
import { NavLink } from 'react-router-dom';

export function SideBar({ mobileSideBar }) {

  const handleClick = async () => {
    await logoutApi();
    window.location.href='/admin/login';

  }
  return (
    <div className={`sidebar ${mobileSideBar ? 'show' : '' }`} id="sidebar">
      <h2>Admin Panel</h2>

      <div className="sidebar-menu">
        <NavLink to='/admin/dashboard/' className={ ({ isActive }) => isActive ? 'active' : '' }>Dashboard</NavLink>
        <NavLink to='/admin/products/' className={ ({ isActive }) => isActive ? 'active' : '' }>Products</NavLink>
        <NavLink to='/admin/orders/' className={ ({ isActive }) => isActive ? 'active' : '' }>Orders</NavLink>
        <NavLink to='/admin/customers/' className={ ({ isActive }) => isActive ? 'active' : '' }>Customers</NavLink>
      </div>

      <a className="logout-btn" onClick={handleClick}>
        Logout
      </a>
    </div>
  );
}
