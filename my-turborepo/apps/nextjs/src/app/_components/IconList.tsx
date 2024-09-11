import React from 'react';
import Link from 'next/link';

interface Icon {
    name: string;
    route: string;
    image: string;
    // Add any other properties you need for the icon
}

const routes: Icon[] = [
    { name: 'home', route: '/preregistration', image: '/Pixel_ComputerIcon.png' },
    { name: 'about', route: '/about', image: '/Pixel_InternetIcon.png' },
    { name: 'contact', route: '/contact', image: '/Pixel_WorldIcon.png' },
    { name: 'schedule', route: '/about', image: '/Pixel_CDIcon.png' },
    { name: 'Challenges OMGG', route: '/contact', image: '/Pixel_EmailIcon.png' },
];

import Image from 'next/image'; // Import the Image component from the appropriate library

const IconList = () => {
    return (
        // className='absolute top-0 grid grid-cols-2 pt-4 gap-1'
        <div className='flex flex-rows z-10'>
            {routes.map((icon) => (
                <Link key={icon.name} href={icon.route}>
                    <div className='flex w-[100px] flex-col items-center justify-center text-center hover:bg-blue-400 hover:opacity-50 hover:shadow-[inset_0_0_0_2px_rgba(14,116,144,1)] duration-200 focus:border-4 border-white'>
                        {icon.image &&
                            <>
                                <Image src={icon.image} alt={'not found'} width={100} height={100} className='' />
                                <div className='text-wrap'>{icon.name}</div>
                            </>
                        } {/* Use the Image component with the correct props */}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default IconList;
