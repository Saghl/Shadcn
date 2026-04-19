"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export function DragScroll({ className, children }: React.ComponentProps<"div">) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isDragging = React.useRef(false)
  const startX = React.useRef(0)
  const scrollLeft = React.useRef(0)

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startX.current = e.pageX - ref.current!.offsetLeft
    scrollLeft.current = ref.current!.scrollLeft
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - ref.current!.offsetLeft
    ref.current!.scrollLeft = scrollLeft.current - (x - startX.current)
  }

  const stopDrag = () => { isDragging.current = false }

  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-3 overflow-x-auto pb-2 cursor-pointer select-none",
        "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
        className
      )}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {children}
    </div>
  )
}
