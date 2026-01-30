import CardContainer from "../CardContainer";
import { CurrentReportInterface } from "../ReportCard";

interface NameInterface {
    currentReport: CurrentReportInterface;
    setCurrentReport: (next: CurrentReportInterface) => void;
}

export default function Name({ currentReport, setCurrentReport }: NameInterface) {
    const isBoySelected = currentReport.gender === "boy";
    const isGirlSelected = currentReport.gender === "girl";

    return (
        <CardContainer title="Who did you walk today? 🐕">
            <input
                type="text"
                value={currentReport.dogName}
                onChange={(e) => setCurrentReport({ ...currentReport, dogName: e.target.value })}
                className="w-full text-xl pl-10 border-b-4 border-orange-400 focus:outline-none py-4 focus:bg-orange-100 bg-orange-50 rounded-2xl self-center"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
                placeholder="Enter name"
                autoFocus
            />
            <div className="flex gap-6 mt-8 self-end ">
                <button
                    onClick={() => {
                        setCurrentReport({ ...currentReport, gender: isBoySelected ? "" : "boy" });
                    }}
                    className={`${isBoySelected ? "bg-blue-500 text-white" : "bg-blue-100 border-blue-500 border-2 text-blue-500 hover:bg-blue-500 hover:text-white"}  px-4 py-1 rounded-xl text-lg font-bold  shadow-lg transition transform hover:scale-105`}
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                    🐕 Boy
                </button>
                <button
                    onClick={() => {
                        setCurrentReport({ ...currentReport, gender: isGirlSelected ? "" : "girl" });
                    }}
                    className={`${isGirlSelected ? "bg-pink-500 text-white" : "bg-pink-100 border-pink-500 border-2 text-pink-500 hover:bg-pink-500 hover:text-white"}  px-4 py-1 rounded-xl text-lg font-bold  shadow-lg transition transform hover:scale-105`}
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                    🐕 Girl
                </button>
            </div>
        </CardContainer>
    );
}
