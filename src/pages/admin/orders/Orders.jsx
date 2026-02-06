import "./orders.css";
import { SideBar } from "../components/SideBar";
import { HiOutlineSearch } from "react-icons/hi";
import { useState, useEffect } from "react";
import { getAdminOrders } from "../../../services/admin/order";
import DateFormat from "../utils/dateformatter";
import { useSearchParams } from "react-router-dom";
import { AdminModal } from "./AdminModal";

export function Orders() {
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [isOpenStatusModal, setIsOpenStatusModal] = useState(false);
  const [orders, setOrders] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";

  const [searchInput, setSearchInput] = useState("");

  const [seletedOrder, setSelectedOrder] = useState(null);

  const getOrderData = async () => {
    try {
      const res = await getAdminOrders({ search, status });
      console.log(res.data);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    getOrderData();
    return () => {
      controller.abort();
    };
  }, [search, status]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchInput.trim() === "" && status === "") {
        setSearchParams({});
      } else {
        setSearchParams({
          search: searchInput.trim(),
          status: status,
        });
      }
    }
  };

  return (
    <div>
      <SideBar mobileSideBar={mobileSideBar} />

      <div className="main">
        <div
          className={`overlay ${mobileSideBar ? "show" : ""}`}
          id="overlay"
          onClick={() => setMobileSideBar(false)}
        ></div>

        <div className="page-header">
          <button className="menu-btn" onClick={() => setMobileSideBar(true)}>
            ☰
          </button>
          <h1 className="orders-label">Orders</h1>

          <div className="header-actions">
            <div className="search-div">
              <HiOutlineSearch size={18} style={{ backgroundColor: "white" }} />
              <input
                value={searchInput}
                type="text"
                id="searchInput"
                className="search-input"
                placeholder="Search by order, phone"
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  handleKeyDown(e);
                }}
              />
            </div>

            <select
              className="filter-select"
              value={status}
              onChange={(e) =>
                setSearchParams({ search, status: e.target.value })
              }
            >
              <option value="">All Status </option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {orders.length == 0 ? (
          <div className="no-order-message">No Orders</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order No</th>
                <th>Customer</th>
                <th>Phone No</th>
                <th>Total</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="ordersBody">
              {orders.map((order, index) => (
                <tr key={order.order_number | index}>
                  <td data-label="Order No">{order.order_number}</td>
                  <td data-label="Customer">{order.customer_name}</td>
                  <td data-label="Phone No">{order.phone_no}</td>
                  <td data-label="Total">₹{order.total_amount}</td>
                  <td data-label="Time">{DateFormat(order.created_at)}</td>
                  <td data-label="Status">
                    <span className={`status ${order.order_status}`}>
                      {order.order_status}
                    </span>
                  </td>
                  <td data-label="Action">
                    <button
                      className="action-btn"
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsOpenStatusModal(true);
                      }}
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isOpenStatusModal && (
        <AdminModal
          order={seletedOrder}
          refreshOrders={getOrderData}
          closeModal={() => setIsOpenStatusModal(false)}
        />
      )}
    </div>
  );
}
