export type RatingFaceTypes = "happy" | "neutral" | "unhappy";

interface RatingFaceInterface {
    type: RatingFaceTypes;
    size: string;
}

export default function RatingFace({ type, size = "text-6xl" }: RatingFaceInterface) {
    const faces = {
        happy: "😊",
        neutral: "😐",
        unhappy: "☹️",
    };
    return <span className={size}>{faces[type]}</span>;
}
