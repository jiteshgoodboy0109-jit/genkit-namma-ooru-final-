import { useState } from "react";
import { UpdateOrderStatus } from "../../../services/admin/order";

export function AdminModal({ order, closeModal, refreshOrders }) {
  const [newStatus, setNewStatus] = useState(order.order_status);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      await UpdateOrderStatus(order.order_number, newStatus);
      refreshOrders();
      closeModal();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={`modal modal-opened`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Change Order Status</h2>
          <span className="close" onClick={() => closeModal()}>
            ×
          </span>
        </div>

        <div className="modal-body">
          <p className="order-no">
            Order No: <span>{order.order_number}</span>
          </p>
          <select
            className="status-select"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <button
            className="save-btn"
            onClick={handleUpdate}
            disabled={isLoading}
          >
            {isLoading ? "Updating" : "Update Status"}
          </button>
        </div>
      </div>

    </div>
  );
}
