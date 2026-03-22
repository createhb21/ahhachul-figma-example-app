import { Suspense, lazy, useEffect, useState } from "react";
import {
  HashRouter,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { C, FF, applyTheme } from "./MusinsaStyleApp.jsx";
import HomeRoute from "./routes/HomeRoute.jsx";

const SubwayRoute = lazy(() => import("./routes/SubwayRoute.jsx"));
const CommunityRoute = lazy(() => import("./routes/CommunityRoute.jsx"));
const LostRoute = lazy(() => import("./routes/LostRoute.jsx"));
const MyRoute = lazy(() => import("./routes/MyRoute.jsx"));
const SearchRoute = lazy(() => import("./routes/SearchRoute.jsx"));

const NAV_ITEMS = [
  { to: "/", label: "홈" },
  { to: "/subway", label: "지하철" },
  { to: "/community", label: "커뮤니티" },
  { to: "/lost", label: "유실물" },
  { to: "/my", label: "마이" },
];

function LoadingScreen() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: C.g[60],
        fontSize: 13,
        fontWeight: 700,
        fontFamily: FF,
      }}
    >
      AI가 화면을 불러오는 중...
    </div>
  );
}

function MobileFrame({ children }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 768,
        minHeight: "100dvh",
        margin: "0 auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
        fontFamily: FF,
        overflow: "hidden",
        transition: "background 0.3s ease, color 0.3s ease",
      }}
    >
      {children}
    </div>
  );
}

function BottomTabBar() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 768,
        background: C.navBg,
        borderTop: `1px solid ${C.border}`,
        display: "flex",
        paddingBottom: "env(safe-area-inset-bottom,6px)",
        zIndex: 300,
        transition: "background 0.3s ease",
      }}
    >
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === "/"}
          style={({ isActive }) => ({
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "8px 0 4px",
            cursor: "pointer",
            textDecoration: "none",
            fontSize: 10,
            fontFamily: FF,
            color: isActive ? (C.navActive ?? C.white) : C.g[70],
            fontWeight: isActive ? 800 : 400,
          })}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

function AppShell() {
  return (
    <MobileFrame>
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
      <BottomTabBar />
    </MobileFrame>
  );
}

function SearchFrame() {
  return (
    <MobileFrame>
      <Suspense fallback={<LoadingScreen />}>
        <SearchRoute />
      </Suspense>
    </MobileFrame>
  );
}

function AppRoutes({ isDark, themeMode, onThemeMode }) {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomeRoute isDark={isDark} />} />
        <Route path="/subway" element={<SubwayRoute isDark={isDark} />} />
        <Route path="/community" element={<CommunityRoute isDark={isDark} />} />
        <Route path="/lost" element={<LostRoute isDark={isDark} />} />
        <Route
          path="/my"
          element={
            <MyRoute
              isDark={isDark}
              themeMode={themeMode}
              onThemeMode={onThemeMode}
            />
          }
        />
      </Route>
      <Route path="/search" element={<SearchFrame />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AppRouter() {
  const [themeMode, setThemeMode] = useState("dark");
  const [sysDark, setSysDark] = useState(() =>
    Boolean(
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    ),
  );

  useEffect(() => {
    if (!window.matchMedia) {
      return undefined;
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (event) => setSysDark(event.matches);

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isDark = themeMode === "system" ? sysDark : themeMode === "dark";

  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  return (
    <AppRoutes
      isDark={isDark}
      themeMode={themeMode}
      onThemeMode={setThemeMode}
    />
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  );
}
