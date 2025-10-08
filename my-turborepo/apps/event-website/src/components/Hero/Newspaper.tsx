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
            x="52%"
            y="41%"
            textAnchor="middle"
            fontFamily="KoPub_Batang"
            fontSize="60"
            fontWeight="800"
            fill="black"
            transform="rotate(0.38)"
          >
            APPLICATIONS CLOSE OCT. 24
          </text>

          {/* Button */}
          <foreignObject x="30%" y="44%" width="40%" height="8%" rotate={0.38}>
            <div className="flex items-center justify-center w-full h-full">
              <a
                href="https://tamudatathon.org/apply"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ThemedButton
                  className="w-[400px] h-24 text-4xl  px-8"
                >
                  Apply Now!
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
            fontSize="55"
            fontWeight="900"
            fill="black"
            transform="rotate(0.38)"
          >
            WHAT IS DATATHON?
          </text>

          {/* Description */}
          <foreignObject x="15%" y="70%" width="70%" height="25%" rotate={0.38}>
            <p className="font-kopub text-black text-center text-3xl leading-relaxed">
              We are the largest data science and machine learning focused hackathon
              in Texas located at Texas A&M University in College Station.
            </p>
          </foreignObject>
        </svg>

        {/* Desktop */}
        <svg viewBox="0 0 1400 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-[800px] hidden md:block">
          {/* Background Newspaper Illustration */}
          <image href="/images/newspaper.svg" width="100%" height="100%" />

          {/* Title Text */}
          <text
            x="50%"
            y="20%"
            textAnchor="middle"
            fontFamily="KoPub_Batang"
            fontSize="60"
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
            fontSize="40"
            fontWeight="800"
            fill="black"
          >
            APPLICATIONS CLOSE OCT. 24
          </text>

          {/* Button */}
          <foreignObject x="35%" y="42%" width="30%" height="10%">
            <div className="flex items-center justify-center w-full h-full z-50">
              <a
                href="https://tamudatathon.org/apply"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-black text-white px-6 py-3 text-lg rounded">
                  Apply Now!
                </button>
              </a>
            </div>
          </foreignObject>

          {/* What is Datathon Heading */}
          <text
            x="50%"
            y="67%"
            textAnchor="middle"
            fontFamily="KoPub_Batang"
            fontSize="35"
            fontWeight="900"
            fill="black"
          >
            WHAT IS DATATHON?
          </text>

          {/* Description */}
          <foreignObject x="25%" y="70%" width="50%" height="20%">
            <p className="font-kopub text-black text-center text-xl leading-relaxed">
              We are the largest data science and machine learning focused hackathon
              in Texas located at Texas A&M University in College Station.
            </p>
          </foreignObject>
        </svg>
      </>
    </div>
  )
}
