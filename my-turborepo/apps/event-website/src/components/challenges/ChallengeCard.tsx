"use client";  // Ensure this is at the top

import { useState } from "react";

export default function ChallengeCard({ title, desc, details }) {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = (e) => {
        // Close modal only if the background is clicked
        if (e.target.id === "modal-background") {
            setIsOpen(false);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-2 cursor-pointer max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700" onClick={() => setIsOpen(true)}>
                <a href="#">
                    <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                </a>
                <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{desc}</p>
                </div>
            </div>

            {/* Modal Window */}
            {isOpen && (
                <div
                    id="modal-background"
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    onClick={closeModal}  // Clicking this background closes the modal
                >
                    <div
                        className="flex flex-col gap-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full"
                        onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title} - Details</h3>
                        <p className="mt-2 text-gray-700 dark:text-gray-300">
                            {details}
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
