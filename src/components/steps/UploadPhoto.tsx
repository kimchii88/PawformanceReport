import Image from "next/image";
import { CurrentReportInterface } from "../ReportCard";
import { Camera, X } from "lucide-react";
import CardContainer from "../CardContainer";

interface UploadPhotoInterface {
    currentReport: CurrentReportInterface;
    setCurrentReport: (next: CurrentReportInterface) => void;
    handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadPhoto({ currentReport, setCurrentReport, handlePhotoUpload }: UploadPhotoInterface) {
    return (
        <CardContainer title={`📸 Upload a photo of ${currentReport.dogName}!`}>
            {currentReport.photo ? (
                <div className="relative">
                    <img
                        src={currentReport.photo}
                        alt="Dog"
                        className="h-10/12 object-cover rounded-lg border-4 border-orange-400"
                    />
                    <button
                        onClick={() => setCurrentReport({ ...currentReport, photo: null })}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center min-h-64 border-4 border-dashed border-orange-400 rounded-lg cursor-pointer hover:border-orange-500 transition bg-orange-50">
                    <Camera className="w-16 h-16 text-orange-400 mb-3" />
                    <span
                        className="text-xl font-bold text-orange-600"
                        style={{ fontFamily: "Comic Sans MS, cursive" }}
                    >
                        Tap to add a photo
                    </span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
            )}
        </CardContainer>
    );
}
