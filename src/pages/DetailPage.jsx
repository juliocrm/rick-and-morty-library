import { useParams } from 'react-router-dom'

export default function DetailPage() {
  const { id } = useParams()
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Character Detail {id}</h1>
    </div>
  )
}
