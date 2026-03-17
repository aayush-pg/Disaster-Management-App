import { MapPin, AlertCircle, Radio, Smartphone } from "lucide-react";
import { motion } from "motion/react";

interface MeshNode {
  id: string;
  name: string;
  status: "active" | "weak" | "danger";
  x: number; // percentage
  y: number; // percentage
  lastSeen: string;
}

const mockNodes: MeshNode[] = [
  { id: "1", name: "You", status: "active", x: 50, y: 50, lastSeen: "Now" },
  { id: "2", name: "Device-A42F", status: "active", x: 35, y: 30, lastSeen: "2s ago" },
  { id: "3", name: "Device-B89C", status: "active", x: 65, y: 40, lastSeen: "5s ago" },
  { id: "4", name: "Device-C12D", status: "weak", x: 25, y: 65, lastSeen: "45s ago" },
  { id: "5", name: "Device-D56E", status: "danger", x: 75, y: 70, lastSeen: "5m ago" },
];

export function MeshMap() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 bg-[#1A1A1A] border-b border-[#2A2A2A]">
        <h2 className="text-xl font-black mb-2">Mesh Network Map</h2>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-full bg-[#00FF00]"></div>
            <span className="font-bold">Active (3)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-full bg-[#FFD700]"></div>
            <span className="font-bold">Weak (1)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-3 rounded-full bg-[#FF0000]"></div>
            <span className="font-bold">Danger (1)</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-[#0F0F0F] overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(42, 42, 42, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(42, 42, 42, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>

        {/* Danger Zone Circle */}
        <motion.div
          className="absolute rounded-full border-4 border-[#FF0000] bg-[#FF0000]/10"
          style={{
            left: '65%',
            top: '60%',
            width: '180px',
            height: '180px',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            borderColor: ['#FF0000', '#FF0000AA', '#FF0000'],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="size-8 text-[#FF0000] mx-auto mb-1" strokeWidth={2.5} />
              <div className="text-xs font-bold text-[#FF0000]">DANGER ZONE</div>
              <div className="text-xs text-[#FF0000]/70 font-bold">No Heartbeat</div>
            </div>
          </div>
        </motion.div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Lines from current user to other active nodes */}
          <line
            x1="50%" y1="50%"
            x2="35%" y2="30%"
            stroke="#00FF00"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.3"
          />
          <line
            x1="50%" y1="50%"
            x2="65%" y2="40%"
            stroke="#00FF00"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.3"
          />
          <line
            x1="50%" y1="50%"
            x2="25%" y2="65%"
            stroke="#FFD700"
            strokeWidth="2"
            strokeDasharray="5,5"
            opacity="0.2"
          />
        </svg>

        {/* Nodes */}
        {mockNodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 * parseInt(node.id) }}
          >
            {/* Pulse Effect for Active Nodes */}
            {node.status === "active" && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: node.id === "1" ? "#00FF00" : "#00FF00",
                  width: node.id === "1" ? "60px" : "50px",
                  height: node.id === "1" ? "60px" : "50px",
                  left: node.id === "1" ? "-10px" : "-5px",
                  top: node.id === "1" ? "-10px" : "-5px",
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.2 * parseInt(node.id) }}
              />
            )}

            {/* Node Pin */}
            <div
              className={`relative z-10 rounded-full flex items-center justify-center ${
                node.id === "1" ? "size-10" : "size-8"
              } ${
                node.status === "active"
                  ? "bg-[#00FF00] shadow-lg shadow-[#00FF00]/50"
                  : node.status === "weak"
                  ? "bg-[#FFD700] shadow-lg shadow-[#FFD700]/50"
                  : "bg-[#FF0000] shadow-lg shadow-[#FF0000]/50"
              }`}
            >
              {node.id === "1" ? (
                <Radio className="size-5 text-black" strokeWidth={3} />
              ) : (
                <Smartphone className="size-4 text-black" strokeWidth={3} />
              )}
            </div>

            {/* Node Label */}
            <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-center ${
              node.id === "1" ? "min-w-20" : "min-w-16"
            }`}>
              <div className={`text-xs font-black ${
                node.status === "active"
                  ? "text-[#00FF00]"
                  : node.status === "weak"
                  ? "text-[#FFD700]"
                  : "text-[#FF0000]"
              }`}>
                {node.name}
              </div>
              <div className="text-xs text-gray-400 font-bold">{node.lastSeen}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Info Panel */}
      <div className="p-4 bg-[#1A1A1A] border-t border-[#2A2A2A] space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="size-5 text-[#00FF00] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
          <div className="flex-1">
            <div className="font-bold text-sm">Your Location</div>
            <div className="text-xs text-gray-400 font-bold">
              Last Updated: Just now
            </div>
          </div>
        </div>
        
        <div className="bg-[#0A0A0A] rounded-xl p-3 border border-[#2A2A2A]">
          <div className="text-xs text-gray-400 font-bold mb-1">MESH COVERAGE</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
              <div className="h-full bg-[#00FF00] rounded-full" style={{ width: '60%' }}></div>
            </div>
            <span className="text-sm font-black text-[#00FF00]">60%</span>
          </div>
          <div className="text-xs text-gray-400 font-bold mt-1">
            Strong coverage in your area
          </div>
        </div>
      </div>
    </div>
  );
}
