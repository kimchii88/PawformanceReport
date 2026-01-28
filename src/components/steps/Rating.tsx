import CardContainer from "../CardContainer";
import RatingFace from "../RatingFace";
import { CurrentReportInterface } from "../ReportCard";

interface RatingInterface {
    currentStep: number;
    currentReport: CurrentReportInterface;
    setCurrentReport: (next: CurrentReportInterface) => void;
}

export default function Rating({ currentStep, currentReport, setCurrentReport }: RatingInterface) {
    return (
        <CardContainer currentStep={currentStep} title="What sort of energy did they have today?">
            {!currentReport.gender ? (
                <div className="flex gap-6">
                    <button
                        onClick={() => setCurrentReport({ ...currentReport, gender: "boy" })}
                        className="bg-blue-400 text-white px-12 py-6 rounded-3xl text-2xl font-bold hover:bg-blue-500 shadow-lg transition transform hover:scale-105"
                        style={{ fontFamily: "Comic Sans MS, cursive" }}
                    >
                        🐕 Boy
                    </button>
                    <button
                        onClick={() => setCurrentReport({ ...currentReport, gender: "girl" })}
                        className="bg-pink-400 text-white px-12 py-6 rounded-3xl text-2xl font-bold hover:bg-pink-500 shadow-lg transition transform hover:scale-105"
                        style={{ fontFamily: "Comic Sans MS, cursive" }}
                    >
                        🐕 Girl
                    </button>
                </div>
            ) : (
                <div>
                    <div className="flex justify-center gap-3 mb-8">
                        <span
                            className={`px-6 py-3 rounded-full font-bold text-xl ${
                                currentReport.gender === "boy" ? "bg-blue-400" : "bg-pink-400"
                            } text-white`}
                            style={{ fontFamily: "Comic Sans MS, cursive" }}
                        >
                            {currentReport.gender === "boy" ? "🐕 Boy" : "🐕 Girl"}
                        </span>
                        <button
                            onClick={() => setCurrentReport({ ...currentReport, gender: "" })}
                            className="px-4 py-2 bg-gray-300 rounded-full text-sm hover:bg-gray-400"
                        >
                            Change
                        </button>
                    </div>

                    <div className="flex gap-6 justify-center">
                        <button
                            onClick={() => setCurrentReport({ ...currentReport, rating: "happy" })}
                            className={`p-6 rounded-full border-4 ${
                                currentReport.rating === "happy"
                                    ? "border-green-500 bg-green-100"
                                    : "border-gray-300 bg-white"
                            } shadow-lg transition transform hover:scale-110`}
                        >
                            <RatingFace type="happy" size="text-7xl" />
                        </button>
                        <button
                            onClick={() => setCurrentReport({ ...currentReport, rating: "neutral" })}
                            className={`p-6 rounded-full border-4 ${
                                currentReport.rating === "neutral"
                                    ? "border-yellow-500 bg-yellow-100"
                                    : "border-gray-300 bg-white"
                            } shadow-lg transition transform hover:scale-110`}
                        >
                            <RatingFace type="neutral" size="text-7xl" />
                        </button>
                        <button
                            onClick={() => setCurrentReport({ ...currentReport, rating: "unhappy" })}
                            className={`p-6 rounded-full border-4 ${
                                currentReport.rating === "unhappy"
                                    ? "border-red-500 bg-red-100"
                                    : "border-gray-300 bg-white"
                            } shadow-lg transition transform hover:scale-110`}
                        >
                            <RatingFace type="unhappy" size="text-7xl" />
                        </button>
                    </div>
                </div>
            )}
        </CardContainer>
    );
}
