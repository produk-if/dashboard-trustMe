"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  }

  return (
    <Loader2 className={cn("animate-spin text-primary", sizeClasses[size], className)} />
  )
}

interface LoadingDotsProps {
  className?: string
}

export function LoadingDots({ className }: LoadingDotsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  )
}

interface LoadingBarProps {
  className?: string
}

export function LoadingBar({ className }: LoadingBarProps) {
  return (
    <div className={cn("w-full h-1 bg-muted overflow-hidden rounded-full", className)}>
      <motion.div
        className="h-full bg-linear-to-r from-primary via-secondary to-primary"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ width: "50%" }}
      />
    </div>
  )
}

interface LoadingOverlayProps {
  isLoading: boolean
  message?: string
  className?: string
  children?: React.ReactNode
}

export function LoadingOverlay({ isLoading, message = "Loading...", className, children }: LoadingOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg"
          >
            <LoadingSpinner size="lg" />
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-3 text-sm font-medium text-muted-foreground"
              >
                {message}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface LoadingPageProps {
  message?: string
}

export function LoadingPage({ message = "Loading..." }: LoadingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        {/* Animated Logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative w-16 h-16"
        >
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary" />
        </motion.div>

        <LoadingDots />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm font-medium text-muted-foreground"
        >
          {message}
        </motion.p>
      </motion.div>
    </div>
  )
}

interface LoadingCardProps {
  rows?: number
  className?: string
}

export function LoadingCard({ rows = 3, className }: LoadingCardProps) {
  return (
    <div className={cn("p-6 space-y-4 rounded-lg border bg-card", className)}>
      {/* Header skeleton */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-1/3 bg-muted rounded animate-pulse" />
          <div className="h-3 w-1/4 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-4 bg-muted rounded animate-pulse"
            style={{ width: `${100 - i * 15}%` }}
          />
        ))}
      </div>
    </div>
  )
}

interface LoadingTableProps {
  rows?: number
  columns?: number
  className?: string
}

export function LoadingTable({ rows = 5, columns = 4, className }: LoadingTableProps) {
  return (
    <div className={cn("w-full space-y-3", className)}>
      {/* Header */}
      <div className="flex gap-4 p-4 border-b">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 flex-1 bg-muted rounded animate-pulse" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4 p-4 border-b border-border/50">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-4 flex-1 bg-muted rounded animate-pulse"
              style={{ animationDelay: `${(rowIndex * columns + colIndex) * 50}ms` }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

interface LoadingButtonProps {
  isLoading: boolean
  children: React.ReactNode
  loadingText?: string
  className?: string
}

export function LoadingButton({ isLoading, children, loadingText, className }: LoadingButtonProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" />
          {loadingText || children}
        </>
      ) : (
        children
      )}
    </span>
  )
}

interface ProgressLoaderProps {
  progress: number
  showPercentage?: boolean
  className?: string
}

export function ProgressLoader({ progress, showPercentage = true, className }: ProgressLoaderProps) {
  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-linear-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      {showPercentage && (
        <p className="text-xs text-muted-foreground text-right">{Math.round(progress)}%</p>
      )}
    </div>
  )
}
