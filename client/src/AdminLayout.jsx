import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Home, MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import WelcomeAnimation from "./components/Admin_components/WelcomeAnimation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useUIStore from "./store/uiStore";

function AdminLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const { isStoreCreated } = useUIStore();
  const storeSlug = useUIStore((state) => state.stroeSlug);

  // detect creat_shop route
  useEffect(() => {
    if (location.pathname.endsWith("/creat_shop")) {
      setShowIntro(true);

      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 11000); // ⬅ must match WelcomeAnimation duration

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // ⛔ show ONLY animation
  if (showIntro) {
    return (
      <div className="overflow-x-hidden">
        <WelcomeAnimation />
      </div>
    );
  }

  return (
    <div className="mainPage min-h-screen flex relative overflow-x-hidden overflow-y-hidden">
      {/* Toggle Sidebar Button */}
      <span
        onClick={() => setOpen(true)}
        className="absolute p-4 z-10 m-2 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white text-2xl font-bold hover:scale-110 transition duration-300 md:hidden"
      >
        <MoveRight />
      </span>

      {/* Sidebar */}
      <aside
        className={`w-full md:w-[25%] h-full absolute inset-0 bg-white text-black p-6 flex flex-col items-center z-10 transform transition-transform duration-300
        md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <span
          onClick={() => setOpen(false)}
          className="absolute left-0 top-0 p-4 m-2 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white text-2xl font-bold hover:scale-110 transition duration-300 md:hidden"
        >
          <MoveLeft />
        </span>

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <motion.div
            drag
            whileHover={{ rotate: 360 }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg cursor-pointer"
          >
            <Home className="text-white text-4xl" />
          </motion.div>

          <motion.h1
            className="mt-4 text-2xl font-extrabold tracking-wide cursor-pointer"
            whileHover={{
              scale: 1.08,
              letterSpacing: "0.15em",
              color: "#f97316",
            }}
          >
            Admin
          </motion.h1>

          <span className="text-sm font-semibold text-orange-500 tracking-widest uppercase">
            Dashboard
          </span>
        </div>
        {!isStoreCreated && (
          <div>
            <div className="relative h-full flex items-center justify-center  mt-11">
              <p
                className="
        absolute
        text-4xl md:text-5xl
        font-bold
        text-gray-700/60
        rotate-45
        select-none
        pointer-events-none
        whitespace-nowrap
      "
              >
                Create your store
              </p>
            </div>
          </div>
        )}

        {isStoreCreated && (
          <div>
            <h2 className="font-bold text-lg mb-6">Shop Dashboard</h2>

            <nav className="space-y-3 text-sm">
              <div className="font-semibold text-gray-500 uppercase">
                Overview
              </div>
              <Link to={`/admin/6976fcee2fd6023bf437cb51/${storeSlug}/dashboard`}>📊 Dashboard</Link>

              <div className="font-semibold text-gray-500 uppercase mt-4">
                Orders
              </div>
              <button>📦 All Orders</button>
              <button>⏳ Pending</button>

              <div className="font-semibold text-gray-500 uppercase mt-4">
                Customers
              </div>
              <button>💬 Messages</button>
              <button>⭐ Reviews</button>

              <div className="font-semibold text-gray-500 uppercase mt-4">
                Store
              </div>
              <button>⚙ Settings</button>
              <button>🖼 Appearance</button>

              <div className="font-semibold text-gray-500 uppercase mt-4">
                Account
              </div>
              <button className="text-red-500">🚪 Logout</button>
            </nav>
          </div>
        )}
      </aside>

      {/* Pages */}
      <main className="flex-1  bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
