import useIsDesktop from '../hooks/useIsDesktop'
import { SelectionProvider } from '../components/list/SelectionContext'

function Layout({ list, detail }) {
  const isDesktop = useIsDesktop()

  if (isDesktop) {
    return (
      <div className="min-h-screen grid grid-cols-[320px_1fr]">
        <div
          className="bg-white"
          style={{ boxShadow: 'inset -5px 0 28px -8px var(--color-primary-100)' }}
        >
          {list}
        </div>
        <div>{detail}</div>
      </div>
    )
  }

  return <div style={{ minHeight: '100dvh' }}>{list || detail}</div>
}

export default function MainLayout({ list, detail }) {
  return (
    <SelectionProvider>
      <Layout list={list} detail={detail} />
    </SelectionProvider>
  );
}
