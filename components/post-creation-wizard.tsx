import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PostCreationWizardProps {
  isOpen: boolean
  onClose: () => void
  onCreatePost: (postData: any) => void
}

export function PostCreationWizard({ isOpen, onClose, onCreatePost }: PostCreationWizardProps) {
  const [step, setStep] = useState(1)
  const [postData, setPostData] = useState({
    platform: "",
    content: "",
    type: "text",
    scheduledFor: "",
  })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else onCreatePost(postData)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
    else onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Post - Step {step}</DialogTitle>
        </DialogHeader>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select onValueChange={(value) => setPostData({ ...postData, platform: value })}>
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="post-type">Post Type</Label>
              <Select onValueChange={(value) => setPostData({ ...postData, type: value })}>
                <SelectTrigger id="post-type">
                  <SelectValue placeholder="Select post type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text Post</SelectItem>
                  <SelectItem value="image">Image Post</SelectItem>
                  <SelectItem value="video">Video Post</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content">Post Content</Label>
              <Textarea
                id="content"
                placeholder="Enter your post content here..."
                value={postData.content}
                onChange={(e) => setPostData({ ...postData, content: e.target.value })}
              />
            </div>
            {postData.type !== "text" && (
              <div className="space-y-2">
                <Label htmlFor="media-upload">Upload Media</Label>
                <Input id="media-upload" type="file" />
              </div>
            )}
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schedule-date">Schedule Date</Label>
              <Input
                id="schedule-date"
                type="datetime-local"
                value={postData.scheduledFor}
                onChange={(e) => setPostData({ ...postData, scheduledFor: e.target.value })}
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={handleBack}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <Button onClick={handleNext}>
            {step === 3 ? "Create Post" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

