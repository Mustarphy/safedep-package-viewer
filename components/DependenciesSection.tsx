'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';

interface Dependency {
  package?: { name?: string };
  version?: string;
}

interface DependenciesSectionProps {
  dependencies: Dependency[];
}

export function DependenciesSection({ dependencies }: DependenciesSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const displayCount = 10;
  const displayDeps = showAll ? dependencies : dependencies.slice(0, displayCount);

  return (
    <Card className="bg-slate-800 border-slate-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Dependencies</h2>
        <Badge variant="secondary">{dependencies.length}</Badge>
      </div>

      {dependencies.length === 0 ? (
        <p className="text-gray-400">No dependencies found.</p>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {displayDeps.map((dep, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-slate-700 border border-slate-600 rounded-lg hover:border-cyan-500 transition-colors"
              >
                <div>
                  <p className="font-medium text-white">{dep.package?.name || 'Unknown'}</p>
                  <p className="text-xs text-gray-400">npm package</p>
                </div>
                <Badge className="bg-cyan-600">{dep.version || 'unknown'}</Badge>
              </div>
            ))}
          </div>

          {dependencies.length > displayCount && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-sm font-medium"
            >
              {showAll ? 'Show Less' : `Show ${dependencies.length - displayCount} More`}
            </button>
          )}
        </>
      )}
    </Card>
  );
}