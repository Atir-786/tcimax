const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_URLS = {
  LOGIN: `${BASE_URL}/login`,
  LOGOUT: `${BASE_URL}/logout`,
  REGISTER: `${BASE_URL}/register`,
  USERS: `${BASE_URL}/users`,
  GET_SALES_QUEUE: `${BASE_URL}/getSalesQueue`,
  ADD_BULK_SALES: `${BASE_URL}/addbulksales`,
  ADD_BULK_USERS: `${BASE_URL}/addbulkusers`,
  // ADD_BULK_DISTRIBUTORS: `${BASE_URL}/addbulkdistributors`,
};
export default API_URLS;
