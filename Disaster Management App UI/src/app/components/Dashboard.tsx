import { AlertTriangle, Users, Radio, Clock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function Dashboard() {
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState<number | null>(null);

  const handleSosPress = () => {
    if (sosCountdown !== null) return;
    
    // Start 3-second countdown
    setSosCountdown(3);
    const interval = setInterval(() => {
      setSosCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setSosActive(true);
          setTimeout(() => {
            setSosActive(false);
            setSosCountdown(null);
          }, 3000);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black tracking-tight">DISASTER MESH</h1>
        <p className="text-gray-400 text-sm font-bold">Offline Emergency Network</p>
      </div>

      {/* Mesh Status Card */}
      <div className="bg-[#1A1A1A] border-2 border-[#00FF00] rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Radio className="size-6 text-[#00FF00]" strokeWidth={2.5} />
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Radio className="size-6 text-[#00FF00]" strokeWidth={2.5} />
              </motion.div>
            </div>
            <span className="font-bold">Mesh Status</span>
          </div>
          <span className="text-[#00FF00] font-black text-sm">ACTIVE</span>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#0A0A0A] rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Users className="size-5 text-[#00FF00] mx-auto mb-1" strokeWidth={2.5} />
            <div className="text-2xl font-black text-[#00FF00]">3</div>
            <div className="text-xs text-gray-400 font-bold">Nearby Nodes</div>
          </div>
          
          <div className="bg-[#0A0A0A] rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Radio className="size-5 text-[#FFD700] mx-auto mb-1" strokeWidth={2.5} />
            <div className="text-2xl font-black text-[#FFD700]">12</div>
            <div className="text-xs text-gray-400 font-bold">Network Size</div>
          </div>
          
          <div className="bg-[#0A0A0A] rounded-xl p-3 text-center border border-[#2A2A2A]">
            <Clock className="size-5 text-white mx-auto mb-1" strokeWidth={2.5} />
            <div className="text-2xl font-black">2h</div>
            <div className="text-xs text-gray-400 font-bold">Uptime</div>
          </div>
        </div>
      </div>

      {/* SOS Button */}
      <div className="flex flex-col items-center gap-4 py-8">
        <motion.button
          onClick={handleSosPress}
          disabled={sosCountdown !== null}
          className={`size-56 rounded-full font-black text-3xl tracking-wider shadow-2xl transition-all relative overflow-hidden ${
            sosActive
              ? "bg-[#FF0000] text-white"
              : sosCountdown !== null
              ? "bg-[#8B0000] text-white border-4 border-[#FF0000]"
              : "bg-[#FF0000] text-white border-4 border-[#CC0000] hover:border-white active:scale-95"
          }`}
          whileTap={{ scale: 0.9 }}
          animate={
            sosActive
              ? {
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(255, 0, 0, 0.7)",
                    "0 0 0 40px rgba(255, 0, 0, 0)",
                    "0 0 0 0 rgba(255, 0, 0, 0)",
                  ],
                }
              : {}
          }
          transition={{ duration: 0.6, repeat: sosActive ? Infinity : 0 }}
        >
          {sosCountdown !== null ? (
            <span className="text-6xl">{sosCountdown}</span>
          ) : sosActive ? (
            <div className="flex flex-col items-center">
              <AlertTriangle className="size-16 mb-2" strokeWidth={3} />
              <span>SENDING</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <AlertTriangle className="size-16 mb-2" strokeWidth={3} />
              <span>SOS</span>
            </div>
          )}
        </motion.button>
        
        <div className="text-center max-w-xs">
          <p className="text-gray-400 text-sm font-bold">
            Press and hold SOS to broadcast emergency alert to all nearby nodes
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-[#1A1A1A] hover:bg-[#2A2A2A] border-2 border-[#2A2A2A] hover:border-[#00FF00] rounded-2xl p-4 text-left transition-all active:scale-95">
          <AlertTriangle className="size-6 text-[#FFD700] mb-2" strokeWidth={2.5} />
          <div className="font-bold">Send Status</div>
          <div className="text-xs text-gray-400 font-bold">I'm Safe Alert</div>
        </button>
        
        <button className="bg-[#1A1A1A] hover:bg-[#2A2A2A] border-2 border-[#2A2A2A] hover:border-[#00FF00] rounded-2xl p-4 text-left transition-all active:scale-95">
          <Users className="size-6 text-[#00FF00] mb-2" strokeWidth={2.5} />
          <div className="font-bold">Find People</div>
          <div className="text-xs text-gray-400 font-bold">Nearby Survivors</div>
        </button>
      </div>
    </div>
  );
}
