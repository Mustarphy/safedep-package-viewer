'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck } from 'lucide-react';

interface Check {
  name?: string;
  score?: number;
  reason?: string;
}

interface Scorecard {
  score?: number;
  checks?: Check[];
}

interface ScorecardSectionProps {
  scorecard?: Scorecard;
}

export function ScorecardSection({ scorecard }: ScorecardSectionProps) {
  if (!scorecard) {
    return (
      <Card className="bg-slate-800 border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Security Scorecard</h3>
        <p className="text-gray-400 text-sm">No scorecard data available.</p>
      </Card>
    );
  }

  const overallScore = scorecard.score || 0;
  const scoreColor =
    overallScore >= 8 ? 'text-green-400' :
    overallScore >= 5 ? 'text-yellow-400' :
    'text-red-400';

  const checks = scorecard.checks || [];
  const passedChecks = checks.filter(c => c.score === 10).length;

  return (
    <Card className="bg-slate-800 border-slate-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="w-6 h-6 text-green-400" />
        <h3 className="text-lg font-semibold text-white">Security Scorecard</h3>
      </div>

      <div className="space-y-4">
        {/* Overall Score */}
        <div className="p-4 bg-slate-700 rounded-lg text-center border border-slate-600">
          <p className="text-gray-400 text-sm mb-2">OSSF Score</p>
          <p className={`text-4xl font-bold ${scoreColor}`}>
            {overallScore.toFixed(1)}/10
          </p>
        </div>

        {/* Check Status */}
        <div className="text-center py-2">
          <Badge variant="secondary">
            {passedChecks}/{checks.length} checks passed
          </Badge>
        </div>

        {/* Checks List */}
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {checks.slice(0, 5).map((check, idx) => {
            const status = 
              check.score === 10 ? 'pass' :
              check.score === -1 ? 'unknown' :
              'fail';
            
            const statusColor = 
              status === 'pass' ? 'bg-green-900 border-green-700 text-green-200' :
              status === 'unknown' ? 'bg-gray-700 border-gray-600 text-gray-200' :
              'bg-red-900 border-red-700 text-red-200';

            return (
              <div key={idx} className={`border rounded p-2 text-xs ${statusColor}`}>
                <p className="font-medium">{check.name}</p>
                {check.reason && (
                  <p className="opacity-75 text-xs mt-1 line-clamp-2">{check.reason}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}