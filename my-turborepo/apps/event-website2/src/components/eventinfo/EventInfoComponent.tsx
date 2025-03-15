export default function EventInfoComponent({}) {

    return (
        <div className="">
            <h2 className="text-2xl font-bold text-center mb-3">Event Info</h2>
            <div className="flex flex-col relative justify-center items-center">
                <div
                    className="w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute justify-center text-center mb-3">
                    <svg className="">
                        <text x="5" y="15" font-size="20" fill="#9A5C24"> ADD SHAPES SVG HERE</text>
                    </svg>
                    <h2 className="text-2xl">When
                        and Where</h2>
                    <h2 className="text-xl">April 5, 2025
                    </h2>
                    <h2 className="text-xl">ILCB 207
                    </h2>
                </div>

                <svg width="576" height="366" viewBox="0 0 576 366" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="576" height="365.668" rx="50" fill="#B8905F"/>
                </svg>
            </div>

        </div>
    );
}
