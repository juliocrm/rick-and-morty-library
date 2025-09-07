import { Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom'
import ListPage from '../pages/ListPage'
import DetailPage from '../pages/DetailPage'
import AdvanceSearch from '../pages/AdvanceSearch'
import FiltersPage from '../pages/FiltersPage'
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
            <Route path="*" element={<div className="p-4 md:px-[100px] sm:pt-[40px]">Select a character</div>} />
          </Routes>
        }
      />
    )
  }

  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/filters" element={<FiltersPage />} />
      <Route path="/filters/advance-search" element={<AdvanceSearch />} />
      <Route path="/character/:id" element={<DetailPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
