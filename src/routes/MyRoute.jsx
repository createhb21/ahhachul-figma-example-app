import { MyScreen } from '../MusinsaStyleApp.jsx'

export default function MyRoute({ isDark, themeMode, onThemeMode }) {
  return (
    <MyScreen
      isDark={isDark}
      themeMode={themeMode}
      onThemeMode={onThemeMode}
    />
  )
}
