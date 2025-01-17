import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PostPreviewProps {
  content: string
}

export function PostPreview({ content }: PostPreviewProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="Epic Estore" />
            <AvatarFallback>E</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <span className="font-semibold">Epic Estore</span>
            <span className="text-sm text-muted-foreground">4:00 PM</span>
          </div>
        </div>
        <div className="mt-3">
          {content || "Your post preview will appear here"}
        </div>
      </CardContent>
    </Card>
  )
}

