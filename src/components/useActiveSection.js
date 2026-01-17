import { useEffect, useMemo, useState } from "react"

export function useActiveSection(ids = []) {
  const [active, setActive] = useState(ids?.[0] ?? "")

  const idSet = useMemo(() => new Set(ids), [ids])

  useEffect(() => {
    if (!ids?.length) return

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]

        if (visible?.target?.id && idSet.has(visible.target.id)) {
          setActive(visible.target.id)
        }
      },
      { root: null, threshold: [0.15, 0.25, 0.35, 0.5], rootMargin: "-20% 0px -65% 0px" },
    )

    for (const el of els) obs.observe(el)
    return () => obs.disconnect()
  }, [ids, idSet])

  return active
}

