"use client";
import { useState } from "react";

export default function ChallengeCard({ title, desc }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{desc}</p>

                    {/* Read More Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Read More
                    </button>
                </div>
            </div>

            {/* Modal Window */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title} - Details</h3>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                            More information about {title}. This modal pops up when clicking "Read More."
                        </p>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
