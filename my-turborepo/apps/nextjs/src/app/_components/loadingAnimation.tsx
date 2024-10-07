"use client"
import { useState, useEffect } from 'react'
// const color1 = "teal-400"
// const color2 = "cyan-700"
export default function LoadingAnimation() {
    const [progress, setProgress] = useState(0)
    const [text, setText] = useState('')
    const fullText = "LOADING APPLICATION..."

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => (prev < 100 ? prev + 1 : 100))
        }, 50)

        const textInterval = setInterval(() => {
            setText(prev => fullText.slice(0, prev.length + 1))
        }, 100)

        return () => {
            clearInterval(progressInterval)
            clearInterval(textInterval)
        }
    }, [])

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-teal-400 font-mono w-screen absolute top-0 p-5">
            <div className="w-full max-w-md p-6 border-2 border-teal-400 rounded-lg shadow-lg bg-black">
                <h1 className="text-2xl mb-4">System Bootup</h1>

                <div className="mb-4">
                    <div className="h-6 w-full bg-gray-900 rounded-full overflow-hidden border border-teal-400">
                        <div
                            className="h-full bg-teal-400 transition-all duration-100 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="mt-2 text-right">{progress}%</p>
                </div>

                <div className="h-20 bg-black p-2 rounded border border-teal-400 overflow-hidden">
                    <p className="whitespace-pre-wrap">
                        {text}
                        <span className="animate-pulse">_</span>
                    </p>
                </div>

                <div className="mt-4 flex justify-between text-xs">
                    <p>CPU: 386DX</p>
                    <p>RAM: 4MB</p>
                    <p>HDD: 120MB</p>
                </div>
            </div>
        </div>
    )
}