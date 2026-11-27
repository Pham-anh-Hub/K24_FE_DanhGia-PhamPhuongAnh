import sampleProducts from "../data/sample"
import { categories } from "../../mock-api/data"
import { use, useCallback, useState } from "react"
import axios from "axios"
import { getProducts } from "../utils/productsApi"
import { useGetProducts } from "../hooks/useProducts"
import { FormAddProduct } from "./formAddProduct"



export function DataTable() {
    const { products, loading, error, refetch } = useGetProducts({ page: 1, limit: 10 });
    const [openFormAdd, setOpenFormAdd] = useState(false)
    if (loading) {
        return (
            <div className="loading" data-testid="loading">
                Đang tải...
            </div>
        );
    }
    if (error) {
        return (
            <div className="error-box">
                <p className="error-message" data-testid="error-message">
                    {error}
                </p>
                <button
                    type="button"
                    className="retry-button"
                    data-testid="retry-button"
                    onClick={refetch}
                >
                    Thử lại
                </button>
            </div>
        );
    }
    if (!Array.isArray(products) || products.length === 0) {
        return (
            <div className="empty-state" data-testid="empty-state">
                Không có sản phẩm
            </div>
        );
    }


    return (
        <div className="dataTable">
            <div className="title-btn">
                <h2>Sản phẩm</h2>
                <button onClick={() => setOpenFormAdd(true)}>Thêm sản phẩm</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>SKU</th>
                        <th>Danh mục</th>
                        <th>Giá</th>
                        <th>Tồn kho</th>
                        <th>Trạng thái</th>
                        <th colSpan={2}>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td data-label="Tên">{product.name}</td>
                            <td data-label="SKU">{product.sku}</td>
                            <td data-label="Danh mục">
                                {categories.find((c) => c.id == product.category)?.name}
                            </td>
                            <td data-label="Giá">
                                <span>{product.price.toLocaleString("vi-VN")}<u>đ</u></span>
                            </td>
                            <td data-label="Tồn kho">
                                {product.stock <= 0
                                    ? <span style={{ color: "#B81C1D", fontWeight: "500" }}>Hết hàng</span>
                                    : product.stock}
                            </td>
                            <td data-label="Trạng thái">
                                <div className={product.status === "active" ? "stock-active" : "stock-inactive"}>
                                    {product.status === "active" ? "Đang bán" : "Ngừng bán"}
                                </div>
                            </td>
                            <td data-label="Thao tác" >
                                <div className="action-btn">
                                    <button className="edit-btn">Sửa</button>
                                    <button className="del-btn">Xóa</button>
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {openFormAdd && (
                <FormAddProduct onClose={() => setOpenFormAdd(false)}
                    onSuccess={() => {
                        setOpenFormAdd(false)
                        refetch()
                    }} />
            )}
        </div>
    )
}