import { Outlet, NavLink } from "react-router";
import { Home, Map, MessageSquare, ClipboardList, Wifi, Battery, MapPin } from "lucide-react";

export function Layout() {
  return (
    <div className="size-full bg-[#0A0A0A] text-white flex flex-col max-w-md mx-auto">
      {/* Status Bar */}
      <div className="bg-[#1A1A1A] px-4 py-3 flex items-center justify-between border-b border-[#2A2A2A]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Wifi className="size-4 text-[#00FF00]" strokeWidth={2.5} />
            <span className="text-xs font-bold">MESH</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="size-4 text-[#00FF00]" strokeWidth={2.5} />
            <span className="text-xs font-bold">GPS</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Battery className="size-4 text-[#00FF00]" strokeWidth={2.5} />
          <span className="text-xs font-bold">87%</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-[#1A1A1A] border-t border-[#2A2A2A] px-2 py-3">
        <div className="flex items-center justify-around">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                isActive ? "bg-[#2A2A2A] text-white" : "text-gray-400"
              }`
            }
          >
            <Home className="size-6" strokeWidth={2.5} />
            <span className="text-xs font-bold">Home</span>
          </NavLink>
          
          <NavLink
            to="/map"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                isActive ? "bg-[#2A2A2A] text-white" : "text-gray-400"
              }`
            }
          >
            <Map className="size-6" strokeWidth={2.5} />
            <span className="text-xs font-bold">Map</span>
          </NavLink>
          
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                isActive ? "bg-[#2A2A2A] text-white" : "text-gray-400"
              }`
            }
          >
            <MessageSquare className="size-6" strokeWidth={2.5} />
            <span className="text-xs font-bold">Messages</span>
          </NavLink>
          
          <NavLink
            to="/safety"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                isActive ? "bg-[#2A2A2A] text-white" : "text-gray-400"
              }`
            }
          >
            <ClipboardList className="size-6" strokeWidth={2.5} />
            <span className="text-xs font-bold">Safety</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
