import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import AboutPage from "./pages/AboutPage.jsx"
import ScenariosPage from "./pages/ScenariosPage.jsx"
import ScenarioDetailPage from "./pages/ScenarioDetailPage.jsx"
import CommandLauncher from "./components/CommandLauncher.jsx"
import ScrollToTop from "./components/ScrollToTop.jsx"

/**
 * App - Root Component
 * 
 * Routes:
 * /                    - Home page with overview and featured scenarios
 * /about               - Full professional profile (experience, education, skills)
 * /scenarios           - Grid of all available scenarios
 * /scenarios/:id       - Individual scenario walkthrough
 * 
 * Global Components:
 * - ScrollToTop        - Scrolls to top on route changes
 * - CommandLauncher    - Floating CLI button + Command Palette (Ctrl+K)
 */
export default function App() {
  return (
    <>
      {/* Scroll to top on navigation */}
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/scenarios" element={<ScenariosPage />} />
        <Route path="/scenarios/:scenarioId" element={<ScenarioDetailPage />} />
      </Routes>
      
      {/* Global Command Palette - Available on all pages */}
      <CommandLauncher />
    </>
  )
}
