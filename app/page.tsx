'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Package, Search } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [ecosystem, setEcosystem] = useState('npm');
  const [name, setName] = useState('express');
  const [version, setVersion] = useState('4.10.5');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`/p/${ecosystem}/${name}/${version}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-10 h-10 text-cyan-400" />
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              SafeDep
            </h1>
          </div>
          <p className="text-xl text-gray-400">
            Open Source Package Intelligence
          </p>
        </div>

        {/* Search Card */}
        <Card className="bg-slate-800 border-slate-700 p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Explore Package Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Ecosystem Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ecosystem
              </label>
              <select
                value={ecosystem}
                onChange={(e) => setEcosystem(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none transition-colors"
              >
                <option value="npm">NPM (Node.js)</option>
                <option value="pypi">PyPI (Python)</option>
                <option value="maven">Maven (Java)</option>
                <option value="nuget">NuGet (.NET)</option>
                <option value="golang">Go</option>
                <option value="cargo">Cargo (Rust)</option>
                <option value="rubygems">RubyGems</option>
              </select>
            </div>

            {/* Package Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Package Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., express, django, spring"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none transition-colors"
              />
            </div>

            {/* Version */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Version
              </label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="e.g., 1.0.0, 2.5.3"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              {isLoading ? 'Loading...' : 'Get Package Details'}
            </button>
          </form>
        </Card>

        {/* Example Links */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">Quick examples:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: 'Express 4.10.5', path: '/p/npm/express/4.10.5' },
              { label: 'React 18.2.0', path: '/p/npm/react/18.2.0' },
              { label: 'Django 4.2.0', path: '/p/pypi/django/4.2.0' },
            ].map((link) => (
              <a
                key={link.path}
                href={link.path}
                className="px-3 py-1 text-xs text-cyan-400 border border-cyan-500 rounded hover:bg-cyan-500 hover:text-black transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}