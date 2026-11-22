import type { Metadata } from "next"
import { ATHLETES, type AthleteRecord } from "@/lib/athlete-data"
import { CollectionPage } from "@/components/site/collection-page"

export const metadata: Metadata = { title: "Women in Sports", description: "India's sportswomen, from Olympic medallists to national champions, in every sport and state." }

// Gender comes from Wikidata; if missing, the biography's pronouns are used.
function isWoman(a: AthleteRecord) {
  if (a.gender) return a.gender === "female"
  return /\b(she|her)\b/i.test(a.summary + " " + a.highlights.join(" "))
}

export default function WomenPage() {
  return (
    <CollectionPage
      eyebrow="Women in Sports"
      title="India's sportswomen"
      hindi="खेलों में महिलाएं"
      intro="From Karnam Malleswari's first Olympic medal by an Indian woman to world champions in boxing, chess and shooting, meet the women who changed Indian sport."
      championsTitle="Medallists and world champions"
      athletes={ATHLETES.filter(isWoman)}
    />
  )
}
