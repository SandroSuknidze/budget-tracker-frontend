import axiosInstance from "./axios-instance.js";

async function transactionsCategoryCheck(categoryId, authState) {
    try {
        const response = await axiosInstance.get(`/categories/${categoryId}/transactions`, {
            headers: {
                Authorization: `${authState}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error checking category transactions:', error);
        return false;
    }
}

export default transactionsCategoryCheck;