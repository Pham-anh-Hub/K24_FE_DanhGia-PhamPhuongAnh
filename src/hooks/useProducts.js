import { useCallback, useEffect, useState } from "react";
import { createProduct, getProducts } from "../utils/productsApi";


export function useGetProducts(params = { page: 1, limit: 10 }) {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)

    const fetchProducts = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await getProducts(params)
            setProducts(data);
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.message ||
                "Không thể tải danh sách sản phẩm";
            setError(message);
        } finally {
            setLoading(false)
        }
    }, [params.page, params.limit])

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts])

    return { products, loading, error, refetch: fetchProducts }
}


export function useAddNewProduct() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const addProduct = async (payload) => {
        setLoading(true);
        setError(null);
        try {
            const data = await createProduct(payload);
            return data;
        } catch (err) {
            const message = err.response?.data?.message || "Thêm sản phẩm thất bại";
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };
    return { addProduct, loading, error };
}