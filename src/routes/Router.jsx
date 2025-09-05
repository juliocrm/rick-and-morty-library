import { Routes, Route } from 'react-router-dom'
import ListPage from '../pages/ListPage'
import DetailPage from '../pages/DetailPage'
import MainLayout from '../layouts/MainLayout'

export default function Router() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/character/:id" element={<DetailPage />} />
      </Routes>
    </MainLayout>
  )
}
