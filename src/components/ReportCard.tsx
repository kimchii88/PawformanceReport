"use client";

import React, { useState, useEffect } from "react";
import { Camera, X, ArrowLeft, ArrowRight, Download, Share2 } from "lucide-react";
import FlowerDoodle from "./FlowerDoodle";
import ColorfulTitle from "./ColorfulTitle";
import WeatherIcon, { WeatherType } from "./WeatherIcon";
import RatingFace, { RatingFaceTypes } from "./RatingFace";
import { fetchWeather } from "@/helpers/fetchWeather";
import Image from "next/image";

export interface CurrentReportInterface {
    photo: string | ArrayBuffer | null;
    dogName: string;
    gender: string;
    date: string;
    rating: RatingFaceTypes;
    energyLevel: number;
    pooped: boolean;
    weather: string;
    temperature: string;
    notes: string;
}

export interface NewReportInterface {
    id: string;
    photo: string | ArrayBuffer | null;
    dogName: string;
    gender: string;
    date: string;
    rating: RatingFaceTypes;
    energyLevel: number;
    pooped: boolean;
    weather: WeatherType;
    temperature: string;
    notes: string;
}

export default function ReportCard() {
    const [reports, setReports] = useState<NewReportInterface[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [currentReport, setCurrentReport] = useState<CurrentReportInterface>({
        photo: null,
        dogName: "",
        gender: "",
        date: new Date().toISOString().split("T")[0],
        rating: "happy",
        energyLevel: 3,
        pooped: false,
        weather: "Sunny",
        temperature: "",
        notes: "",
    });
    const [showReportView, setShowReportView] = useState(false);
    const [viewingReport, setViewingReport] = useState<NewReportInterface | null>();

    const steps = ["photo", "name", "rating", "zoomies", "comments", "preview"];

    useEffect(() => {
        fetchWeather(setCurrentReport);
    }, []);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentReport({ ...currentReport, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSkip = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const canProceed = () => {
        if (steps[currentStep] === "photo") return currentReport.photo !== null;
        if (steps[currentStep] === "name") return currentReport.dogName.trim() !== "";
        if (steps[currentStep] === "rating") return currentReport.gender !== "";
        return true;
    };

    const handleSaveReport = () => {
        const today = new Date();
        const newReport = {
            ...currentReport,
            id: today.getTime().toString(),
            weather: currentReport.weather as WeatherType,
            RatingFace: currentReport.rating as RatingFaceTypes,
        };
        setReports([newReport, ...reports]);
        setViewingReport(newReport);
        setShowReportView(true);
        resetForm();
    };

    const resetForm = () => {
        setCurrentReport({
            photo: null,
            dogName: "",
            gender: "",
            date: new Date().toISOString().split("T")[0],
            rating: "happy",
            energyLevel: 3,
            pooped: false,
            weather: currentReport.weather,
            temperature: currentReport.temperature,
            notes: "",
        });
        setCurrentStep(0);
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    };

    const handleExportPDF = () => {
        alert("PDF export feature would be implemented here. You can use libraries like jsPDF or react-pdf.");
    };

    const handleShareWhatsApp = () => {
        const text = viewingReport ? `Check out ${viewingReport.dogName}'s walking report!` : "";
        const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    if (showReportView && viewingReport) {
        return (
            <div className="min-h-screen bg-amber-50 p-6">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-6 flex gap-3 justify-center">
                        <button
                            onClick={() => {
                                setShowReportView(false);
                                setViewingReport(null);
                            }}
                            className="px-6 py-3 rounded-full font-bold text-sm uppercase bg-orange-500 text-white shadow-lg"
                        >
                            New Report
                        </button>
                        <button
                            onClick={() => {
                                setShowReportView(false);
                                setViewingReport(null);
                            }}
                            className="px-6 py-3 rounded-full font-bold text-sm uppercase bg-white text-gray-700 border-2 border-orange-300"
                        >
                            View All ({reports.length})
                        </button>
                    </div>

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

                        <div className="absolute top-6 right-20 flex flex-col items-center">
                            <WeatherIcon weather={viewingReport.weather} size="w-10 h-10" />
                            {viewingReport.temperature && (
                                <span
                                    className="text-sm font-bold mt-1"
                                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                                >
                                    {viewingReport.temperature}
                                </span>
                            )}
                        </div>

                        <div className="mb-4">
                            <ColorfulTitle text="DOG WALKING REPORT" />
                        </div>

                        <div className="text-center mb-6">
                            <div className="text-base font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                                {formatDate(viewingReport.date)}
                            </div>
                        </div>

                        <div className="mb-6 flex justify-center">
                            {viewingReport && viewingReport.photo !== null && (
                                <Image
                                    src={viewingReport.photo.toString()}
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
                                <span
                                    className={`px-4 py-2 rounded-full font-bold text-white ${
                                        viewingReport.gender === "boy" ? "bg-blue-400" : "bg-pink-400"
                                    }`}
                                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                                >
                                    {viewingReport.gender === "boy" ? "🐕 Boy" : "🐕 Girl"}
                                </span>
                                <span className="text-5xl">
                                    <RatingFace type={viewingReport.rating} size="text-5xl" />
                                </span>
                            </div>
                        </div>

                        <div className="border-4 border-double border-blue-400 p-6 rounded-lg bg-blue-50 mb-4">
                            <p
                                className="font-bold text-center mb-4 text-lg"
                                style={{ fontFamily: "Comic Sans MS, cursive" }}
                            >
                                Walk Details
                            </p>

                            <div className="mb-4">
                                <p
                                    className="text-center text-base font-bold mb-2"
                                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                                >
                                    ⚡ Zoomies Meter ⚡
                                </p>
                                <div className="text-center">
                                    <span className="inline-block bg-white px-4 py-2 rounded-full border-2 border-black font-bold text-lg">
                                        {viewingReport.energyLevel === 1 && "🐢 Sleepy"}
                                        {viewingReport.energyLevel === 2 && "🚶 Calm"}
                                        {viewingReport.energyLevel === 3 && "🏃 Active"}
                                        {viewingReport.energyLevel === 4 && "⚡ Energetic"}
                                        {viewingReport.energyLevel === 5 && "🚀 ZOOMIES!"}
                                    </span>
                                </div>
                            </div>

                            <div className="text-center">
                                <span
                                    className={`inline-block px-6 py-3 rounded-full border-2 border-black font-bold text-lg ${
                                        viewingReport.pooped ? "bg-green-200" : "bg-gray-200"
                                    }`}
                                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                                >
                                    💩 {viewingReport.pooped ? "Pooped! ✓" : "No Poop"}
                                </span>
                            </div>
                        </div>

                        {viewingReport.notes && (
                            <div className="mb-6">
                                <p
                                    className="font-bold text-base mb-2 text-center"
                                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                                >
                                    Comments:
                                </p>
                                <p
                                    className="border-2 border-black rounded p-4 text-base text-center"
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
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-amber-50 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <div
                            className="text-sm font-bold text-gray-600"
                            style={{ fontFamily: "Comic Sans MS, cursive" }}
                        >
                            Step {currentStep + 1} of {steps.length}
                        </div>
                        <div className="flex gap-2">
                            {steps.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-3 h-3 rounded-full ${
                                        idx <= currentStep ? "bg-orange-500" : "bg-gray-300"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-2xl p-8 border-8 border-double border-orange-400 min-h-96 flex flex-col">
                    {steps[currentStep] === "photo" && (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <h2
                                className="text-3xl font-bold mb-6 text-center"
                                style={{ fontFamily: "Comic Sans MS, cursive" }}
                            >
                                📸 Take a Photo
                            </h2>
                            {currentReport.photo ? (
                                <div className="relative">
                                    <Image
                                        src={currentReport.photo.toString()}
                                        alt="Dog"
                                        className="w-96 h-96 object-cover rounded-lg border-4 border-orange-400"
                                    />
                                    <button
                                        onClick={() => setCurrentReport({ ...currentReport, photo: null })}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-96 h-96 border-4 border-dashed border-orange-400 rounded-lg cursor-pointer hover:border-orange-500 transition bg-orange-50">
                                    <Camera className="w-16 h-16 text-orange-400 mb-3" />
                                    <span
                                        className="text-xl font-bold text-orange-600"
                                        style={{ fontFamily: "Comic Sans MS, cursive" }}
                                    >
                                        Tap to add photo
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoUpload}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>
                    )}

                    {steps[currentStep] === "name" && (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <h2
                                className="text-3xl font-bold mb-6 text-center"
                                style={{ fontFamily: "Comic Sans MS, cursive" }}
                            >
                                🐕 What&apos;s their name?
                            </h2>
                            <input
                                type="text"
                                value={currentReport.dogName}
                                onChange={(e) => setCurrentReport({ ...currentReport, dogName: e.target.value })}
                                className="w-full max-w-md text-3xl text-center border-b-4 border-orange-400 focus:outline-none py-4"
                                style={{ fontFamily: "Comic Sans MS, cursive" }}
                                placeholder="Enter name"
                                autoFocus
                            />
                        </div>
                    )}

                    {steps[currentStep] === "rating" && (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <h2
                                className="text-3xl font-bold mb-6 text-center"
                                style={{ fontFamily: "Comic Sans MS, cursive" }}
                            >
                                Good Boy or Girl?
                            </h2>

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
                        </div>
                    )}

                    {steps[currentStep] === "zoomies" && (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <h2
                                className="text-3xl font-bold mb-8 text-center"
                                style={{ fontFamily: "Comic Sans MS, cursive" }}
                            >
                                ⚡ Zoomies Meter ⚡
                            </h2>

                            <div className="w-full max-w-md mb-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <span
                                        className="text-base font-bold"
                                        style={{ fontFamily: "Comic Sans MS, cursive" }}
                                    >
                                        Low
                                    </span>
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        value={currentReport.energyLevel}
                                        onChange={(e) =>
                                            setCurrentReport({
                                                ...currentReport,
                                                energyLevel: parseInt(e.target.value),
                                            })
                                        }
                                        className="flex-1 h-4 bg-linear-to-r from-blue-300 via-yellow-300 to-red-400 rounded-full appearance-none cursor-pointer"
                                    />
                                    <span
                                        className="text-base font-bold"
                                        style={{ fontFamily: "Comic Sans MS, cursive" }}
                                    >
                                        High
                                    </span>
                                </div>
                                <div className="text-center">
                                    <span className="inline-block bg-white px-6 py-3 rounded-full border-4 border-black font-bold text-2xl">
                                        {currentReport.energyLevel === 1 && "🐢 Sleepy"}
                                        {currentReport.energyLevel === 2 && "🚶 Calm"}
                                        {currentReport.energyLevel === 3 && "🏃 Active"}
                                        {currentReport.energyLevel === 4 && "⚡ Energetic"}
                                        {currentReport.energyLevel === 5 && "🚀 ZOOMIES!"}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-4 cursor-pointer bg-white px-8 py-4 rounded-full border-4 border-black hover:bg-gray-50">
                                    <input
                                        type="checkbox"
                                        checked={currentReport.pooped}
                                        onChange={(e) =>
                                            setCurrentReport({ ...currentReport, pooped: e.target.checked })
                                        }
                                        className="w-8 h-8 cursor-pointer"
                                    />
                                    <span
                                        className="text-2xl font-bold"
                                        style={{ fontFamily: "Comic Sans MS, cursive" }}
                                    >
                                        💩 Pooped?
                                    </span>
                                </label>
                            </div>
                        </div>
                    )}

                    {steps[currentStep] === "comments" && (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <h2
                                className="text-3xl font-bold mb-6 text-center"
                                style={{ fontFamily: "Comic Sans MS, cursive" }}
                            >
                                📝 Any comments?
                            </h2>
                            <textarea
                                value={currentReport.notes}
                                onChange={(e) => setCurrentReport({ ...currentReport, notes: e.target.value })}
                                className="w-full max-w-2xl border-4 border-orange-400 rounded-lg focus:outline-none resize-none px-4 py-4 text-xl"
                                style={{ fontFamily: "Comic Sans MS, cursive" }}
                                rows={6}
                                placeholder="Optional - Add any fun stories or observations..."
                            />
                        </div>
                    )}

                    {steps[currentStep] === "preview" && (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <h2
                                className="text-3xl font-bold mb-6 text-center"
                                style={{ fontFamily: "Comic Sans MS, cursive" }}
                            >
                                🎉 All done!
                            </h2>
                            <p className="text-xl mb-8 text-center" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                                Ready to save {currentReport.dogName}&apos;s report card?
                            </p>
                            <button
                                onClick={handleSaveReport}
                                className="bg-green-500 text-white px-12 py-4 text-2xl font-bold rounded-full hover:bg-green-600 shadow-lg transition transform hover:scale-105"
                                style={{ fontFamily: "Comic Sans MS, cursive" }}
                            >
                                Save Report Card! 🐾
                            </button>
                        </div>
                    )}

                    <div className="flex justify-between items-center mt-8 pt-6 border-t-2 border-gray-200">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold ${
                                currentStep === 0
                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                            }`}
                            style={{ fontFamily: "Comic Sans MS, cursive" }}
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back
                        </button>

                        <div className="flex gap-3">
                            {currentStep < steps.length - 1 && (
                                <button
                                    onClick={handleSkip}
                                    className="px-6 py-3 rounded-full font-bold bg-gray-200 text-gray-600 hover:bg-gray-300"
                                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                                >
                                    Skip
                                </button>
                            )}

                            {currentStep < steps.length - 1 && (
                                <button
                                    onClick={handleNext}
                                    disabled={!canProceed()}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold ${
                                        !canProceed()
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-orange-500 text-white hover:bg-orange-600"
                                    }`}
                                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                                >
                                    Next
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
