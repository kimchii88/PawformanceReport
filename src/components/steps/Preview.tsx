import CardContainer from "../CardContainer";
import { CurrentReportInterface } from "../ReportCard";

interface PreviewInterface {
    currentReport: CurrentReportInterface;
    handleSaveReport: () => void;
}

export default function Preview({ currentReport, handleSaveReport }: PreviewInterface) {
    return (
        <CardContainer title=" 🎉 All done!">
            <p className="text-xl mb-8 text-center" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                Ready to save {currentReport.dogName}&apos;s report card?
            </p>
            <button
                onClick={handleSaveReport}
                className="bg-orange-500 text-white px-12 py-4 text-2xl font-bold rounded-full hover:bg-orange-600 shadow-lg transition transform hover:scale-105"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
                Save Report Card! 🐾
            </button>
        </CardContainer>
    );
}
