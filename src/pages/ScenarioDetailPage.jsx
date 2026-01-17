import { useState } from "react"
import { Link, useParams, Navigate } from "react-router-dom"
import SeverityBadge from "../components/ui/SeverityBadge.jsx"
import MitreTag from "../components/ui/MitreTag.jsx"
import AttackStep from "../components/steps/AttackStep.jsx"
import DetectStep from "../components/steps/DetectStep.jsx"
import RespondStep from "../components/steps/RespondStep.jsx"
import LessonsStep from "../components/steps/LessonsStep.jsx"
import scenarios from "../data/scenarios.json"
import { profile } from "../data/profile.js"
import MatrixRain from '../components/MatrixRain.jsx'

/**
 * Scenario Detail Page - Terminal/Cybersecurity Aesthetic
 * 
 * Step-by-step incident response walkthrough
 * Matches home, about, and scenarios pages
 */

const STEPS = [
  { id: "attack", label: "ATTACK", cmd: "analyze_threat", color: "red" },
  { id: "detect", label: "DETECT", cmd: "run_detection", color: "blue" },
  { id: "respond", label: "RESPOND", cmd: "execute_response", color: "green" },
  { id: "lessons", label: "LESSONS", cmd: "extract_intel", color: "yellow" },
]

export default function ScenarioDetailPage() {
  const { scenarioId } = useParams()
  const [currentStep, setCurrentStep] = useState("attack")

  const scenario = scenarios.find((s) => s.id === scenarioId)

  if (!scenario) {
    return <Navigate to="/scenarios" replace />
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "attack":
        return <AttackStep attack={scenario.attack} />
      case "detect":
        return <DetectStep detect={scenario.detect} />
      case "respond":
        return <RespondStep respond={scenario.respond} />
      case "lessons":
        return <LessonsStep lessons={scenario.lessons} />
      default:
        return <AttackStep attack={scenario.attack} />
    }
  }

  const currentIndex = STEPS.findIndex((s) => s.id === currentStep)
  const canGoBack = currentIndex > 0
  const canGoNext = currentIndex < STEPS.length - 1

  const goBack = () => {
    if (canGoBack) setCurrentStep(STEPS[currentIndex - 1].id)
  }

  const goNext = () => {
    if (canGoNext) setCurrentStep(STEPS[currentIndex + 1].id)
  }

  return (
    <div className="relative min-h-screen">
      {/* Matrix rain background */}
      <MatrixRain />
      
      {/* Overlays */}
      <div className="fixed inset-0 -z-10 scanlines opacity-10 pointer-events-none" />
      <div className="fixed inset-0 -z-10 noise pointer-events-none" />

      {/* Terminal Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-green-500/20 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between font-mono text-sm">
            <div className="flex items-center gap-2 text-green-400">
              <span className="text-green-500">$</span>
              <span className="text-zinc-500">./</span>
              <Link to="/scenarios" className="text-blue-400 hover:text-blue-300">incidents</Link>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-300">{scenario.id}</span>
              <span className="animate-pulse">▊</span>
            </div>
            <SeverityBadge severity={scenario.severity} />
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 font-mono">
        <div className="mx-auto max-w-6xl px-6">
          {/* Back link */}
          <Link
            to="/scenarios"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-green-400 transition-colors mb-8"
          >
            <span>←</span>
            <span>cd ../incidents</span>
          </Link>

          {/* Incident header */}
          <div className="mb-8">
            <div className="text-sm text-zinc-600 mb-2">
              <span className="text-green-400">$</span> cat incident_{scenario.id}.md
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {scenario.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {scenario.mitre.map((technique) => (
                <MitreTag
                  key={technique}
                  techniqueId={technique}
                  name={scenario.mitreName}
                />
              ))}
            </div>

            <p className="text-zinc-500 max-w-2xl text-sm">
              {scenario.shortDescription}
            </p>
          </div>

          {/* Step navigation - Terminal style */}
          <div className="rounded-xl border border-zinc-800 bg-black/60 p-4 mb-8">
            <div className="flex items-center gap-2 text-xs text-zinc-600 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              IR_PHASE_SELECTOR
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {STEPS.map((step, i) => {
                const isActive = step.id === currentStep
                const isCompleted = i < currentIndex
                const colorMap = {
                  red: { border: 'border-red-500/50', bg: 'bg-red-500/10', text: 'text-red-400' },
                  blue: { border: 'border-blue-500/50', bg: 'bg-blue-500/10', text: 'text-blue-400' },
                  green: { border: 'border-green-500/50', bg: 'bg-green-500/10', text: 'text-green-400' },
                  yellow: { border: 'border-yellow-500/50', bg: 'bg-yellow-500/10', text: 'text-yellow-400' },
                }
                const colors = colorMap[step.color]

                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`
                      flex items-center gap-3 px-4 py-2 rounded-lg border transition-all whitespace-nowrap
                      ${isActive 
                        ? `${colors.border} ${colors.bg} ${colors.text}` 
                        : isCompleted
                          ? 'border-zinc-700 bg-zinc-900/50 text-zinc-400'
                          : 'border-zinc-800 text-zinc-600 hover:border-zinc-700'
                      }
                    `}
                  >
                    <span className={`
                      w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold
                      ${isCompleted ? 'bg-green-500 text-black' : 'bg-zinc-800 text-zinc-500'}
                      ${isActive ? 'bg-white text-black' : ''}
                    `}>
                      {isCompleted ? '✓' : i + 1}
                    </span>
                    <span>{step.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Current command indicator */}
            <div className="mt-4 pt-4 border-t border-zinc-800 text-sm">
              <span className="text-green-400">$</span>
              <span className="text-zinc-400 ml-2">./{STEPS[currentIndex].cmd}.sh --incident={scenario.id}</span>
              <span className="text-green-500 animate-pulse ml-2">▊</span>
            </div>
          </div>

          {/* Step content */}
          <div 
            key={currentStep}
            className="rounded-xl border border-zinc-800 bg-black/60 p-6 md:p-8 backdrop-blur animate-fadeIn"
          >
            {renderStepContent()}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 gap-4">
            <button
              onClick={goBack}
              disabled={!canGoBack}
              className={`
                flex items-center gap-2 px-4 py-2 rounded border text-sm
                ${canGoBack 
                  ? 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-300' 
                  : 'border-zinc-900 text-zinc-700 cursor-not-allowed'
                }
              `}
            >
              <span>←</span>
              <span>PREV</span>
            </button>

            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {STEPS.map((step, i) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`
                    h-2 rounded-full transition-all
                    ${step.id === currentStep ? 'w-8 bg-green-500' : 'w-2 bg-zinc-700 hover:bg-zinc-600'}
                  `}
                />
              ))}
            </div>

            {canGoNext ? (
              <button
                onClick={goNext}
                className="flex items-center gap-2 px-4 py-2 rounded border border-green-500/50 bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all text-sm"
              >
                <span>NEXT</span>
                <span>→</span>
              </button>
            ) : (
              <Link
                to="/scenarios"
                className="flex items-center gap-2 px-4 py-2 rounded border border-green-500/50 bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-all text-sm"
              >
                <span>EXIT</span>
                <span>→</span>
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 font-mono text-xs">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-zinc-600">
            <div>© {new Date().getFullYear()} {profile.name} // CASE_{scenario.id.toUpperCase()}</div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              ANALYSIS_COMPLETE
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
