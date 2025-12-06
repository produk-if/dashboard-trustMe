"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LoadingSpinner, LoadingBar } from "@/components/ui/loading"

interface LoadingContextType {
  isLoading: boolean
  loadingMessage: string
  startLoading: (message?: string) => void
  stopLoading: () => void
  setProgress: (progress: number) => void
  progress: number
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}

interface LoadingProviderProps {
  children: ReactNode
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState("")
  const [progress, setProgress] = useState(0)

  const startLoading = useCallback((message: string = "Loading...") => {
    setLoadingMessage(message)
    setIsLoading(true)
    setProgress(0)
  }, [])

  const stopLoading = useCallback(() => {
    setIsLoading(false)
    setLoadingMessage("")
    setProgress(0)
  }, [])

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingMessage,
        startLoading,
        stopLoading,
        setProgress,
        progress
      }}
    >
      {children}

      {/* Global Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md"
          >
            {/* Loading Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
              className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-card border shadow-2xl"
            >
              {/* Animated Loader */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-full border-4 border-primary/20"
                >
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-primary/50" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <div className="w-4 h-4 rounded-full bg-primary" />
                  </motion.div>
                </div>
              </div>

              {/* Progress bar if progress is set */}
              {progress > 0 && (
                <div className="w-48">
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-linear-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-center text-muted-foreground">{Math.round(progress)}%</p>
                </div>
              )}

              {/* Message */}
              <div className="text-center">
                <motion.p
                  key={loadingMessage}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-medium text-foreground"
                >
                  {loadingMessage}
                </motion.p>
                <motion.div
                  className="flex items-center justify-center gap-1 mt-2"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  )
}
