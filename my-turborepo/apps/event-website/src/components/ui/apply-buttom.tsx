"use client"

import { Button } from "./button"

export function ApplyButton() {
  return (
    <Button
      className="
        w-[400px] h-full
        bg-gray-200 text-black border-4 border-black
        hover:bg-red-800 hover:text-white
        transition-all duration-300 ease-in-out
        font-semibold text-5xl tracking-wide
        rounded-lg
        font-['KoPub_Batang']
        shadow-md hover:shadow-lg

      "
      onClick={() => {
        // Add your application logic here
        console.log("Apply button clicked!")
      }}
    >
      APPLY
    </Button>
  )
}
