interface FlowerDoodleInterface {
    color: string;
    size: string;
}

export default function FlowerDoodle({ color, size = "w-8 h-8" }: FlowerDoodleInterface) {
    return (
        <div className={`${size} relative`}>
            <div className={`absolute inset-0 ${color} rounded-full`}></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-300 rounded-full border-2 border-orange-400"></div>
            </div>
        </div>
    );
}
