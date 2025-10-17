import { ThemedButton } from "../ui/themed-button";

export default function NewspaperSection() {
  return (
    <div className="w-full max-w-[1150px] mx-auto px-4">
      <>
        {/* Mobile */}
        <svg viewBox="0 0 1200 1600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block sm:hidden">
          {/* Background Newspaper Illustration */}
          <image href="/images/newspaper_long.svg" width="100%" height="100%" />

          {/* Title Text */}
          <text
            x="53%"
            y="20%"
            textAnchor="middle"
            fontFamily="KoPub_Batang"
            fontSize="100"
            fontWeight="800"
            fill="black"
            transform="rotate(0.38)"
          >
            TAMU DATATHON
          </text>

          {/* Date */}
          <text
            x="54%"
            y="28%"
            textAnchor="middle"
            fontFamily="KoPub_Batang"
            fontSize="40"
            fill="black"
            transform="rotate(0.38)"
          >
            NOVEMBER 8–9, 2025 AT MSC
          </text>

          {/* Applications Deadline */}
          <text
            x="53%"
            y="40%"
            textAnchor="middle"
            fontFamily="KoPub_Batang"
            fontSize="65"
            fontWeight="400"
            fill="black"
            transform="rotate(0.38)"
          >
            APPLICATIONS CLOSE OCT. 24
          </text>

          {/* Button */}
          <foreignObject x="26%" y="44%" width="50%" height="8%" rotate={0.38}>
            <div className="flex items-center justify-center w-full h-full">
              <a
                href="https://tamudatathon.org/apply"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ThemedButton
                  className="w-[430px] h-24 text-4xl  px-8"
                >
                  APPLY
                </ThemedButton>
              </a>
            </div>
          </foreignObject>

          {/* What is Datathon Heading */}
          <text
            x="52%"
            y="67%"
            textAnchor="middle"
            fontFamily="KoPub_Batang"
            fontSize="70"
            fontWeight="400"
            fill="black"
            transform="rotate(0.38)"
          >
            WHAT IS DATATHON?
          </text>

          {/* Description */}
          <foreignObject x="15%" y="71%" width="70%" height="25%" rotate={0.38}>
            <p className="font-kopub text-black text-center text-4xl leading-relaxed">
              We are the largest data science and machine learning focused hackathon
              in Texas located at Texas A&M University in College Station.
            </p>
          </foreignObject>
        </svg>

        {/* Desktop */}
        <svg viewBox="0 0 1400 1000" xmlns="http://www.w3.org/2000/svg" className="w-full max-h-[800px] hidden sm:block">
          {/* Background Newspaper Illustration */}
          <image href="/images/newspaper.svg" width="100%" height="100%" />

          {/* Title Text */}
          <text
            x="50%"
            y="21%"
            textAnchor="middle"
            fontFamily="KoPub_Batang"
            fontSize="85"
            fontWeight="normal"
            fill="black"
          >
            TAMU DATATHON
          </text>

          {/* Date */}
          <text
            x="50%"
            y="28%"
            textAnchor="middle"
            fontFamily="KoPub_Batang"
            fontSize="30"
            fill="black"
          >
            NOVEMBER 8–9, 2025 AT MSC
          </text>

          {/* Applications Deadline */}
          <text
            x="50%"
            y="40%"
            textAnchor="middle"
            fontFamily="KoPub_Batang"
            fontSize="50"
            fontWeight="400"
            fill="black"
          >
            APPLICATIONS CLOSE OCT. 24
          </text>

          {/* Button */}
          <foreignObject x="26%" y="44%" width="50%" height="10%" rotate={0.38}>
            <div className="flex items-center justify-center w-full h-full">
              <a
                href="https://tamudatathon.org/apply"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ThemedButton
                  className="w-[350px] h-20 text-4xl px-8"
                >
                  APPLY
                </ThemedButton>
              </a>
            </div>
          </foreignObject>

          {/* What is Datathon Heading */}
          <text

            x="50%"
            y="68%"
            textAnchor="middle"
            fontFamily="KoPub_Batang"
            fontSize="50"
            fontWeight="400"
            fill="black"
          >
            WHAT IS DATATHON?
          </text>

          {/* Description */}
          <foreignObject x="25%" y="71%" width="50%" height="20%">
            <p className="text-center font-kopub text-black text-center text-3xl leading-relaxed">
              We are the largest data science and machine learning focused hackathon
              in Texas located at Texas A&M University in College Station.
            </p>
          </foreignObject>
        </svg>
      </>
    </div>
  )
}
