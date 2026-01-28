import { Check } from "lucide-react";

type ProgressStepperProps = {
    currentStep: number; // 0-based (0 = first step)
    steps: string[]; // labels under each step
};

export function ProgressStepper({ currentStep, steps }: ProgressStepperProps) {
    const totalSteps = steps.length;
    const maxIndex = Math.max(totalSteps - 1, 0);

    // how far the orange line should fill (0% at step 0, 100% at last step)
    const pct = maxIndex === 0 ? 0 : (currentStep / maxIndex) * 100;

    return (
        <div className="w-full">
            <div className="relative w-full pt-2 pb-6">
                {/* base line */}
                <div className="absolute left-0 right-0 top-6 h-0.5 bg-gray-200 " />

                {/* progress line */}
                <div
                    className="absolute left-0 top-6 h-0.5  bg-orange-500 transition-[width] duration-300 ease-out"
                    style={{ width: `${pct}%` }}
                />

                {/* steps */}
                <div className="relative flex justify-between w-full">
                    {steps.map((label, idx) => {
                        const isCompleted = idx < currentStep;
                        const isActive = idx === currentStep;

                        return (
                            <div key={label} className="flex flex-col items-center gap-2 min-w-0">
                                {/* circle */}
                                <div
                                    className={[
                                        "grid place-items-center rounded-full border-2 transition",
                                        "w-8 h-8 text-sm font-bold",
                                        isCompleted
                                            ? "bg-orange-500 border-orange-500 text-white"
                                            : isActive
                                              ? "bg-white border-orange-500 text-orange-600"
                                              : "bg-white border-gray-300 text-gray-400",
                                    ].join(" ")}
                                >
                                    {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                                </div>

                                {/* label */}
                                <div
                                    className={[
                                        "text-xs font-bold text-center truncate w-20",
                                        isCompleted || isActive ? "text-gray-700" : "text-gray-400",
                                    ].join(" ")}
                                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                                    title={label}
                                >
                                    {label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
