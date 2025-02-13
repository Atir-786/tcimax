const colorMap = {
  purple: "purple",
  emerald: "emerald",
  blue: "blue",
  red: "red",
};
const DashboardCard = ({ title, value, icon, color }) => {
  return (
    <section
      className={`flex justify-between items-center p-6 bg-gradient-to-r from-${
        colorMap[color] || "gray"
      }-100 to-white border rounded-lg shadow-md transition-transform transform hover:scale-105`}
    >
      <div>
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <h2 className="text-xl font-bold text-gray-900">{value}</h2>
      </div>
      <div
        className={`text-white text-2xl bg-${
          colorMap[color] || "gray"
        }-500 w-12 h-12 rounded-full flex justify-center items-center`}
      >
        {icon}
      </div>
    </section>
  );
};
export default DashboardCard;
