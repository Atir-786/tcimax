import { formatDistanceToNow, parseISO } from "date-fns";

const formatTimeAgo = (timestamp) => {
  return formatDistanceToNow(parseISO(timestamp), { addSuffix: true });
};
const calcRole = (id) => {
  switch (id) {
    case 1:
      return "Admin";
    case 2:
      return "Manager";
    case 3:
      return "Data Entry Operator";
    case 4:
      return "Distributor";
    case 5:
      return "Retailer";
    default:
      return "Other";
  }
};
export { formatTimeAgo, calcRole };
