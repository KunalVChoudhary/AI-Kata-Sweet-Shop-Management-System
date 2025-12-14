import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./CreateSweet.module.scss";

export default function CreateSweet({ setSweetsArray }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  //form data's state
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  //handles change in form data
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateSweet = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/sweets`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
            quantity: Number(formData.quantity),
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create sweet");
      }

      const newSweet = await res.json();

      // update UI
      setSweetsArray((prev) => [newSweet, ...prev]);

      toast.success("Sweet created successfully 🍭");
      setShowModal(false);
      setFormData({ name: "", category: "", price: "", quantity: "" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BUTTON */}
      <button
        className="btn btn-success"
        onClick={() => setShowModal(true)}
      >
        Create Sweet
      </button>

      {/* MODAL */}
      {showModal && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button
              className={styles.closeBtn}
              onClick={() => setShowModal(false)}
            >
              ✖
            </button>

            <h5 className="mb-3">Create New Sweet</h5>

            <form onSubmit={handleCreateSweet}>
              <input
                className="form-control mb-2"
                placeholder="Sweet name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-2"
                placeholder="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                className="form-control mb-2"
                placeholder="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                className="form-control mb-3"
                placeholder="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Sweet"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
