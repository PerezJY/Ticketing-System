import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const UserLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex-1 min-h-screen bg-gray-100">
        <Navbar />
        <div className="mt-20 md:mt-28 p-4">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
