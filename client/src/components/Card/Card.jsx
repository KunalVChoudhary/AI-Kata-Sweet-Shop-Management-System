import { useAuth } from "../../hooks/useAuth"
import { useState } from "react";
import styles from './Card.module.scss'
import { toast } from "react-toastify";

export default function Card({cardDetail, setSweetsArray}) {

    const {role} = useAuth()
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [restockQty, setRestockQty] = useState("");
    const [editData, setEditData] = useState({
        name: cardDetail.name,
        price: cardDetail.price,
        category: cardDetail.category,
        quantity: cardDetail.quantity
    });

    //function to handle users purchase of item
    const handlePurchase = async (sweetId) => {
    try {
        const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/sweets/${sweetId}/purchase`,
        {
            method: "POST",
            credentials: "include",
        }
        );

        if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Purchase failed");
        }

        const updatedSweet = await res.json();

        setSweetsArray((prev) =>
        prev.map((sweet) =>
            sweet._id === sweetId
            ? { ...sweet, quantity: updatedSweet.quantity }
            : sweet
        )
        );

        toast.success("Sweet purchased successfully ");
    } catch (error) {
        toast.error(error.message || "Purchase failed");
    }
    };


    //function to handle admins delete request
    const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this sweet?")) return;

    try {
        const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/sweets/${cardDetail._id}`,
        {
            method: "DELETE",
            credentials: "include",
        }
        );

        if (!res.ok) throw new Error("Delete failed");

        setSweetsArray((prev) =>
        prev.filter((sweet) => sweet._id !== cardDetail._id)
        );

        toast.success("Sweet deleted successfully ");
    } catch (error) {
        toast.error("Delete failed");
    }
    };


    //function to handle admins restock request
    const handleRestock = async () => {
    try {
        const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/sweets/${cardDetail._id}/restock`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ quantity: Number(restockQty) }),
        }
        );

        if (!res.ok) throw new Error("Restock failed");

        const updatedSweet = await res.json();

        setSweetsArray((prev) =>
        prev.map((sweet) =>
            sweet._id === cardDetail._id
            ? { ...sweet, quantity: updatedSweet.quantity }
            : sweet
        )
        );

        setRestockQty("");
        toast.success("Sweet restocked successfully ");
    } catch (error) {
        toast.error("Restock failed");
    }
    };


    //function to handle admins update info request
    const handleUpdate = async () => {
    try {
        const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/sweets/${cardDetail._id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(editData),
        }
        );

        if (!res.ok) throw new Error("Update failed");

        const updatedSweet = await res.json();

        setSweetsArray((prev) =>
        prev.map((sweet) =>
            sweet._id === cardDetail._id ? updatedSweet : sweet
        )
        );

        toast.success("Sweet updated successfully ");
    } catch (error) {
        toast.error("Update failed");
    }
    };




    return(
        <>
            <div className="card" style={{ width: "18rem" }}>
                <img src="./app_icon.png" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{cardDetail.name}</h5>
                    <p className="card-text py-1 m-0">Quanity: {cardDetail.quantity}</p>
                    <p className="card-text py-1 m-0">Category: {cardDetail.category}</p>
                    <p className="card-text py-1 m-0">Price: ${cardDetail.price}</p>
                    {
                        role=='ADMIN'? 
                        <button className="btn btn-warning" onClick={() => setShowAdminModal(true)}>More Options</button>
                        :
                        <button onClick={() => handlePurchase(cardDetail._id)} className="btn btn-primary">Purchase</button>
                    }
                </div>
            </div>


        {/* admin option for aadmin options*/}
        {showAdminModal && (
            <div className={styles['overlay']}>
            <div className={styles['modal']}>
                <button
                className={styles['closeBtn']}
                onClick={() => setShowAdminModal(false)}
                >
                ✖
                </button>

                <h5 className="mb-3">Admin Actions</h5>

                {/* restock */}
                <input
                type="number"
                className="form-control mb-2"
                placeholder="Restock quantity"
                value={restockQty}
                onChange={(e) => setRestockQty(e.target.value)}
                />
                <button className="btn btn-success w-100 mb-3" onClick={handleRestock}>
                Restock
                </button>

                {/* update */}
                <input
                className="form-control mb-2"
                placeholder="Name"
                value={editData.name}
                onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                }
                />
                <input
                className="form-control mb-2"
                placeholder="Price"
                value={editData.price}
                onChange={(e) =>
                    setEditData({ ...editData, price: e.target.value })
                }
                />
                <button className="btn btn-primary w-100 mb-3" onClick={handleUpdate}>
                Update Info
                </button>

                {/* delete */}
                <button className="btn btn-danger w-100" onClick={handleDelete}>
                Delete Sweet
                </button>
            </div>
        </div>
        )}
        </>
    )
}

