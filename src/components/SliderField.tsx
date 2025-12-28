/**
 * Slider Field Component
 * Reusable input component with slider for numeric values
 */

import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface SliderFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
  info?: string;
  theme: 'light' | 'dark';
}

/**
 * SliderField component for numeric input with visual feedback
 * 
 * @param label - The label displayed above the slider
 * @param value - Current value of the slider
 * @param min - Minimum value allowed
 * @param max - Maximum value allowed
 * @param step - Increment/decrement step size
 * @param unit - Unit suffix displayed next to value (e.g., '€', '%')
 * @param onChange - Callback when value changes
 * @param info - Optional info tooltip
 * @param theme - Visual theme ('light' or 'dark')
 * 
 * Features:
 * - Gradient fill showing progress
 * - Responsive layout
 * - Accessible with proper labels and tooltips
 * - Theme support
 * 
 * @example
 * <SliderField
 *   label="Home Price"
 *   value={400000}
 *   min={50000}
 *   max={10000000}
 *   step={10000}
 *   unit="€"
 *   onChange={(value) => setHomePrice(value)}
 *   info="Purchase price of the property"
 *   theme="dark"
 * />
 */
export function SliderField({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  info,
  theme,
}: SliderFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toFixed(step < 1 ? 1 : 0));

  const percentage = ((value - min) / (max - min)) * 100;
  const textColor = theme === 'dark' ? 'text-slate-300' : 'text-slate-700';
  const sliderBg = theme === 'dark' ? '#475569' : '#e2e8f0';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(min, Math.min(max, numValue));
      onChange(clampedValue);
      setInputValue(clampedValue.toFixed(step < 1 ? 1 : 0));
    } else {
      setInputValue(value.toFixed(step < 1 ? 1 : 0));
    }
    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleInputBlur();
    } else if (e.key === 'Escape') {
      setInputValue(value.toFixed(step < 1 ? 1 : 0));
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-2">
      {/* Label and info icon */}
      <div className="flex items-center justify-between">
        <label className={`text-sm font-medium ${textColor}`}>{label}</label>
        {info && (
          <button
            type="button"
            className={`text-xs ${
              theme === 'dark'
                ? 'text-slate-400 hover:text-slate-300'
                : 'text-slate-500 hover:text-slate-600'
            } flex items-center gap-1`}
            title={info}
            aria-label={`Info: ${info}`}
          >
            <Info size={14} />
          </button>
        )}
      </div>

      {/* Slider with value display */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-indigo-500/50 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-500 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
            style={{
              background: `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${percentage}%, ${sliderBg} ${percentage}%, ${sliderBg} 100%)`,
            }}
            aria-label={label}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={`${value} ${unit}`}
          />
        </div>

        {/* Value display - editable */}
        <div className="w-24 text-right">
          {isEditing ? (
            <input
              type="number"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              autoFocus
              className={`w-full text-sm font-semibold text-center rounded px-2 py-1 ${
                theme === 'dark'
                  ? 'bg-slate-700 text-indigo-400 border border-indigo-500'
                  : 'bg-slate-200 text-indigo-600 border border-indigo-400'
              }`}
              min={min}
              max={max}
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className={`text-sm font-semibold cursor-text hover:opacity-75 transition-opacity ${
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
              }`}
              title="Click to edit"
            >
              {value.toFixed(step < 1 ? 1 : 0)}
              {unit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
