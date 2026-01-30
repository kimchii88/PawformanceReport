import CardContainer from "../CardContainer";
import { CurrentReportInterface } from "../ReportCard";
import { useState } from "react";

interface BehaviourInterface {
    currentReport: CurrentReportInterface;
    setCurrentReport: (next: CurrentReportInterface) => void;
}

export const getEnergyLabel = (value: number) => {
    if (value < 15) return "😴 sleepy";
    if (value < 35) return "😌 calm";
    if (value < 65) return "🏃 active";
    if (value < 85) return "💫 energetic";
    return "⚡ zoomies";
};

export const getEnergyStyles = (value: number) => {
    if (value < 15)
        return {
            text: "text-blue-600",
            bg: "bg-blue-100",
            border: "border-2 border-blue-600",
        };
    else if (value < 35)
        return {
            text: "text-green-600",
            bg: "bg-green-100",
            border: "border-2 border-green-600",
        };
    else if (value < 65)
        return {
            text: "text-amber-600",
            bg: "bg-amber-100",
            border: "border-2 border-amber-600",
        };
    else if (value < 75)
        return {
            text: "text-orange-600",
            bg: "bg-orange-100",
            border: "border-2 border-orange-600",
        };
    else
        return {
            text: "text-red-600",
            bg: "bg-red-100",
            border: "border-2 border-red-600",
        };
};
export default function Energy({ currentReport, setCurrentReport }: BehaviourInterface) {
    const [energyLevel, setEnergyLevel] = useState(65);

    const energyStyles = getEnergyStyles(energyLevel);

    return (
        <CardContainer title={`How was ${currentReport.gender === "boy" ? "His" : "Her"} Energy? ⚡`}>
            <div className="mb-8">
                <div className="w-full">
                    <div className="mb-10">
                        <div className="flex justify-between items-center mb-3">
                            <span
                                className={`text-2xl font-bold ${energyStyles.bg} ${energyStyles.text} px-4 py-1 rounded-full bg-opacity-10`}
                            >
                                {getEnergyLabel(energyLevel)}
                            </span>
                        </div>

                        <div className="relative">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={energyLevel}
                                onChange={(e) => {
                                    setEnergyLevel(parseInt(e.target.value));
                                    setCurrentReport({ ...currentReport, energyLevel: parseInt(e.target.value) });
                                }}
                                className="w-full h-3 rounded-full appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, 
                      #60a5fa 0%, 
                      #34d399 25%, 
                      #fbbf24 50%, 
                      #fb923c 75%, 
                      #f87171 100%)`,
                                }}
                            />
                            <style jsx>{`
                                input[type="range"]::-webkit-slider-thumb {
                                    appearance: none;
                                    width: 28px;
                                    height: 28px;
                                    border-radius: 50%;
                                    background: white;
                                    cursor: pointer;
                                    border: 3px solid #fb923c;
                                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                                }
                                input[type="range"]::-moz-range-thumb {
                                    width: 28px;
                                    height: 28px;
                                    border-radius: 50%;
                                    background: white;
                                    cursor: pointer;
                                    border: 3px solid #fb923c;
                                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                                }
                            `}</style>
                        </div>

                        <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
                            <span>😴 Sleepy</span>
                            <span>😌 Calm</span>
                            <span>🏃 Active</span>
                            <span>💫 Energetic</span>
                            <span>⚡ Zoomies</span>
                        </div>
                    </div>
                </div>
            </div>
        </CardContainer>
    );
}
