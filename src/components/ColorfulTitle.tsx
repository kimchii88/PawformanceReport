interface ColorfulTitle {
    text: string;
}

export default function ColorfulTitle({ text }: ColorfulTitle) {
    const colors = [
        "text-orange-500",
        "text-red-500",
        "text-teal-500",
        "text-orange-600",
        "text-yellow-600",
        "text-blue-500",
        "text-green-500",
        "text-purple-500",
        "text-pink-500",
    ];

    return (
        <div className="flex justify-center items-center gap-1 flex-wrap text-center whitespace-pre-line">
            {text.split("").map((char, idx) => (
                <span
                    key={idx}
                    className={`text-4xl font-black ${colors[idx % colors.length]}`}
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </div>
    );
}
