"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  UserCheckIcon,
  Building2Icon,
  ArrowRightIcon,
  FingerprintIcon,
  SparklesIcon,
} from "lucide-react"

interface AthleteLoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type PreviewKind = "athlete" | "academy"

interface SampleProfile {
  name: string
  id: string
  detail: string
  region: string
  listing: string
  note: string
}

export function AthleteLoginDialog({
  open,
  onOpenChange,
}: AthleteLoginDialogProps) {
  const [athleteId, setAthleteId] = React.useState("ATHLETE-DEMO-001")
  const [demoPasscode, setDemoPasscode] = React.useState("000000")
  const [academyId, setAcademyId] = React.useState("ACADEMY-DEMO-001")
  const [profile, setProfile] = React.useState<SampleProfile | null>(null)
  const [previewKind, setPreviewKind] = React.useState<PreviewKind>("athlete")

  const showAthletePreview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPreviewKind("athlete")
    setProfile({
      name: "Sample Athlete",
      id: athleteId.trim() || "ATHLETE-DEMO-001",
      detail: "Example athletics profile",
      region: "Example state listing",
      listing: "Sample training-centre entry",
      note: "Illustrative only · Not a payment record",
    })
  }

  const showAcademyPreview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPreviewKind("academy")
    setProfile({
      name: "Sample Sports Academy",
      id: academyId.trim() || "ACADEMY-DEMO-001",
      detail: "Example academy listing",
      region: "Example state listing",
      listing: "Sample directory entry",
      note: "Illustrative only · No live programme record",
    })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen)
        if (!nextOpen) setProfile(null)
      }}
    >
      <DialogContent className="sm:max-w-lg overflow-hidden border-border p-0">
        <div className="flex h-1.5 w-full" aria-hidden="true">
          <div className="w-1/3 bg-saffron" />
          <div className="w-1/3 border-y border-border bg-white" />
          <div className="w-1/3 bg-india-green" />
        </div>

        <div className="flex flex-col gap-5 p-6">
          <DialogHeader className="gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <Badge
                variant="outline"
                className="border-ashoka-navy/20 bg-ashoka-navy/5 font-mono text-[11px] uppercase tracking-wider text-ashoka-navy"
              >
                <SparklesIcon className="mr-1 size-3.5 text-saffron" />
                INSR Portal Preview
              </Badge>
              <span className="font-mono text-[11px] text-muted-foreground">
                Demo mode · no real sign-in
              </span>
            </div>
            <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
              {profile
                ? previewKind === "athlete"
                  ? "Sample Athlete Profile Preview"
                  : "Sample Academy Listing Preview"
                : "Athlete & Academy Portal Preview"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground sm:text-sm">
              Preview only. No account is authenticated, and no information is sent or saved. Use sample values; do not enter personal information.
            </DialogDescription>
          </DialogHeader>

          {profile ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-ashoka-navy text-base font-bold text-white">
                      <UserCheckIcon className="size-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{profile.name}</h3>
                      <p className="font-mono text-xs text-muted-foreground">{profile.id}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Sample profile</Badge>
                </div>

                <Separator />

                <dl className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                  <div>
                    <dt className="text-muted-foreground">Example detail</dt>
                    <dd className="font-medium text-foreground">{profile.detail}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Region</dt>
                    <dd className="font-medium text-foreground">{profile.region}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-muted-foreground">Directory entry</dt>
                    <dd className="font-medium text-foreground">{profile.listing}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-muted-foreground">Note</dt>
                    <dd className="font-medium text-foreground">{profile.note}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <Button variant="outline" size="sm" onClick={() => setProfile(null)}>
                  Back to preview
                </Button>
                <Button
                  size="sm"
                  className="bg-ashoka-navy text-white hover:bg-ashoka-navy/90"
                  onClick={() => onOpenChange(false)}
                >
                  Close preview
                  <ArrowRightIcon data-icon="inline-end" />
                </Button>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="athlete" className="w-full">
              <TabsList className="grid h-9 w-full grid-cols-2">
                <TabsTrigger value="athlete" className="text-xs sm:text-sm">
                  <UserCheckIcon className="mr-1.5 size-3.5" />
                  Athlete Profile
                </TabsTrigger>
                <TabsTrigger value="academy" className="text-xs sm:text-sm">
                  <Building2Icon className="mr-1.5 size-3.5" />
                  Academy / Coach
                </TabsTrigger>
              </TabsList>

              <TabsContent value="athlete" className="mt-4">
                <form onSubmit={showAthletePreview} className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1.5 text-xs font-medium text-foreground" htmlFor="athlete-id">
                    Sample athlete ID
                    <Input
                      id="athlete-id"
                      value={athleteId}
                      onChange={(event) => setAthleteId(event.target.value)}
                      className="h-9 font-mono text-sm"
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-xs font-medium text-foreground" htmlFor="demo-passcode">
                    Demo passcode
                    <Input
                      id="demo-passcode"
                      value={demoPasscode}
                      onChange={(event) => setDemoPasscode(event.target.value)}
                      className="h-9 font-mono text-sm"
                      required
                    />
                  </label>
                  <div className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/60 p-3">
                    <FingerprintIcon className="mt-0.5 size-4 shrink-0 text-ashoka-navy" />
                    <p className="text-xs leading-snug text-muted-foreground">
                      This button opens a local sample profile. It does not check the ID or passcode.
                    </p>
                  </div>
                  <Button type="submit" className="h-9 w-full bg-ashoka-navy text-white hover:bg-ashoka-navy/90">
                    Preview Sample Athlete
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="academy" className="mt-4">
                <form onSubmit={showAcademyPreview} className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1.5 text-xs font-medium text-foreground" htmlFor="academy-id">
                    Sample academy ID
                    <Input
                      id="academy-id"
                      value={academyId}
                      onChange={(event) => setAcademyId(event.target.value)}
                      className="h-9 font-mono text-sm"
                      required
                    />
                  </label>
                  <div className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/60 p-3">
                    <FingerprintIcon className="mt-0.5 size-4 shrink-0 text-ashoka-navy" />
                    <p className="text-xs leading-snug text-muted-foreground">
                      No administrator email or real credentials are needed for this preview.
                    </p>
                  </div>
                  <Button type="submit" className="h-9 w-full bg-saffron text-white hover:bg-saffron/90">
                    Preview Sample Academy Listing
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}

          <div className="flex items-center justify-between border-t border-border pt-3 text-[11px] text-muted-foreground">
            <span>Account creation is not available in this prototype.</span>
            <span className="font-mono">Preview only</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
