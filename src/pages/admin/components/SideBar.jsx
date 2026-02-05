export function SideBar({ mobileSideBar }) {
  return (
    <div className={`sidebar ${mobileSideBar ? 'show' : '' }`} id="sidebar">
      <h2>Admin Panel</h2>

      <div className="sidebar-menu">
        <a href="home.html">Dashboard</a>
        <a href="products.html">Products</a>
        <a href="orders.html" className="active">
          Orders
        </a>
      </div>

      <a className="logout-btn">
        Logout
      </a>
    </div>
  );
}
