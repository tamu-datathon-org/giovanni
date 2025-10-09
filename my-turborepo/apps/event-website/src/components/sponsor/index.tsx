import React from 'react'
import Image from 'next/image'

function Sponsors() {
    return (
        <div className='w-full bg-[#322C29]'>
            <div className='w-full flex flex-col justify-center items-center gap-y-4 md:gap-y-8'>
                <span className='font-kopub bold text-white text-3xl md:text-[80px]'>Thanks To Our</span>
                <Image
                    src="/images/sponsor-logo/sponsor_title.svg"
                    width={800}
                    height={200}
                    alt='sponsor title'
                    className='w-[80vw] max-w-[800px]'
                />
            </div>

            <div className='relative w-full relative grid grid-cols-12 grid-rows-12'>
                <Image
                    src="/images/sponsor_bg.svg"
                    alt="Background"
                    width={1920}
                    height={800}
                    quality={100}
                    className="col-start-1 row-start-1 col-span-12 row-span-12 h-auto" // Ensures it covers the container
                    priority // optional: loads it faster
                />

                <div className='relative z-10 col-start-2 row-start-7 col-span-6 row-span-1 transform scale-[0.7] translate-y-[-40px]'>
                    <Image
                        src="/images/sponsor-logo/textured/hitachi_textured.png"
                        alt="hitachi"
                        fill
                        quality={100}
                        priority // optional: loads it faster
                    />
                </div>

                <div className='relative z-10 col-start-2 row-start-7 col-span-3 row-span-2 transform scale-[0.8] translate-y-4 md:translate-y-10'>
                    <Image
                        src="/images/sponsor-logo/textured/sec_textured.png"
                        alt="hitachi"
                        fill
                        quality={100}
                        priority // optional: loads it faster
                    />
                </div>

                <div className='relative z-10 col-start-2 row-start-9 col-span-4 row-span-1 transform scale-[0.8] translate-y-4 md:translate-y-10'>
                    <Image
                        src="/images/sponsor-logo/textured/msy_textured.png"
                        alt="msy"
                        fill
                        quality={100}
                        priority // optional: loads it faster
                    />
                </div>

                <div className='relative z-10 col-start-2 row-start-10 col-span-5 row-span-2 transform scale-y-[0.8]'>
                    <Image
                        src="/images/sponsor-logo/textured/databricks_textured.png"
                        alt="databricks"
                        fill
                        quality={100}
                    />
                </div>
                {/* Right side */}

                <div className='relative z-10 col-start-6 row-start-5 col-span-4 row-span-1'>
                    <Image
                        src="/images/sponsor-logo/textured/heb_textured.png"
                        alt="hitachi"
                        fill
                        quality={100}
                        priority // optional: loads it faster
                    />
                </div>

                <div className='relative z-10 col-start-7 row-start-7 col-span-6 row-span-1 transform scale-[0.8] translate-x-4'>
                    <Image
                        src="/images/sponsor-logo/textured/qualcomm_textured.png"
                        alt="hitachi"
                        fill
                        quality={100}
                        priority // optional: loads it faster
                    />
                </div>

                <div className='relative z-10 col-start-5 row-start-8 col-span-3 row-span-2 transform scale-[0.8] translate-x-4'>
                    <Image
                        src="/images/sponsor-logo/textured/p66_textured.png"
                        alt="p66"
                        fill
                        quality={100}
                        priority // optional: loads it faster
                    />
                </div>

                <div className='relative z-10 col-start-8 row-start-10 col-span-2 row-span-1 transform scale-[0.7]'>
                    <Image
                        src="/images/sponsor-logo/textured/tamu_textured.png"
                        alt="tamu"
                        fill
                        quality={100}
                        priority // optional: loads it faster
                    />
                </div>

                <div className='relative z-10 col-start-8 row-start-9 col-span-4 row-span-1 transform scale-[0.4] hover:scale-[0.5] transition-transform'>
                    <a href="http://mlh.link/MLH-PureButtons-hackathons">
                        <Image
                            src="/images/sponsor-logo/textured/pure_textured.png"
                            alt="pure buttons"
                            fill
                            quality={100}
                            priority // optional: loads it faster
                        />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Sponsors