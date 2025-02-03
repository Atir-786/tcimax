import AddUserLayout from "../../components/AddUserLayout";
import API_URLS from "../../config/apiUrls";

export default function AddDistributor() {
  return (
    <AddUserLayout role={4} name="distributors" url={API_URLS.ADD_BULK_USERS} />
  );
}
