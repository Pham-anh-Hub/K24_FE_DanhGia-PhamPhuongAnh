import axios from "axios"


// Tạo instance dùng chung 

const apiClient = axios.create({
    baseURL: "/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
})


export async function getProducts({ page = 1, limit = 10 } = {}) {
    const response = await apiClient.get("/products", {
        params: { page, limit }
    })

    return response.data.data;
}

export async function createProduct(payload) {
    const response = await apiClient.post("/products", payload);
    return response.data;
}



