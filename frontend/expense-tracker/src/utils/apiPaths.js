export const BASE_URL = "http://localhost:8000";

// UTILS API PATH .JS 
export const API_PATHS = {
    // AUTH
    AUTH: {
        LOGIN: "/api/v1/auth/login", // Added leading slash
        REGISTER: "/api/v1/auth/register", // Added leading slash
        GET_USER_INFO: "/api/v1/auth/getUser", // Added leading slash
    },
    DASHBOARD: {
        GET_DATA: "/api/v1/dashboard", // Added leading slash
    },
    INCOME: {
        ADD_INCOME: "/api/v1/income/add", // Added leading slash
        GET_ALL_INCOME: "/api/v1/income/get", // Added leading slash
        DELETE_INCOME: (IncomeId) => `/api/v1/income/${IncomeId}`, // Added leading slash
        DOWNLOAD_INCOME: `/api/v1/income/downloadexcel`, // Added leading slash
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/v1/expense/add", // Added leading slash
        GET_ALL_EXPENSE: "/api/v1/expense/get", // Added leading slash
        DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`, // Added leading slash
        DOWNLOAD_EXPENSE: `/api/v1/expense/downloadexcel`, // Added leading slash
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/v1/auth/upload-image", // Added leading slash
    },
};