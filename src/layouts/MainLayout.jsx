export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col md:grid md:grid-cols-[320px_1fr]">
      {children}
    </div>
  )
}
