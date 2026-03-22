import { useNavigate } from 'react-router-dom'
import { HomeScreen } from '../MusinsaStyleApp.jsx'

export default function HomeRoute({ isDark }) {
  const navigate = useNavigate()

  return (
    <HomeScreen
      isDark={isDark}
      onOpenSearch={(query = '') => {
        const next = query.trim()
        navigate(next ? `/search?q=${encodeURIComponent(next)}` : '/search')
      }}
    />
  )
}
