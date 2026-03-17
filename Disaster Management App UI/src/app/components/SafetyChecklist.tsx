import { ChevronDown, ChevronUp, Heart, Flame, Droplets, AlertTriangle, Shield, Wind } from "lucide-react";
import { useState } from "react";

interface ChecklistItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  steps: string[];
}

const safetyChecklists: ChecklistItem[] = [
  {
    id: "cpr",
    title: "CPR - Cardiopulmonary Resuscitation",
    icon: <Heart className="size-6" strokeWidth={2.5} />,
    color: "#FF0000",
    steps: [
      "Check if the person is responsive - tap shoulders and shout",
      "Call for help - activate emergency services if available",
      "Place person on firm, flat surface",
      "Position hands: Center of chest, between nipples",
      "Push hard and fast: 100-120 compressions per minute",
      "Compress at least 2 inches (5 cm) deep",
      "Allow chest to fully recoil between compressions",
      "After 30 compressions, give 2 rescue breaths",
      "Continue CPR until help arrives or person recovers",
    ],
  },
  {
    id: "fire",
    title: "Fire Safety Protocol",
    icon: <Flame className="size-6" strokeWidth={2.5} />,
    color: "#FF6600",
    steps: [
      "Stay low to avoid smoke inhalation",
      "Feel doors before opening - if hot, find another exit",
      "Use stairs, never elevators during fire",
      "If clothes catch fire: STOP, DROP, and ROLL",
      "Cover your mouth with wet cloth if possible",
      "Once out, stay out - never go back inside",
      "Meet at designated assembly point",
      "Account for all family/group members",
    ],
  },
  {
    id: "bleeding",
    title: "Stop Severe Bleeding",
    icon: <Droplets className="size-6" strokeWidth={2.5} />,
    color: "#FF0000",
    steps: [
      "Wear gloves if available to protect yourself",
      "Apply direct pressure to wound with clean cloth",
      "Maintain firm pressure for 10-15 minutes",
      "Do not remove cloth - add more on top if needed",
      "Elevate injured area above heart level if possible",
      "Apply pressure to arterial pressure points if needed",
      "Use tourniquet only as last resort for limb injuries",
      "Seek medical help immediately",
    ],
  },
  {
    id: "earthquake",
    title: "Earthquake Safety - DROP, COVER, HOLD",
    icon: <AlertTriangle className="size-6" strokeWidth={2.5} />,
    color: "#FFD700",
    steps: [
      "DROP down to hands and knees",
      "Take COVER under sturdy desk or table",
      "HOLD ON to shelter until shaking stops",
      "Stay away from windows and glass",
      "If outdoors, move to open area away from buildings",
      "If in vehicle, pull over and stay inside",
      "After shaking: Check for injuries and damage",
      "Expect aftershocks - be prepared to drop again",
      "Use stairs to evacuate, never elevators",
    ],
  },
  {
    id: "shelter",
    title: "Emergency Shelter Setup",
    icon: <Shield className="size-6" strokeWidth={2.5} />,
    color: "#00FF00",
    steps: [
      "Find location protected from wind and rain",
      "Choose high ground to avoid flooding",
      "Insulate from ground with leaves, cardboard, etc.",
      "Create waterproof roof with tarp or large leaves",
      "Ensure ventilation to prevent CO2 buildup",
      "Mark location with visible signal",
      "Keep emergency supplies organized and dry",
      "Maintain body heat - huddle if in group",
    ],
  },
  {
    id: "tornado",
    title: "Tornado/Severe Storm Safety",
    icon: <Wind className="size-6" strokeWidth={2.5} />,
    color: "#9370DB",
    steps: [
      "Seek shelter in basement or interior room",
      "Stay away from windows and exterior walls",
      "Get under sturdy furniture if possible",
      "Protect head and neck with arms and hands",
      "If outdoors: Lie flat in ditch or low area",
      "Do not shelter under highway overpass",
      "If in vehicle and can't reach shelter, stay in car",
      "Buckle seatbelt, lower head below windows",
      "Cover yourself with blanket if available",
    ],
  },
];

export function SafetyChecklist() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean[]>>({});

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    if (!checkedSteps[id]) {
      const checklist = safetyChecklists.find(c => c.id === id);
      if (checklist) {
        setCheckedSteps(prev => ({
          ...prev,
          [id]: new Array(checklist.steps.length).fill(false),
        }));
      }
    }
  };

  const toggleStep = (checklistId: string, stepIndex: number) => {
    setCheckedSteps(prev => ({
      ...prev,
      [checklistId]: prev[checklistId].map((checked, i) => 
        i === stepIndex ? !checked : checked
      ),
    }));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 bg-[#1A1A1A] border-b border-[#2A2A2A]">
        <h2 className="text-xl font-black mb-1">Safety Guidelines</h2>
        <p className="text-xs text-gray-400 font-bold">
          Emergency first-aid and disaster response protocols
        </p>
      </div>

      {/* Checklists */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {safetyChecklists.map((checklist) => {
          const isExpanded = expandedId === checklist.id;
          const progress = checkedSteps[checklist.id]
            ? (checkedSteps[checklist.id].filter(Boolean).length / checklist.steps.length) * 100
            : 0;

          return (
            <div
              key={checklist.id}
              className="bg-[#1A1A1A] border-2 border-[#2A2A2A] rounded-2xl overflow-hidden"
            >
              {/* Checklist Header */}
              <button
                onClick={() => toggleExpand(checklist.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-[#2A2A2A] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-xl"
                    style={{ backgroundColor: `${checklist.color}20` }}
                  >
                    <div style={{ color: checklist.color }}>
                      {checklist.icon}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-bold">{checklist.title}</div>
                    {isExpanded && progress > 0 && (
                      <div className="text-xs text-gray-400 font-bold mt-0.5">
                        {Math.round(progress)}% Complete
                      </div>
                    )}
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="size-5 text-gray-400" strokeWidth={2.5} />
                ) : (
                  <ChevronDown className="size-5 text-gray-400" strokeWidth={2.5} />
                )}
              </button>

              {/* Checklist Steps */}
              {isExpanded && (
                <div className="px-4 pb-4">
                  {/* Progress Bar */}
                  {progress > 0 && (
                    <div className="mb-3">
                      <div className="h-2 bg-[#0A0A0A] rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-300 rounded-full"
                          style={{
                            width: `${progress}%`,
                            backgroundColor: checklist.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Steps */}
                  <div className="space-y-2">
                    {checklist.steps.map((step, index) => (
                      <label
                        key={index}
                        className="flex items-start gap-3 p-3 bg-[#0A0A0A] rounded-xl cursor-pointer hover:bg-[#2A2A2A] transition-colors group"
                      >
                        <input
                          type="checkbox"
                          checked={checkedSteps[checklist.id]?.[index] || false}
                          onChange={() => toggleStep(checklist.id, index)}
                          className="mt-0.5 size-5 rounded border-2 border-[#2A2A2A] bg-transparent checked:bg-[#00FF00] checked:border-[#00FF00] cursor-pointer flex-shrink-0"
                          style={{
                            accentColor: checklist.color,
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <span
                              className="font-black text-xs"
                              style={{ color: checklist.color }}
                            >
                              {index + 1}.
                            </span>
                            <span
                              className={`text-sm leading-relaxed ${
                                checkedSteps[checklist.id]?.[index]
                                  ? "line-through text-gray-500"
                                  : ""
                              }`}
                            >
                              {step}
                            </span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Completion Message */}
                  {progress === 100 && (
                    <div
                      className="mt-3 p-3 rounded-xl text-center font-bold text-sm"
                      style={{
                        backgroundColor: `${checklist.color}20`,
                        color: checklist.color,
                      }}
                    >
                      ✓ Checklist Complete
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Warning */}
      <div className="p-4 bg-[#FF0000]/10 border-t-2 border-[#FF0000]">
        <div className="flex items-start gap-2">
          <AlertTriangle className="size-5 text-[#FF0000] flex-shrink-0 mt-0.5" strokeWidth={2.5} />
          <div>
            <div className="text-sm font-bold text-[#FF0000]">Important Disclaimer</div>
            <p className="text-xs text-gray-400 font-bold mt-1">
              These guidelines are for emergency reference only. Seek professional medical help when possible. Practice these techniques in controlled training environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
