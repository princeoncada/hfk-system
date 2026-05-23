'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

const STORAGE_KEY = 'hfk-onboarding-complete'
const HELP_EVENT = 'hfk:open-help'

function plannerHref() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  return `/planner/${year}-${month}`
}

export default function OnboardingOverlay() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === null) {
      setIsOpen(true)
    }

    function openHelp() {
      setIsOpen(true)
      setStep(0)
      setDirection(1)
    }

    window.addEventListener(HELP_EVENT, openHelp)
    return () => window.removeEventListener(HELP_EVENT, openHelp)
  }, [])

  function handleClose() {
    localStorage.setItem(STORAGE_KEY, 'true')
    setIsOpen(false)
    setStep(0)
  }

  function handleNext() {
    setDirection(1)
    if (step < 3) {
      setStep(step + 1)
    } else {
      handleClose()
    }
  }

  function handlePrev() {
    setDirection(-1)
    setStep(step - 1)
  }

  const steps = [
    {
      render: () => (
        <div>
          <div className="w-[56px] h-[56px] rounded-[14px] bg-ink text-cream grid place-items-center font-display text-[28px] leading-none mx-auto mb-6">
            H
          </div>
          <h2 className="font-display text-[28px] leading-tight text-ink text-center">
            Welcome to HFK Publishing Engine
          </h2>
          <p className="text-[15px] text-ink-3 text-center mt-2">
            Your daily content studio for Homeschooling for Kiddos.
          </p>
          <p className="text-[14px] text-ink-2 text-center mt-4 leading-relaxed max-w-[380px] mx-auto">
            This tool manages your complete publishing workflow - from
            AI-generated worksheet drafts to approved Facebook post packages,
            one gate at a time.
          </p>
        </div>
      ),
    },
    {
      render: () => {
        const workflowSteps = [
          {
            title: 'Planner',
            description:
              'AI proposes a topic, grade, and subject for every day of the month. Generate a plan, review it, lock the days you love.',
          },
          {
            title: 'Daily Review',
            description:
              'Walk through 5 approval gates each day. AI drafts your content - you approve, redirect with a note, or reject and start fresh.',
          },
          {
            title: 'Print & Share',
            description:
              'Preview your worksheet and print it. Save your image post as a high-res PNG. No automatic publishing - you stay in control.',
          },
        ]

        return (
          <div>
            <h2 className="font-display text-[24px] text-ink text-center">
              How it works
            </h2>
            <div className="space-y-4 mt-6">
              {workflowSteps.map((item, index) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-[28px] h-[28px] rounded-full bg-ink text-cream grid place-items-center text-[13px] font-mono shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-ink text-[15px]">{item.title}</p>
                    <p className="text-[13px] text-ink-3 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      },
    },
    {
      render: () => {
        const gates = [
          ['Direction', 'Confirm the topic, grade, and subject.'],
          ['Worksheet', 'AI generates the worksheet. Approve, redirect, or reject.'],
          ['Template', 'Choose the visual layout for your post image.'],
          ['Caption', 'AI writes the Facebook caption. Same approve flow.'],
          ['Final Package', 'Sign off. Package is marked shipped and ready to print.'],
        ]

        return (
          <div>
            <h2 className="font-display text-[24px] text-ink text-center">
              Inside Daily Review
            </h2>
            <p className="text-[13px] text-ink-3 text-center mt-1 mb-6">
              Five gates, in order. Each one must be approved before the next unlocks.
            </p>
            <div className="space-y-3">
              {gates.map(([name, description], index) => (
                <div key={name} className="flex items-center gap-3">
                  <div className="w-[22px] h-[22px] rounded-full bg-sage-tint text-sage-deep text-[11px] font-mono font-medium grid place-items-center shrink-0">
                    {index + 1}
                  </div>
                  <p>
                    <span className="font-medium text-ink text-[14px]">{name}</span>
                    <span className="text-ink-3 text-[13px]"> - {description}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      },
    },
    {
      render: () => {
        const screens = [
          ['Command Center', "Today's status. Pending approvals, Vault alerts, monthly progress."],
          ['Daily Review', "The 5-gate approval flow for today's post."],
          ['Planner', 'Generate and manage your monthly content calendar.'],
          ['Worksheets', 'Browse, edit, and create printable worksheets.'],
          ['Vault', 'Your asset library - templates, captions, prompts, and more.'],
          ['Analytics', "What's working. Performance insights and recommendations."],
        ]

        return (
          <div>
            <h2 className="font-display text-[24px] text-ink text-center">
              You're all set.
            </h2>
            <p className="text-[13px] text-ink-3 text-center mt-1 mb-6">
              Here's what every screen does.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {screens.map(([name, description]) => (
                <div
                  key={name}
                  className="bg-cream rounded-[12px] p-3 border border-[rgba(92,64,51,0.1)]"
                >
                  <p className="font-medium text-ink text-[13px]">{name}</p>
                  <p className="text-[12px] text-ink-3 mt-0.5 leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href={plannerHref()}
                onClick={handleClose}
                className="inline-block bg-sage text-cream rounded-[10px] px-5 py-2.5 text-[14px] font-medium hover:bg-sage-deep transition-colors"
              >
                Start with the Planner →
              </Link>
            </div>
          </div>
        )
      },
    },
  ]

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 bg-[rgba(42,31,24,0.45)] backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-paper rounded-[24px] shadow-lift w-full max-w-[520px] overflow-hidden"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-0">
              <div className="flex gap-1.5">
                {[0, 1, 2, 3].map((dot) => (
                  <span
                    key={dot}
                    className={[
                      'w-1.5 h-1.5 rounded-full',
                      dot === step ? 'bg-ink' : 'bg-ink-4/40',
                    ].join(' ')}
                  />
                ))}
              </div>
              <button
                type="button"
                className="text-ink-4 hover:text-ink text-[20px] leading-none transition-colors"
                onClick={handleClose}
              >
                ×
              </button>
            </div>

            <div className="px-6 pb-0 pt-5 min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -24 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {steps[step].render()}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between px-6 py-5 mt-4 border-t border-[rgba(92,64,51,0.08)]">
              <div>
                {step > 0 ? (
                  <button
                    type="button"
                    className="text-[13px] text-ink-3 hover:text-ink transition-colors"
                    onClick={handlePrev}
                  >
                    Previous
                  </button>
                ) : null}
              </div>
              <button
                type="button"
                className={[
                  'text-cream rounded-[10px] px-4 py-2 text-[13px] font-medium transition-colors',
                  step === 3 ? 'bg-sage hover:bg-sage-deep' : 'bg-ink hover:bg-[#1a120e]',
                ].join(' ')}
                onClick={step === 3 ? handleClose : handleNext}
              >
                {step === 3 ? "Let's go →" : 'Next →'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
