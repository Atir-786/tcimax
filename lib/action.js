import API_URLS from "../config/apiUrls";

async function fetchDashboardCount(token) {
  if (!token) return { error: "Unauthorized" };

  const res = await fetch(API_URLS.GET_DASHBOARD, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.ok ? res.json() : { error: res.statusText };
}
const fetchUsers = async (token, page, rows, role) => {
  if (!token) return { error: "Unauthorized" };

  const res = await fetch(`${API_URLS.USERS}/${page}/${rows}/${role}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.ok ? res.json() : { error: res.statusText };
};
const fetchUsersByRoleId = async (token, role) => {
  if (!token) return { error: "Unauthorized" };

  const res = await fetch(`${API_URLS.USERS_BY_ROLEID}/${role}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) {
    const data = await res.json();
    // console.log(data);
    return data.data.users;
  }
  return { error: res.statusText };
};
export { fetchDashboardCount, fetchUsers, fetchUsersByRoleId };
