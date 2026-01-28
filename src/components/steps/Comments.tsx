import CardContainer from "../CardContainer";
import { CurrentReportInterface } from "../ReportCard";

interface CommentsInterface {
    currentReport: CurrentReportInterface;
    setCurrentReport: (next: CurrentReportInterface) => void;
}

export default function Comments({ currentReport, setCurrentReport }: CommentsInterface) {
    return (
        <CardContainer title="📝 Any additional comments?">
            <textarea
                value={currentReport.notes}
                onChange={(e) => setCurrentReport({ ...currentReport, notes: e.target.value })}
                className="w-full max-w-2xl border-b-4 border-orange-400 rounded-2xl focus:outline-none resize-none px-4 py-4 text-xl focus:bg-orange-100 bg-orange-50"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
                rows={6}
                placeholder="Add your observations during the walk..."
            />
        </CardContainer>
    );
}
