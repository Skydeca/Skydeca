'use client'

import { Button } from '@/components/ui/button'

export function MediaCard({
  title,
  videoTitle,
  tags,
}: {
  title: string
  videoTitle: string
  tags: string[]
}) {
  return (
    <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-sm flex flex-col gap-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-slate-300">{videoTitle}</p>
      <p className="text-xs text-slate-400">0:00 - 0:30</p>
      <div className="text-xs text-slate-400 leading-5">
        {tags.slice(0, 6).join(', ')}<br />
        ...+{tags.length - 6}
      </div>
      <div className="flex gap-2 pt-2">
        <Button size="icon" variant="ghost">⏮</Button>
        <Button size="icon" variant="ghost">⏪</Button>
        <Button size="icon" variant="ghost">▶</Button>
        <Button size="icon" variant="ghost">⏸</Button>
        <Button size="icon" variant="ghost">⏩</Button>
        <Button size="icon" variant="ghost">➕</Button>
      </div>
    </div>
  )
}
