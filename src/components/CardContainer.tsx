import { ProgressStepper } from "./ProgressStepper";

interface CardContainerInterface {
    title: string;
    children: React.ReactNode;
}

/**
 * Wrapper component for rendering the step stage and the title of the steps components
 * @param param0
 * @returns
 */

export default function CardContainer({ title, children }: CardContainerInterface) {
    return (
        <div className="flex-1 flex flex-col justify-center self-center overflow-y-scroll">
            <h2
                className="text-3xl font-bold text-center row-start-1 min-h-10 mb-5"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
            >
                {title}
            </h2>
            {children}
        </div>
    );
}
