import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  PostDetailScreen,
  SearchScreen,
  StationDetailScreen,
  UserProfileScreen,
} from '../MusinsaStyleApp.jsx'

export default function SearchRoute() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [stationDetail, setStationDetail] = useState(null)
  const [postDetail, setPostDetail] = useState(null)
  const [userProfile, setUserProfile] = useState(null)

  const currentQuery = searchParams.get('q') ?? ''

  const handleBack = () => {
    navigate('/')
  }

  if (stationDetail) {
    return (
      <StationDetailScreen
        station={stationDetail}
        onBack={() => setStationDetail(null)}
        onPostDetail={(post) => {
          setStationDetail(null)
          setPostDetail(post)
        }}
        onUser={(nick) => {
          setStationDetail(null)
          setUserProfile(nick)
        }}
      />
    )
  }

  if (postDetail) {
    return (
      <PostDetailScreen
        post={postDetail}
        onBack={() => setPostDetail(null)}
        onUser={(nick) => {
          setPostDetail(null)
          setUserProfile(nick)
        }}
      />
    )
  }

  if (userProfile) {
    return (
      <UserProfileScreen
        nick={userProfile}
        onBack={() => setUserProfile(null)}
      />
    )
  }

  return (
    <SearchScreen
      initialQuery={currentQuery}
      onQueryChange={(nextQuery) => {
        const trimmed = nextQuery.trim()
        setSearchParams(trimmed ? { q: trimmed } : {})
      }}
      onBack={handleBack}
      onStation={(station) => setStationDetail(station)}
      onPostDetail={(post) => setPostDetail(post)}
      onUser={(nick) => setUserProfile(nick)}
    />
  )
}
