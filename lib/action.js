import API_URLS from "../config/apiUrls";

async function fetchDashboardCount(token) {
  if (!token) return { error: "Unauthorized" };

  const res = await fetch(API_URLS.GET_DASHBOARD, {
    headers: { Authorization: `Bearer ${token}` },
    // cache: "no-store",
  });

  return res.ok ? res.json() : { error: res.statusText };
}

export { fetchDashboardCount };
