"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-bg-main group-[.toaster]:text-generalText group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-helper",
          success: "group-[.toast]:bg-primary group-[.toast]:text-bg-main",
          info: "group-[.toast]:bg-secondary group-[.toast]:text-bg-main",
          warning: "group-[.toast]:bg-bg-light group-[.toast]:text-generalText",
          error: "group-[.toast]:bg-destructive group-[.toast]:text-bg-main",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
