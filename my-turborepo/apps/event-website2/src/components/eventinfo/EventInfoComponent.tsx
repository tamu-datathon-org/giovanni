export default function EventInfoComponent({}) {

    return (
        <div className="">
            <h2 className="text-2xl font-bold text-center mb-3">Event Info</h2>
            <div className="flex flex-col relative justify-center items-center text-offblacktext">
                <div
                    className="gap-2 flex flex-col justify-center items-center w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute  text-center mb-3">


                    <svg width="272" height="87" viewBox="0 0 272 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_359_5)">
                            <circle cx="43.3293" cy="39.3293" r="34.3293" stroke="#36393E" stroke-width="10"/>
                            <path d="M105.818 73.2652L136.378 11.3036L166.938 73.2652H105.818Z" stroke="#36393E"
                                  stroke-width="10"/>
                            <rect x="194.866" y="5.52439" width="68.1341" height="68.1341" stroke="#36393E"
                                  stroke-width="10"/>
                        </g>
                        <defs>
                            <filter id="filter0_d_359_5" x="0" y="0" width="272" height="86.6585"
                                    filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix"
                                               values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="4"/>
                                <feGaussianBlur stdDeviation="2"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_359_5"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_359_5"
                                         result="shape"/>
                            </filter>
                        </defs>
                    </svg>

                    <div className="">
                        <h2 className="text-2xl">When
                            and Where</h2>
                        <h2 className="text-xl">April 5, 2025
                        </h2>
                        <h2 className="text-xl">ILCB 207
                        </h2>
                    </div>
                </div>

                <img src="/images/locationcard.png" alt="Location info"/>
            </div>

        </div>
    );
}
