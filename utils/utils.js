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
const formatDate = (date) => {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export { formatTimeAgo, calcRole, formatDate };
