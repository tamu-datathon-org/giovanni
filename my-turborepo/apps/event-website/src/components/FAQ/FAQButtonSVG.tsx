export default function FAQButtonSVG({ question }: { question: string }) {
    return (
        <svg width="432" height="94" viewBox="0 0 447 94" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0.5 16.5C0.5 6.2472 29 1 29 1C173.573 17.8333 447.5 57.05 447.5 73.45C447.5 89.85 433 94 429.5 94L199.449 23.95L64.8637 17.45C42.4327 20.7833 0.5 28 0.5 16.5Z"
                fill="#CE7728"/>
            <rect x="24.5" y="0.950012" width="423" height="76" rx="5" fill="#CE7728"/>
            <rect x="3" y="10.45" width="434" height="81" rx="7.5" fill="#E69C39" stroke="#CE7728"
                  stroke-width="5"/>
            <rect x="33" y="21.075" width="32" height="9" rx="4" fill="#EAB43A"/>
            <rect x="16" y="40.075" width="9" height="37" rx="4" fill="#EAB43A"/>
            <rect x="82" y="21.075" width="65" height="9" rx="4" fill="#EAB43A"/>
            <circle cx="53.3002" cy="48.3251" r="4.30015" fill="#E48B2D"/>
            <circle cx="185.358" cy="34.3251" r="4.30015" fill="#E48B2D"/>
            <circle cx="403.396" cy="38.3251" r="4.30015" fill="#E48B2D"/>
            <circle cx="273.914" cy="71.3251" r="4.30015" fill="#E48B2D"/>
            <circle cx="85.2277" cy="77.9797" r="4.09538" fill="#E48B2D"/>
            <circle cx="101.833" cy="53.825" r="2.25246" fill="#F6AC49"/>
            <circle cx="168.753" cy="69.5749" r="2.04769" fill="#E48B2D"/>
            <circle cx="217.896" cy="55.825" r="2.25246" fill="#F6AC49"/>
            <circle cx="318.025" cy="28.5322" r="2.45723" fill="#F6AC49"/>
            <circle cx="184.184" cy="33.575" r="2.04769" fill="#F6AC49"/>
            <circle cx="272.908" cy="70.825" r="2.25246" fill="#F6AC49"/>
            <circle cx="417.748" cy="54.825" r="2.25246" fill="#F6AC49"/>
            <circle cx="335.804" cy="74.5749" r="2.04769" fill="#E48B2D"/>
            <path d="M377 51.2313H393.022V27.3836H411.871V51.2313H426.95L402.9 74.125L377 51.2313Z"
                  fill="#E69C39"/>
            <path
                d="M393.022 13.075V27.3836M393.022 27.3836V51.2313H377L402.9 74.125L426.95 51.2313H411.871V27.3836H393.022Z"
                stroke="#CE7728" stroke-width="4"/>
            <path
                d="M436.523 14.3725L442.523 7.80524C443.755 6.45742 446 7.3286 446 9.15424V79.7521C446 80.3047 445.771 80.8327 445.368 81.2107L439.368 86.8398C438.091 88.038 436 87.1325 436 85.3812V15.7215C436 15.2223 436.187 14.7411 436.523 14.3725Z"
                fill="#B26219"/>

            <text x="3%" y="25" font-size="23" fill="#9A5C24" dy="38" dx="20">{question}</text>
        </svg>
    );
}
