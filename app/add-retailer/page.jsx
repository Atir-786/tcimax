import AddUserLayout from "../../components/AddUserLayout";
import API_URLS from "../../config/apiUrls";
export default function AddRetailer() {
  return (
    <AddUserLayout role={5} name="retailers" url={API_URLS.ADD_BULK_USERS} />
  );
}
