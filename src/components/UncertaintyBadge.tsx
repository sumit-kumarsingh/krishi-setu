import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface UncertaintyBadgeProps {
  source: string;
  timestamp?: string;
  confidencePct?: number;
  isEstimate?: boolean;
  notes?: string;
}

export const UncertaintyBadge: React.FC<UncertaintyBadgeProps> = ({
  source,
  timestamp,
  confidencePct,
  isEstimate = true,
  notes,
}) => {
  return (
    <div className="text-[11px] text-stone-600 bg-stone-50 border border-stone-200 rounded-lg p-2 space-y-0.5">
      <div className="flex items-center gap-1.5 font-medium text-stone-800">
        {isEstimate ? (
          <AlertCircle className="w-3.5 h-3.5 text-stone-700 shrink-0" />
        ) : (
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
        )}
        <span className="font-semibold text-stone-800">{isEstimate ? 'Estimate' : 'Measured Record'}</span>
        {confidencePct !== undefined && (
          <span className="text-stone-500">· {confidencePct}% Confidence</span>
        )}
      </div>

      <div className="text-stone-600 flex flex-wrap items-center gap-x-1.5">
        <span>Source: <strong className="font-medium text-stone-800">{source}</strong></span>
        {timestamp && (
          <>
            <span aria-hidden="true">·</span>
            <span className="text-stone-500">{timestamp}</span>
          </>
        )}
      </div>

      {notes && (
        <p className="text-stone-500 text-[10px] leading-tight">
          {notes}
        </p>
      )}
    </div>
  );
};
