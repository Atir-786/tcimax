import Cookies from "js-cookie";
import API_URLS from "../config/apiUrls";

const setNotification = async (message) => {
  const accessToken = Cookies.get("access_token");
  const userData = Cookies.get("user_data");
  const user = JSON.parse(userData);
  try {
    const notificationData = new FormData();
    notificationData.append("message", `${user.name} ${message}`);
    notificationData.append("user_id", user.id);
    notificationData.append("role_id", user.role_id);
    const response = await fetch(API_URLS.ADD_MESSAGE, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: notificationData,
    });
    const d = await response.json();
    console.log(d);
    console.log("message added successfully");
  } catch (error) {
    console.log(error);
  }
};
export { setNotification };
