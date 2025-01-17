import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CollaborationPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Collaboration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Active Team Members</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { name: "Marketing Team", members: 5 },
                  { name: "Content Team", members: 3 },
                  { name: "Design Team", members: 2 },
                ].map((team) => (
                  <Card key={team.name}>
                    <CardContent className="p-6">
                      <h3 className="font-semibold">{team.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {team.members} members
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <Button>Invite Team Member</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

