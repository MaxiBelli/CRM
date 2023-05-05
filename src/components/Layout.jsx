import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="md:flex md:min-h-screen">
      <h2 className="text-4xl font-black text-center text-white">
        CRM - Clients
      </h2>

      <Outlet />
    </div>
  );
}

export default Layout;
