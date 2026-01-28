type ChipProps = {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
};

export default function Chip({ selected, onClick, children }: ChipProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "px-4 py-2 rounded-full border-2 font-bold text-sm shadow-sm transition",
                "hover:scale-[1.02] active:scale-[0.98]",
                selected
                    ? "bg-orange-200 border-orange-500 text-orange-900"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50",
            ].join(" ")}
            style={{ fontFamily: "Comic Sans MS, cursive" }}
        >
            {children}
        </button>
    );
}
