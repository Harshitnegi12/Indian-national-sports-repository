import Image from "next/image"

export function IndiaMapBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="relative h-[min(88vh,60rem)] w-[min(88vw,52rem)] sm:h-[min(92vh,64rem)] sm:w-[min(76vw,56rem)]">
        <Image
          src="/india-map-flag-source.svg"
          alt=""
          width={1482}
          height={1702}
          className="india-map-extrusion absolute inset-0 h-full w-full object-contain"
        />
        <Image
          src="/india-map-flag-source.svg"
          alt=""
          width={1482}
          height={1702}
          className="india-map-face absolute inset-0 h-full w-full object-contain"
        />
      </div>
    </div>
  )
}
