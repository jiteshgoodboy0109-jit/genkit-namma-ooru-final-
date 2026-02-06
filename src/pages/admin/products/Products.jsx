import { SideBar } from "../components/SideBar";
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import "./adminproducts.css";

export function ProductAdmin() {
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModelOpen] = useState(false);

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
          <h1>Products</h1>

          <div className="header-actions">
            <div className="search-div">
              <HiOutlineSearch size={18} style={{ backgroundColor: "white" }} />
              <input
                value={searchInput}
                type="text"
                className="search-input"
                placeholder="Search by product name"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button className="add-btn">+ Add Product</button>
          </div>
        </div>

        <div className="category-filter">
          <button className="active">All</button>
          <button>Rice</button>
          <button>Oil</button>
          <button>Snacks</button>
          <button>Beverages</button>
        </div>

        <div className="product-grid" id="productBody">
          <div className="admin-product-card">
            <img src="./d" className="product-img" />

            <div className="product-info">
              <h3>Name:</h3>

              <div className="meta">
                <span className="badge">Category</span>
              </div>

              <div className="details">
                <div>
                  <strong>Price:</strong>
                </div>
                <div>
                  <strong>Stock:</strong>
                </div>
              </div>

              <div className="card-footer">
                <div className="actions admin-product-actions">
                  <button
                    className="edit-btn"
                    onClick={() => setIsModelOpen(true)}
                  >
                    Edit
                  </button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className="admin-product-card">
            <img src="./d" className="product-img" />

            <div className="product-info">
              <h3>Name:</h3>

              <div className="meta">
                <span className="badge">Category</span>
              </div>

              <div className="details">
                <div>
                  <strong>Price:</strong>
                </div>
                <div>
                  <strong>Stock:</strong>
                </div>
              </div>

              <div className="card-footer">
                <div className="actions admin-product-actions">
                  <button
                    className="edit-btn"
                    onClick={() => setIsModelOpen(true)}
                  >
                    Edit
                  </button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className="admin-product-card">
            <img src="./d" className="product-img" />

            <div className="product-info">
              <h3>Name:</h3>

              <div className="meta">
                <span className="badge">Category</span>
              </div>

              <div className="details">
                <div>
                  <strong>Price:</strong>
                </div>
                <div>
                  <strong>Stock:</strong>
                </div>
              </div>

              <div className="card-footer">
                <div className="actions admin-product-actions">
                  <button
                    className="edit-btn"
                    onClick={() => setIsModelOpen(true)}
                  >
                    Edit
                  </button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={`modal product-modal-admin ${isModalOpen ? "open" : ""}`}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2 id="modalTitle">Add Product</h2>
              <button
                className="close-btn"
                onClick={() => setIsModelOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body ">
              <div className="image-upload">
                <label className="image-box">
                  <input type="file" id="pimg" accept="image/*" />
                  <img id="mainPreview" />
                  <span className="placeholder">Click to upload image</span>
                </label>
              </div>

              <div className="form-grid">
                <input id="pname" placeholder="Product Name" />

                <input id="pprice" type="number" placeholder="Price" />

                <input
                  id="pdiscount"
                  type="number"
                  placeholder="Discount (%)"
                />

                <input id="pqty" type="number" placeholder="Stock" />

                <select id="punit">
                  <option value="">Select Unit</option>
                  <option>1 kg</option>
                  <option>500 g</option>
                  <option>1 L</option>
                  <option>250 g</option>
                </select>

                <button className="save-btn">Save Product</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
