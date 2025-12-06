"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isNavigating, setIsNavigating] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Start progress when navigation begins
    setIsNavigating(true)
    setProgress(30)

    const timer1 = setTimeout(() => setProgress(60), 100)
    const timer2 = setTimeout(() => setProgress(80), 200)
    const timer3 = setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setIsNavigating(false)
        setProgress(0)
      }, 200)
    }, 300)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [pathname, searchParams])

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 h-1"
        >
          <motion.div
            className="h-full bg-linear-to-r from-primary via-secondary to-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
          {/* Glow effect */}
          <motion.div
            className="absolute top-0 right-0 w-20 h-full bg-linear-to-l from-primary/50 to-transparent blur-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ transform: `translateX(${progress < 100 ? 0 : 100}%)` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
