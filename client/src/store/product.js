import { create } from "zustand"

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields" }
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        // console.log(res.status); // Log the status code

        const data = await res.json()
        console.log(data); // Log the raw response body



        set((state) => ({ products: [...state.products, data.data] }));
        return {
            success: true, message: "Product Creatd Successfully"

        }
    },

    fetchProducts: async () => {
        const res = await fetch("/api/products")
        const data = await res.json()
        set({ products: data.data })
    },

    deleteProducts: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE",
        })
        const data = await res.json()
        if (!data.success) return { success: false, message: data.message }
        //update the UI immediatel without needing a refresh
        set(state => ({ products: state.products.filter(product => product._id !== pid) }))
        return { success: true, message: data.message }
    },

    updateProducts: async (pid, updatedProducts) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProducts)
        })
        const data = await res.json()
        if (!data.success) return { success: false, message: data.message }

        // update the UI immediately without refreshing
        set((state) => ({
            products: state.products.map((product) => (product._id === pid ? data.data : product)),
        }))

        return { success: true, message: data.message }

    },
}))


