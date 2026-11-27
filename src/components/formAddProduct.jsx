import { useState } from "react";
import { categories } from "../../mock-api/data";
import { useAddNewProduct } from "../hooks/useProducts";

export function FormAddProduct({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        category: categories[0]?.id || "keyboard",
        price: "",
        stock: "",
        status: "active",
    });

    const { addProduct, loading, error } = useAddNewProduct();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addProduct({
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
            });
            onSuccess(); // Đóng modal & refetch lại bảng
        } catch {
            // Lỗi đã được lưu trong biến `error` của hook
        }
    };

    return (
        <div className="layout">
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <h2>Thêm mới sản phẩm</h2>
                    <div onClick={onClose}>&#10540;</div>
                </div>

                <div className="form-content">
                    {error && (
                        <p className="error-message" style={{ color: "#B81C1D", margin: 0 }}>
                            {error}
                        </p>
                    )}

                    <div className="form-item">
                        <label htmlFor="name">Tên sản phẩm</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                            placeholder="VD: Bàn phím cơ K87"
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="sku">Mã tồn kho (SKU)</label>
                        <input
                            type="text"
                            id="sku"
                            name="sku"
                            onChange={handleChange}
                            value={formData.sku}
                            placeholder="VD: KEY-9999"
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="category">Danh mục</label>
                        <select
                            name="category"
                            id="category"
                            onChange={handleChange}
                            value={formData.category}
                        >
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-item">
                        <label htmlFor="price">Giá</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            onChange={handleChange}
                            value={formData.price}
                            placeholder="VD: 1290000"
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="stock">Tồn kho</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            onChange={handleChange}
                            value={formData.stock}
                            placeholder="VD: 10"
                        />
                    </div>

                    <div className="form-item">
                        <label htmlFor="status">Trạng thái</label>
                        <select
                            id="status"
                            name="status"
                            onChange={handleChange}
                            value={formData.status}
                        >
                            <option value="active">Đang bán</option>
                            <option value="inactive">Ngừng bán</option>
                        </select>
                    </div>
                </div>

                <div className="btn-block">
                    <button type="submit" className="add-btn" disabled={loading}>
                        {loading ? "Đang lưu..." : "Thêm"}
                    </button>
                    <button type="button" className="edit-btn" onClick={onClose}>
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
}