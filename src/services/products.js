import api from "./api";

export const getHomeProducts = async () => {
    try {
        const res = await api.get("/products/home/");
        return res.data;
    } catch (error) {
        console.error("Home products error:", error);
        return [];
    }
};

export const getAllProducts = async () => {
    try {
        const res = await api.get("/products/list-products/");
        return res.data;
    } catch (error) {
        console.error("All products error:", error);
        return [];
    }
};