const baseUrl = "http://localhost:8000";

export const generatePublicUrl = (fileName) => {
    return `${baseUrl}/public/images/${fileName}`
}