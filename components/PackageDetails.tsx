'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { VulnerabilitySection } from './VulnerabilitySection';
import { DependenciesSection } from './DependenciesSection';
import { ScorecardSection } from './ScorecardSection';
import { LicenseSection } from './LicenseSection';

interface PackageDetailsProps {
  ecosystem: string;
  name: string;
  version: string;
  data: any;
}

export function PackageDetails({
  ecosystem,
  name,
  version,
  data,
}: PackageDetailsProps) {
  const insight = data.insight || {};
  const packageVersion = data.packageVersion || {};

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  {name}
                </h1>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {version}
                </Badge>
              </div>
              <p className="text-gray-400 text-lg">
                Ecosystem: <span className="text-cyan-400 font-semibold">{ecosystem.toUpperCase()}</span>
              </p>
            </div>
          </div>

          {/* Decorative gradient line */}
          <div className="h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-transparent mb-8 rounded"></div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              label="Vulnerabilities" 
              value={insight.vulnerabilities?.length || 0}
              type="warning"
            />
            <StatCard 
              label="Direct Dependencies" 
              value={insight.dependencies?.length || 0}
              type="info"
            />
            <StatCard 
              label="License" 
              value={insight.licenses?.licenses?.[0]?.licenseId || 'Unknown'}
              type="success"
            />
            <StatCard 
              label="Security Score" 
              value={insight.projectInsights?.[0]?.scorecard?.score?.toFixed(1) || 'N/A'}
              type="info"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Primary Information */}
          <div className="lg:col-span-2 space-y-6">
            <VulnerabilitySection vulnerabilities={insight.vulnerabilities || []} />
            <DependenciesSection dependencies={insight.dependencies || []} />
            <LicenseSection licenses={insight.licenses || {}} />
          </div>

          {/* Right Column - Secondary Information */}
          <div className="space-y-6">
            <ScorecardSection scorecard={insight.projectInsights?.[0]?.scorecard} />
            
            {/* Repository Info */}
            {insight.projectInsights?.[0]?.project && (
              <Card className="bg-slate-800 border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Repository</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Stars</p>
                    <p className="text-2xl font-bold text-cyan-400">
                      {parseInt(insight.projectInsights[0].project?.stars || '0').toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Forks</p>
                    <p className="text-2xl font-bold text-teal-400">
                      {parseInt(insight.projectInsights[0].project?.forks || '0').toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Open Issues</p>
                    <p className="text-2xl font-bold text-orange-400">
                      {insight.projectInsights[0].project?.issues?.open || 0}
                    </p>
                  </div>
                  {insight.projectInsights[0].project?.url && (
                    <a
                      href={insight.projectInsights[0].project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      View Repository →
                    </a>
                  )}
                </div>
              </Card>
            )}

            {/* Published Info */}
            {data.packagePublishedAt && (
              <Card className="bg-slate-800 border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Published</h3>
                <p className="text-gray-300">
                  {new Date(data.packagePublishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  type: 'warning' | 'info' | 'success';
}

function StatCard({ label, value, type }: StatCardProps) {
  const colorMap = {
    warning: 'text-red-400',
    info: 'text-cyan-400',
    success: 'text-green-400',
  };

  return (
    <Card className="bg-slate-800 border-slate-700 p-4">
      <p className="text-gray-400 text-sm font-medium mb-2">{label}</p>
      <p className={`text-3xl font-bold ${colorMap[type]}`}>{value}</p>
    </Card>
  );
}