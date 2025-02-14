import { FaAward, FaPerson, FaWallet } from "react-icons/fa6";
import Layout from "../../components/Layout";
import { fetchDashboardCount } from "../../lib/action";
import StockStatisticsChart from "../../components/StockStatisticsChart";
import { calcRole } from "../../utils/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import DashboardCard from "../../components/ui/DashboardCard";
const Dashboard = async () => {
  const cookieStore = await cookies();
  const userData = cookieStore.get("user_data")?.value;
  const token = cookieStore.get("access_token")?.value;
  // Parse user data
  if (!userData) {
    redirect("/login");
  }
  const user = JSON.parse(userData);

  // Fetch data only if role is 1
  let count = {};
  if (user.role_id === 1 && token) {
    let data = await fetchDashboardCount(token);
    console.log(data.counts);
    count = data.counts;
  }

  return (
    <Layout>
      {user.role_id === 1 ? (
        <div className="p-2">
          <h1 className="text-h6 font-semibold mb-4">DashBoard</h1>
          <main className="flex flex-col lg:flex-row ">
            <section className="mr-4 mb-4 flex-1 text-gray-700 flex justify-between items-center p-4 bg-gradient-to-r from-purple-100 from-10% to-white-500 border rounded-lg">
              <div>
                <h2 className="text-lg font-semibold">Sales Achieved</h2>
                <h2 className="text-lg font-bold">{count.sales_achieved}</h2>
              </div>
              <div className="text-white text-2xl bg-purple-500 w-12 h-12 rounded-full flex justify-center items-center">
                <FaAward />
              </div>
            </section>

            <section className="mr-4 mb-4 flex-1 text-gray-700 flex justify-between items-center p-4 bg-gradient-to-r from-emerald-100 from-10% to-white-500 border rounded-lg">
              <div>
                <h2 className="text-lg font-semibold">Sales Pending</h2>
                <h2 className="text-lg font-bold">{count.sales_pending}</h2>
              </div>
              <div className="text-white text-2xl bg-emerald-500 w-12 h-12 rounded-full flex justify-center items-center">
                <FaWallet />
              </div>
            </section>

            <section className="mr-4 mb-4 flex-1 text-gray-700 flex justify-between items-center p-4 bg-gradient-to-r from-purple-100 from-10% to-white-500 border rounded-lg">
              <div>
                <h2 className="text-lg font-semibold">Total Distributors</h2>
                <h2 className="text-lg font-bold">
                  {count.total_distributors}
                </h2>
              </div>
              <div className="text-white text-2xl bg-purple-500 w-12 h-12 rounded-full flex justify-center items-center">
                <FaPerson />
              </div>
            </section>

            <section className="mr-4 mb-4 flex-1 text-gray-700 flex justify-between items-center p-4 bg-gradient-to-r from-emerald-100 from-10% to-white-500 border rounded-lg">
              <div>
                <h2 className="text-lg font-semibold">Total Retailers</h2>
                <h2 className="text-lg font-bold">{count.total_retailors}</h2>
              </div>
              <div className="text-white text-2xl bg-emerald-500 w-12 h-12 rounded-full flex justify-center items-center">
                <FaPerson />
              </div>
            </section>
          </main>

          <StockStatisticsChart />
        </div>
      ) : (
        <div className="mt-10">
          <h1 className="text-center text-2xl font-semibold">
            Welcome <span className="text-primary">{user.name}</span> to TCIMAX
            MIS APP
          </h1>
          <p className="text-center">
            You are logged in as {calcRole(user.role_id)}
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
