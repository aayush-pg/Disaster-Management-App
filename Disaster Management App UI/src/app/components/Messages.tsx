import { Send, AlertTriangle, CheckCircle, Users, Radio } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  type: "emergency" | "status" | "info";
  sender: string;
  content: string;
  relayedVia: string[];
  timestamp: string;
  hops: number;
}

const mockMessages: Message[] = [
  {
    id: "1",
    type: "emergency",
    sender: "Device-A42F",
    content: "SOS - Building collapsed at Main St. Need medical assistance!",
    relayedVia: ["Device-B89C", "You"],
    timestamp: "2 min ago",
    hops: 2,
  },
  {
    id: "2",
    type: "status",
    sender: "Device-B89C",
    content: "Safe at evacuation zone. Water supply available here.",
    relayedVia: ["You"],
    timestamp: "5 min ago",
    hops: 1,
  },
  {
    id: "3",
    type: "info",
    sender: "Device-C12D",
    content: "Broadcasting: Medical team heading north on Route 5",
    relayedVia: ["Device-A42F", "Device-B89C", "You"],
    timestamp: "8 min ago",
    hops: 3,
  },
  {
    id: "4",
    type: "status",
    sender: "Device-E78F",
    content: "Family of 4, all safe. Currently at community center.",
    relayedVia: ["Device-C12D", "You"],
    timestamp: "12 min ago",
    hops: 2,
  },
];

export function Messages() {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      // In a real app, this would broadcast the message
      console.log("Broadcasting:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 bg-[#1A1A1A] border-b border-[#2A2A2A]">
        <h2 className="text-xl font-black mb-1">Emergency Broadcasts</h2>
        <p className="text-xs text-gray-400 font-bold">
          All messages are encrypted and relayed through mesh network
        </p>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mockMessages.map((message) => (
          <div
            key={message.id}
            className={`rounded-2xl p-4 border-2 ${
              message.type === "emergency"
                ? "bg-[#FF0000]/10 border-[#FF0000]"
                : message.type === "status"
                ? "bg-[#00FF00]/10 border-[#00FF00]"
                : "bg-[#1A1A1A] border-[#2A2A2A]"
            }`}
          >
            {/* Message Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {message.type === "emergency" ? (
                  <AlertTriangle className="size-5 text-[#FF0000]" strokeWidth={2.5} />
                ) : message.type === "status" ? (
                  <CheckCircle className="size-5 text-[#00FF00]" strokeWidth={2.5} />
                ) : (
                  <Users className="size-5 text-white" strokeWidth={2.5} />
                )}
                <div>
                  <div className="font-bold text-sm">{message.sender}</div>
                  <div className="text-xs text-gray-400 font-bold">{message.timestamp}</div>
                </div>
              </div>
              
              <div className={`px-2 py-1 rounded-lg text-xs font-black ${
                message.type === "emergency"
                  ? "bg-[#FF0000] text-white"
                  : message.type === "status"
                  ? "bg-[#00FF00] text-black"
                  : "bg-[#2A2A2A] text-white"
              }`}>
                {message.type.toUpperCase()}
              </div>
            </div>

            {/* Message Content */}
            <p className="text-sm mb-3 leading-relaxed">{message.content}</p>

            {/* Relay Information */}
            <div className="pt-3 border-t border-[#2A2A2A] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Radio className="size-3" strokeWidth={2.5} />
                <span className="font-bold">Relayed via {message.hops} hop{message.hops > 1 ? 's' : ''}:</span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {message.relayedVia.map((device, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      device === "You" ? "bg-[#00FF00] text-black" : "bg-[#2A2A2A] text-gray-300"
                    }`}>
                      {device}
                    </span>
                    {index < message.relayedVia.length - 1 && (
                      <span className="text-gray-500">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Broadcast Buttons */}
      <div className="p-3 bg-[#1A1A1A] border-t border-[#2A2A2A]">
        <div className="text-xs text-gray-400 font-bold mb-2">QUICK BROADCASTS</div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button className="bg-[#00FF00] hover:bg-[#00DD00] text-black font-bold py-2 px-3 rounded-xl text-sm active:scale-95 transition-all">
            ✓ I'm Safe
          </button>
          <button className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-bold py-2 px-3 rounded-xl text-sm active:scale-95 transition-all">
            ⚠ Need Help
          </button>
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type emergency message..."
            className="flex-1 bg-[#2A2A2A] text-white placeholder-gray-500 rounded-xl px-4 py-3 border-2 border-transparent focus:border-[#00FF00] outline-none font-bold text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-[#00FF00] hover:bg-[#00DD00] disabled:bg-[#2A2A2A] disabled:text-gray-600 text-black font-bold p-3 rounded-xl active:scale-95 transition-all"
          >
            <Send className="size-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
