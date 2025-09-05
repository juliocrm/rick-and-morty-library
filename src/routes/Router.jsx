import { Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom'
import ListPage from '../pages/ListPage'
import DetailPage from '../pages/DetailPage'
import MainLayout from '../layouts/MainLayout'
import useIsDesktop from '../hooks/useIsDesktop'

export default function Router() {
  const isDesktop = useIsDesktop()
  const location = useLocation()

  if (isDesktop) {
    return (
      <MainLayout
        list={<ListPage />}
        detail={
          <Routes>
            <Route path="/character/:id" element={<DetailPage />} />
            <Route path="*" element={<div className="p-4">Select a character</div>} />
          </Routes>
        }
      />
    )
  }

  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/character/:id" element={<DetailPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
