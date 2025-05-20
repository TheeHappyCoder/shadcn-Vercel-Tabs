"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("relative flex flex-col gap-0", className)} 
      {...props}
    />
  )
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & { children: React.ReactNode }) {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null)
  const [activePosition, setActivePosition] = React.useState({ width: 0, x: 0 })
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  const calculatePosition = (index: number) => {
    const tab = tabRefs.current[index]
    if (tab) {
      const rect = tab.getBoundingClientRect()
      const containerLeft = tabRefs.current[0]?.getBoundingClientRect().left ?? 0
      return {
        width: rect.width,
        x: rect.left - containerLeft
      }
    }
    return { width: 0, x: 0 }
  }

  // ⬇️ Ensure position is set after layout and refs are attached
  React.useLayoutEffect(() => {
    setActivePosition(calculatePosition(activeIndex))
  }, [activeIndex, children])

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "relative flex items-center gap-0 h-14 px-0 border-b bg-transparent border-zinc-200 dark:border-zinc-700",
        className
      )}
      {...props}
    >
      {React.Children.toArray(children)
        .filter(React.isValidElement)
        .map((child: React.ReactElement, index: number) =>
          React.cloneElement(child, {
            ref: (el: HTMLButtonElement) => (tabRefs.current[index] = el),
            onClick: () => setActiveIndex(index),
            onMouseEnter: () => setHoverIndex(index),
            onMouseLeave: () => setHoverIndex(null),
            key: index,
          })
        )}

      {/* Hover Box */}
      {hoverIndex !== null && (
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-8 px-1 rounded-[4px] bg-muted-foreground/10"
          layoutId="hoverTabBox"
          initial={false}
          animate={calculatePosition(hoverIndex)}
          transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.3 }}
        />
      )}

      {/* Active Underline */}
      <motion.div
        className={cn(
          "absolute bottom-0 h-[2px] rounded-md bg-foreground dark:bg-foreground-dark"
        )}
        layoutId="activeUnderline"
        initial={false}
        animate={activePosition}
        transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.3 }}
      />
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  value,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      value={value}
      className={cn(
        "relative z-20 px-4 py-2 text-sm font-medium transition-colors duration-300 ease-in-out",
        "text-muted-foreground hover:text-foreground data-[state=active]:text-foreground",
        "dark:text-muted-dark dark:hover:text-foreground-dark", 
        "flex items-center justify-center rounded-md",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("p-4", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
