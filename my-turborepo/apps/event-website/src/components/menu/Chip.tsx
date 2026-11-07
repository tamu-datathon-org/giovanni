import type { ComponentProps, ReactNode } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type ChipProps = {
  children: ReactNode
  color?: keyof typeof colors
  textClassName?: string
} & Omit<ComponentProps<"div">, "color">

const colors = {
  blue: "/event_assets/chips/blue-chip.svg",
  green: "/event_assets/chips/green-chip.svg",
  red: "/event_assets/chips/red-chip.svg",
  teal: "/event_assets/chips/teal-chip.svg",
  yellow: "/event_assets/chips/yellow-chip.svg",
  black: "/event_assets/chips/black-chip.svg",
}

export function Chip({
  children,
  color = 'blue',
  className,
  textClassName,
  ...props
} : ChipProps) {
  return (
    <div className={cn("relative inline-flex size-[var(--chip,4rem)] items-center justify-center drop-shadow-xl [container-type:inline-size]", className)} {...props}>
      <Image src={colors[color]} alt="" draggable="false" fill />
      <span className={cn("relative font-righteous text-[17cqw] text-white select-none", textClassName)}>
        {children}
      </span>
    </div>
  )
}