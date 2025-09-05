import useIsDesktop from '../hooks/useIsDesktop'

export default function MainLayout({ list, detail }) {
  const isDesktop = useIsDesktop()

  if (isDesktop) {
    return (
      <div className="min-h-screen grid grid-cols-[320px_1fr]">
        <div className="border-r">{list}</div>
        <div>{detail}</div>
      </div>
    )
  }

  return <div className="min-h-screen">{list || detail}</div>
}
