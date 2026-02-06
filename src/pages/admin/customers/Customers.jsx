import { useState,useEffect } from "react";
import { SideBar } from "../components/SideBar";
import { HiOutlineSearch } from "react-icons/hi";
import  DateFormat from '../utils/dateformatter';
import "./customers.css";
import api from "../../../services/api";
import { getCustomers } from "../../../services/admin/customer";
import { useSearchParams } from "react-router-dom";



export function Customers() {
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [customersData, setCustomersData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (searchInput.trim() === "") {
        setSearchParams({});
      } else {
        setSearchParams({
          search: searchInput.trim(),
        });
      }
    }
  };

  const search = searchParams.get("search") || "";
  
  

  useEffect(() => {
    const controller = new AbortController();

    const getCustomersData = async () => {
      try {
        const res = await getCustomers({ search });
        console.log(res.data);
        setCustomersData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCustomersData();
    return () => {
      controller.abort();
    };
  }, [search]);


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
          <h1 className="orders-label">Customers</h1>
          <div className="header-actions customers-header-actions">
            <div className="search-div">
              <HiOutlineSearch size={18} style={{ backgroundColor: "white" }} />
              <input
                value={searchInput}
                type="text"
                id="searchInput"
                className="search-input"
                placeholder="Search by phone no or name"
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  handleKeyDown(e);
                }}
              />
            </div>
          </div>
        </div>
        {customersData.length == 0 ? (
          <div className="no-customer-message">No Customer List</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone No</th>
                <th>Email</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
              </tr>
            </thead>
            <tbody id="ordersBody">
              {customersData.map((customer) => (
                <tr key={customer.id} className="tr-customer">
                  <td data-label="Name">{customer.name}</td>
                  <td data-label="Phone No">{customer.phone_no}</td>
                  <td data-label="email">{customer.email}</td>
                  <td data-label="Total Orders" className="total-orders-customer">{customer.total_orders}</td>
                  <td data-label="Total Spent">₹{customer.total_spent}</td>
                  <td data-label="Last Order">{DateFormat(customer.last_order_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
