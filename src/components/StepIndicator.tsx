/**
 * Step Indicator Component
 * Displays a visual progress indicator for multi-step forms
 * Features: proper alignment, equal spacing, completed/current state
 */

import React from 'react';

interface Step {
  number: number;
  title: string;
  description?: string;
}

interface StepIndicatorProps {
  currentStep: number;
  steps: readonly Step[];
  theme: 'light' | 'dark';
  onStepClick?: (stepNumber: number) => void;
}

/**
 * StepIndicator component for displaying progress through a multi-step form
 * 
 * @param currentStep - The current active step number (1-indexed)
 * @param steps - Array of step objects with number, title, and optional description
 * @param theme - Theme mode ('light' or 'dark')
 * @param onStepClick - Optional callback when a step is clicked
 * 
 * Features:
 * - Completed steps show a checkmark (✓)
 * - Current step is highlighted with ring effect
 * - Equal spacing and alignment between all steps
 * - Responsive design for mobile and desktop
 * - Proper ARIA labels for accessibility
 * 
 * @example
 * <StepIndicator
 *   currentStep={2}
 *   steps={[
 *     { number: 1, title: 'Property' },
 *     { number: 2, title: 'Buying' },
 *     { number: 3, title: 'Renting' }
 *   ]}
 *   theme="dark"
 * />
 */
export function StepIndicator({
  currentStep,
  steps,
  theme,
  onStepClick,
}: StepIndicatorProps) {
  const textSecondaryClass =
    theme === 'dark' ? 'text-slate-400' : 'text-slate-600';

  return (
    <div className="w-full mb-8">
      {/* Step circles and connectors */}
      <div className="flex items-start relative">
        {steps.map((step, idx) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          return (
            <div
              key={step.number}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* Connector line (between circles) */}
              {idx < steps.length - 1 && (
                <div
                  className="absolute top-6 h-1 transition-all duration-300 w-full"
                  style={{
                    left: '50%',
                    backgroundColor: isCompleted
                      ? theme === 'dark'
                        ? '#4f46e5'
                        : '#4f46e5'
                      : theme === 'dark'
                      ? '#475569'
                      : '#cbd5e1',
                  }}
                  aria-hidden="true"
                />
              )}

              {/* Step circle */}
              <button
                type="button"
                onClick={() => onStepClick?.(step.number)}
                className={`relative z-10 w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  isCompleted
                    ? theme === 'dark'
                      ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg shadow-emerald-500/50'
                      : 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-400/50'
                    : isCurrent
                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/50 ring-4 ring-indigo-400 ring-opacity-30'
                    : theme === 'dark'
                    ? 'bg-slate-700 text-slate-400'
                    : 'bg-slate-300 text-slate-600'
                }`}
                aria-label={`Step ${step.number}: ${step.title}`}
                aria-current={isCurrent ? 'step' : undefined}
                disabled={!onStepClick}
                style={{
                  cursor: onStepClick ? 'pointer' : 'default',
                }}
              >
                {isCompleted ? '✓' : step.number}
              </button>

              {/* Step label */}
              <p className={`text-xs ${textSecondaryClass} mt-3 text-center font-medium`}>
                {step.title}
              </p>
              {step.description && (
                <p className={`text-xs ${textSecondaryClass} mt-1 text-center hidden sm:block`}>
                  {step.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
