export const BASE_URL = "http://localhost:8000";


// UTILS API PATH .JS 
export const API_PATHS = {
    // AUTH
    AUTH: {
        LOGIN: "api/v1/auth/login",
        REGISTER: "api/v1/auth/register",
       GET_USER_INFO: "api/v1/auth/getuser",
    },
    DASHBOARD :{
        GET_DATA: "api/v1/dashboard",
    },
    INCOME : {
        ADD_INCOME: "api/v1/income/add",
        GET_ALL_INCOME: "api/v1/income/get",
        DELETE_INCOME:(IncomeId)=> `api/v1/income/${IncomeId}`,
        DOWNLOAD_INCOME: `api/v1/income/downloadexcel`,

    },
    EXPENSE : {
        ADD_EXPENSE: "api/v1/expense/add",
        GET_ALL_EXPENSE: "api/v1/expense/get",
        DELETE_EXPENSE:(expenseId)=> `api/v1/expense/${expenseId}`,
        DOWNLOAD_EXPENSE: `api/v1/expense/downloadexcel`,
    },
    IMAGE: {
        UPLOAD_IMAGE: "api/v1/auth/upload-image",
    },
};
