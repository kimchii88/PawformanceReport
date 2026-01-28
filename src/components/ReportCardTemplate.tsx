import { Download, Share2 } from "lucide-react";
import ColorfulTitle from "./ColorfulTitle";
import FlowerDoodle from "./FlowerDoodle";
import { BEHAVIOUR_OPTIONS, NewReportInterface } from "./ReportCard";
import WeatherIcon from "./WeatherIcon";
import { getEnergyLabel, getEnergyStyles } from "./steps/Energy";

interface ReportCardTemplateInterface {
    viewingReport: NewReportInterface;
}
export default function ReportCardTemplate({ viewingReport }: ReportCardTemplateInterface) {
    const handleExportPDF = () => {
        alert("PDF export feature would be implemented here. You can use libraries like jsPDF or react-pdf.");
    };

    const handleShareWhatsApp = () => {
        const text = viewingReport ? `Check out ${viewingReport.dogName}'s walking report!` : "";
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };
    const BEHAVIOUR_LABELS = Object.fromEntries(BEHAVIOUR_OPTIONS.map((o) => [o.value, o.label] as const));

    const energyStyles = getEnergyStyles(viewingReport.energyLevel);

    return (
        <div className="bg-white rounded-lg shadow-2xl p-8 border-8 border-double border-orange-400 relative">
            <div className="absolute top-4 left-4 flex gap-2">
                <FlowerDoodle color="bg-blue-300" size="w-6 h-6" />
                <FlowerDoodle color="bg-orange-300" size="w-6 h-6" />
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
                <FlowerDoodle color="bg-teal-300" size="w-6 h-6" />
                <FlowerDoodle color="bg-pink-300" size="w-6 h-6" />
            </div>
            <div className="absolute bottom-4 left-4 flex gap-2">
                <FlowerDoodle color="bg-yellow-300" size="w-6 h-6" />
                <FlowerDoodle color="bg-red-300" size="w-6 h-6" />
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
                <FlowerDoodle color="bg-purple-300" size="w-6 h-6" />
                <FlowerDoodle color="bg-green-300" size="w-6 h-6" />
            </div>

            <div className="mb-4">
                <ColorfulTitle text={`${viewingReport.dogName}'s`} />
                <br />
                <ColorfulTitle text={`Report Card`} />
            </div>
            <div className="flex items-center justify-between px-12 py-4">
                {/* Date */}
                <div className="text-center">
                    <div className="text-sm font-bold opacity-70 mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                        Date
                    </div>
                    <div className="text-sm font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                        {formatDate(viewingReport.date)}
                    </div>
                </div>

                {/* Weather */}
                <div className="text-center">
                    <div className="text-sm font-bold opacity-70 mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                        Today’s weather
                    </div>
                    <div
                        className="flex items-center justify-center gap-2 text-sm font-bold"
                        style={{ fontFamily: "Comic Sans MS, cursive" }}
                    >
                        <span className="text-sm">
                            <WeatherIcon weather={viewingReport.weather} size="w-5 h-5" />
                        </span>
                        <span>{viewingReport.temperature}</span>
                    </div>
                </div>
            </div>

            <div className="mb-6 flex justify-center">
                {viewingReport && viewingReport.photo !== null && (
                    <img
                        src={viewingReport.photo}
                        alt={viewingReport.dogName}
                        className="w-96 h-96 object-cover rounded-lg border-4 border-orange-400"
                    />
                )}
            </div>

            <div className="text-center mb-6">
                <div className="text-3xl font-bold mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    {viewingReport.dogName}
                </div>
                <div className="flex items-center justify-center gap-3">
                    <span style={{ fontFamily: "Comic Sans MS, cursive" }}>What a cute {viewingReport.gender}!</span>
                </div>
            </div>

            <div className="border-4 border-double border-orange-400 p-6 rounded-lg bg-orange-50 mb-4">
                <p className="font-bold text-center mb-4 text-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    Walk Details
                </p>

                <div className="mb-6">
                    <p
                        className="text-center text-base font-bold mb-4"
                        style={{ fontFamily: "Comic Sans MS, cursive" }}
                    >
                        ⚡ Energy Levels
                    </p>
                    <div className="text-center">
                        <span
                            className={`text-2xl font-bold ${energyStyles.bg} ${energyStyles.text} ${energyStyles.border} px-4 py-1 rounded-xl bg-opacity-10`}
                        >
                            {getEnergyLabel(viewingReport.energyLevel)}
                        </span>
                    </div>
                </div>

                {viewingReport.behaviours.length > 0 && (
                    <>
                        <div className="border border-orange-100 rounded-full my-4" />
                        <p
                            className="text-center text-base font-bold mb-4"
                            style={{ fontFamily: "Comic Sans MS, cursive" }}
                        >
                            📋 Other Behaviours:
                        </p>
                    </>
                )}
                <div className="flex flex-row justify-between">
                    {viewingReport.behaviours.map((tag) => {
                        return (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full border-2 border-orange-300 bg-orange-50 font-bold text-sm"
                            >
                                {BEHAVIOUR_LABELS[tag]}
                            </span>
                        );
                    })}
                </div>
            </div>

            {viewingReport.notes && (
                <div className="mb-6">
                    <p
                        className="font-bold text-base mb-2 text-center text-orange-600"
                        style={{ fontFamily: "Comic Sans MS, cursive" }}
                    >
                        Additional Comments:
                    </p>
                    <p
                        className="border-2 border-orange-400 rounded-xl p-4 text-base text-center"
                        style={{ fontFamily: "Comic Sans MS, cursive" }}
                    >
                        {viewingReport.notes}
                    </p>
                </div>
            )}

            <div className="flex gap-4 justify-center pt-6 border-t-2 border-dashed border-orange-400">
                <button
                    onClick={handleExportPDF}
                    className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 shadow-lg"
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                    <Download className="w-5 h-5" />
                    Export PDF
                </button>
                <button
                    onClick={handleShareWhatsApp}
                    className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 shadow-lg"
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                    <Share2 className="w-5 h-5" />
                    Share on WhatsApp
                </button>
            </div>
        </div>
    );
}
