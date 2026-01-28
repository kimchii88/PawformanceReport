"use client";

import React, { useState, useEffect } from "react";
import { Camera, X, ArrowLeft, ArrowRight, Download, Share2 } from "lucide-react";
import FlowerDoodle from "./FlowerDoodle";
import ColorfulTitle from "./ColorfulTitle";
import WeatherIcon, { WeatherType } from "./WeatherIcon";
import RatingFace, { RatingFaceTypes } from "./RatingFace";
import { fetchWeather } from "@/helpers/fetchWeather";
import Image from "next/image";
import UploadPhoto from "./steps/UploadPhoto";
import Name from "./steps/Name";
import Comments from "./steps/Comments";
import Preview from "./steps/Preview";
import { ProgressStepper } from "./ProgressStepper";
import BehaviourChips from "./BehaviourChips";
import Energy, { getEnergyLabel } from "./steps/Energy";
import ReportCardTemplate from "./ReportCardTemplate";

export interface CurrentReportInterface {
    photo: string | null;
    dogName: string;
    gender: string;
    date: string;
    rating: RatingFaceTypes;
    energyLevel: number;
    pooped: boolean;
    weather: string;
    temperature: string;
    notes: string;
    behaviours: BehaviourTag[];
}

export interface NewReportInterface {
    id: string;
    photo: string | null;
    dogName: string;
    gender: string;
    date: string;
    rating: RatingFaceTypes;
    energyLevel: number;
    pooped: boolean;
    weather: WeatherType;
    temperature: string;
    notes: string;
    behaviours: BehaviourTag[];
}

export type BehaviourTag =
    | "loose-leash"
    | "pulling"
    | "sniffing"
    | "reactive"
    | "barking"
    | "checked-in"
    | "crazy"
    | "nervous"
    | "playful"
    | "calm"
    | "wee"
    | "poop";

export const BEHAVIOUR_OPTIONS: Array<{ value: BehaviourTag; label: string }> = [
    { value: "sniffing", label: "👃 Sniff patrol" },
    { value: "playful", label: "🎾 Playful" },
    { value: "calm", label: "😌 Calm" },
    { value: "wee", label: "💦 Wee walk" },
    { value: "poop", label: "💩 Pooped" },
    { value: "loose-leash", label: "🐕 Loose leash" },
    { value: "pulling", label: "🦮 Pulling" },
    { value: "reactive", label: "🐿️ Reactive" },
    { value: "barking", label: "🗯️ Barked" },
    { value: "crazy", label: "🤪 Crazy" },
    { value: "nervous", label: "🙈 Nervous" },
    { value: "checked-in", label: "💛 Checked in" },
];

export default function ReportCard() {
    const [reports, setReports] = useState<NewReportInterface[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [currentReport, setCurrentReport] = useState<CurrentReportInterface>({
        photo: null,
        dogName: "",
        gender: "",
        date: new Date().toISOString().split("T")[0],
        rating: "happy",
        energyLevel: 65,
        pooped: false,
        weather: "Sunny",
        temperature: "",
        notes: "",
        behaviours: [],
    });

    const [viewingReport, setViewingReport] = useState<NewReportInterface>();

    const steps = ["name", "photo", "energy", "behaviour", "comments", "preview"];

    useEffect(() => {
        fetchWeather(setCurrentReport);
    }, []);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentReport({ ...currentReport, photo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNext = () => {
        if (steps[currentStep] === "comments") {
            handleSaveReport();
        }
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
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
            photo: currentReport.photo as string,
            energyLevel: currentReport.energyLevel,
        };
        setReports([newReport, ...reports]);
        setViewingReport(newReport);
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
            behaviours: [],
        });
        setCurrentStep(0);
    };

    return (
        <div className="min-h-screen bg-[url('/images/crimp_paper.jpg')] bg-cover p-6 ">
            <div className="max-w-2xl mx-auto h-screen min-h-screen">
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-4 justify-self-center">
                        <div className="text-3xl font-bold">✨ 🦴 Create Your Pup’s Report Card 🐕 ✨</div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-2xl p-8 border-8 border-double border-orange-400 h-10/12 flex flex-col overflow-hidden justify-between">
                    <div className="sticky top-0 z-20 bg-white px-8 pt-8 pb-4">
                        <ProgressStepper currentStep={currentStep} steps={steps} />
                    </div>
                    <div className="flex-1 overflow-y-auto px-8 py-6">
                        {steps[currentStep] === "name" && (
                            <Name currentReport={currentReport} setCurrentReport={setCurrentReport} />
                        )}
                        {steps[currentStep] === "photo" && (
                            <UploadPhoto
                                currentReport={currentReport}
                                setCurrentReport={setCurrentReport}
                                handlePhotoUpload={handlePhotoUpload}
                            />
                        )}
                        {steps[currentStep] === "energy" && (
                            <Energy currentReport={currentReport} setCurrentReport={setCurrentReport} />
                        )}
                        {steps[currentStep] === "behaviour" && (
                            <BehaviourChips currentReport={currentReport} setCurrentReport={setCurrentReport} />
                        )}
                        {steps[currentStep] === "comments" && (
                            <Comments currentReport={currentReport} setCurrentReport={setCurrentReport} />
                        )}
                        {steps[currentStep] === "preview" && viewingReport && (
                            <ReportCardTemplate viewingReport={viewingReport} />
                        )}
                    </div>
                    <div className="flex flex-row w-full justify-between border-t-2 border-gray-200  items-center mt-8 pt-6  ">
                        <div className="">
                            {currentStep !== 0 && (
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
                            )}
                        </div>
                        <div className="flex gap-3 justify-self-end self-end place-self-end">
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
