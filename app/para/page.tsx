import type { Metadata } from "next"
import { ATHLETES } from "@/lib/athlete-data"
import { CollectionPage } from "@/components/site/collection-page"

export const metadata: Metadata = { title: "Para Champions", description: "India's Paralympians and para athletes, from Murlikant Petkar to the record-breaking Paris 2024 team." }

export default function ParaPage() {
  const athletes = ATHLETES.filter((a) => a.sport.startsWith("Para ") || a.tier === "paralympic-medal" || /paralympi/i.test(a.summary))
  return (
    <CollectionPage
      eyebrow="Para Champions"
      title="India's para athletes"
      hindi="पैरा चैंपियन"
      intro="India won 29 medals at the Paris 2024 Paralympics, its best ever. These are the athletes behind that rise, from javelin and high jump to archery, shooting and badminton."
      championsTitle="Paralympic medallists"
      athletes={athletes}
    />
  )
}
