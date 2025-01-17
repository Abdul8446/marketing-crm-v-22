"use client"

import { useState } from "react"
import { ImageIcon, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function MediaUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div
      className={cn(
        "relative rounded-lg border-2 border-dashed p-4 transition-colors",
        isDragging ? "border-primary bg-accent" : "border-muted-foreground/25",
        preview ? "h-[300px]" : "h-[100px]"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {preview ? (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-2 z-10"
            onClick={() => setPreview(null)}
          >
            <X className="h-4 w-4" />
          </Button>
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full rounded object-cover"
          />
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-2">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            Drag & drop or{" "}
            <Button variant="link" className="h-auto p-0">
              select a file
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

