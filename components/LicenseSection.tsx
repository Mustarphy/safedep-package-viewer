'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

interface License {
  licenseId?: string;
}

interface LicensesData {
  licenses?: License[];
}

interface LicenseSectionProps {
  licenses: LicensesData;
}

export function LicenseSection({ licenses }: LicenseSectionProps) {
  const licenseList = licenses.licenses || [];

  return (
    <Card className="bg-slate-800 border-slate-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">License</h2>
      </div>

      {licenseList.length === 0 ? (
        <p className="text-gray-400">No license information available.</p>
      ) : (
        <div className="space-y-3">
          {licenseList.map((license, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-700 border border-slate-600 rounded-lg"
            >
              <Badge className="bg-cyan-600 mb-2">
                {license.licenseId || 'Unknown'}
              </Badge>
              <p className="text-sm text-gray-300">
                This package is distributed under the{' '}
                <span className="font-semibold">{license.licenseId}</span> license.
              </p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}