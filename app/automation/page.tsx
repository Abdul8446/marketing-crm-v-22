import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AutomationPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Automation Workflows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  "Welcome Series",
                  "Lead Nurturing",
                  "Re-engagement",
                  "Birthday Wishes",
                ].map((workflow) => (
                  <Card key={workflow}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold">{workflow}</h3>
                      <p className="text-sm text-muted-foreground">
                        Automated workflow for {workflow.toLowerCase()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <Button>Create New Workflow</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

