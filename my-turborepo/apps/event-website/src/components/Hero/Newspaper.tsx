

export default function NewspaperSection() {
  return (
    <div className="container mx-auto px-4">
      <svg
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
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

        {/* Button (using foreignObject so HTML can go inside SVG) */}
        <foreignObject x="35%" y="42%" width="30%" height="10%">
          <div className="flex items-center justify-center w-full h-full">
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
          fontFamily="sans-serif"
          fontSize="35"
          fontWeight="900"
          fill="black"
        >
          WHAT IS DATATHON?
        </text>

        {/* Description (multi-line text) */}
        <foreignObject x="25%" y="70%" width="50%" height="20%">
          <p className="font-serif text-black text-center text-lg leading-relaxed">
            We are the largest data science and machine learning focused hackathon
            in Texas located at Texas A&M University in College Station.
          </p>
        </foreignObject>
      </svg>
    </div>
  )
}
