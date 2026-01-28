import { BehaviourTag, CurrentReportInterface } from "./ReportCard";
import CardContainer from "./CardContainer";

type Props = {
    currentReport: CurrentReportInterface;
    setCurrentReport: (next: CurrentReportInterface) => void;
};

interface BehaviourGroupType {
    title: string;
    icon: string;
    color: string;
    behaviors: BehaviourType[];
}

interface BehaviourType {
    id: BehaviourTag;
    label: string;
    emoji: string;
}

export default function BehaviourChips({ currentReport, setCurrentReport }: Props) {
    const selected = currentReport.behaviours;

    const toggleBehavior = (id: BehaviourTag) => {
        setCurrentReport({
            ...currentReport,
            behaviours: selected.includes(id) ? selected.filter((b) => b !== id) : [...selected, id],
        });
    };

    const behaviorGroups: BehaviourGroupType[] = [
        {
            title: "Great Behaviors",
            icon: "✨",
            color: "green",
            behaviors: [
                { id: "playful", label: "Playful", emoji: "🎾" },
                { id: "calm", label: "Calm", emoji: "😌" },
                { id: "loose-leash", label: "Loose leash", emoji: "✨" },
                { id: "checked-in", label: "Checked in", emoji: "💛" },
                { id: "sniffing", label: "Sniff patrol", emoji: "🔍" },
            ],
        },
        {
            title: "Needs Work",
            icon: "⚠️",
            color: "orange",
            behaviors: [
                { id: "pulling", label: "Pulling", emoji: "🐕" },
                { id: "reactive", label: "Reactive", emoji: "😠" },
                { id: "barking", label: "Barked", emoji: "🗣️" },
                { id: "nervous", label: "Nervous", emoji: "😰" },
            ],
        },
        {
            title: "Other Notes",
            icon: "📝",
            color: "blue",
            behaviors: [
                { id: "wee", label: "Wee walk", emoji: "💦" },
                { id: "poop", label: "Pooped", emoji: "💩" },
                { id: "crazy", label: "Crazy zoomies", emoji: "🤪" },
            ],
        },
    ];

    const getBehaviorStyle = (color: string, isSelected: boolean) => {
        const base =
            "px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer select-none";

        if (isSelected) {
            if (color === "green") return `${base} bg-green-500 text-white shadow-lg scale-105`;
            if (color === "orange") return `${base} bg-orange-500 text-white shadow-lg scale-105`;
            return `${base} bg-blue-500 text-white shadow-lg scale-105`;
        }

        return `${base} bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow`;
    };

    return (
        <CardContainer title="⚡ How was their behaviour?">
            <div className="w-full flex flex-col items-center justify-start pt-2">
                <div className="mb-8 text-center">
                    <p className="text-sm text-gray-600">
                        Tap all that apply{" "}
                        {selected.length > 0 && (
                            <span className="text-green-600 font-semibold">• {selected.length} selected</span>
                        )}
                    </p>
                </div>

                <div className="space-y-8">
                    {behaviorGroups.map((group) => (
                        <div key={group.title}>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl">{group.icon}</span>
                                <h4 className="text-lg font-bold text-gray-700">{group.title}</h4>
                            </div>

                            <div className="flex flex-wrap gap-2.5">
                                {group.behaviors.map((behavior) => {
                                    const isSelected = selected.includes(behavior.id);
                                    return (
                                        <button
                                            key={behavior.id}
                                            type="button"
                                            onClick={() => toggleBehavior(behavior.id)}
                                            className={getBehaviorStyle(group.color, isSelected)}
                                        >
                                            <span className="mr-1.5">{behavior.emoji}</span>
                                            {behavior.label}
                                            {isSelected && <span className="ml-1.5">✓</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </CardContainer>
    );
}
