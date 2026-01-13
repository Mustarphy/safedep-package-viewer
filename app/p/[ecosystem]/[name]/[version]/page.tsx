import { fetchPackageInsight } from '@/lib/safedep';
import { PackageDetails } from '@/components/PackageDetails';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Metadata } from 'next';

interface PackagePageProps {
  params: Promise<{
    ecosystem: string;
    name: string;
    version: string;
  }>;
}

/**
 * Validates URL parameters to prevent injection attacks
 */
function validateUrlParams(ecosystem: string, name: string, version: string): void {
  // Check for empty strings
  if (!ecosystem?.trim() || !name?.trim() || !version?.trim()) {
    throw new Error('Invalid package parameters');
  }

  // Basic length validation to prevent DoS
  if (ecosystem.length > 50 || name.length > 256 || version.length > 128) {
    throw new Error('Invalid package parameters');
  }

  // Check for suspicious characters that might indicate path traversal
  const suspiciousChars = /[<>:"\/\\|?*]/;
  if (suspiciousChars.test(ecosystem) || suspiciousChars.test(name) || suspiciousChars.test(version)) {
    throw new Error('Invalid package parameters');
  }
}

/**
 * Generate metadata for the page (SEO safe)
 */
export async function generateMetadata({
  params,
}: PackagePageProps): Promise<Metadata> {
  const { ecosystem, name, version } = await params;

  // Sanitize for metadata
  const safeName = name?.replace(/[^a-z0-9._-]/gi, '') || 'Package';
  const safeVersion = version?.replace(/[^a-z0-9._-]/gi, '') || 'unknown';

  return {
    title: `${safeName} - SafeDep Package Viewer`,
    description: `Security information for ${safeName} ${safeVersion}`,
  };
}

export default async function PackagePage({ params }: PackagePageProps) {
  const { ecosystem, name, version } = await params;

  try {
    // Validate parameters before using them
    validateUrlParams(ecosystem, name, version);

    // Fetch data with validated parameters
    const data = await fetchPackageInsight(ecosystem, name, version);

    // Additional validation of returned data structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response from server');
    }

    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        <PackageDetails 
          ecosystem={ecosystem}
          name={name}
          version={version}
          data={data}
        />
      </main>
    );
  } catch (error) {
    // Don't expose internal error details to users
    const errorMessage = error instanceof Error 
      ? getClientFriendlyErrorMessage(error.message)
      : 'An unexpected error occurred';
    
    // Log full error server-side for debugging
    console.error('Package page error:', {
      ecosystem,
      name,
      version,
      error: error instanceof Error ? error.message : String(error),
    });

    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <p className="font-semibold mb-2">Unable to Load Package</p>
              <p className="text-sm mb-3">{errorMessage}</p>
              <p className="text-xs mt-3 text-gray-400">
                If this problem persists, please try again later or contact support.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      </main>
    );
  }
}

/**
 * Convert internal error messages to user-friendly messages
 * Prevents information disclosure
 */
function getClientFriendlyErrorMessage(internalMessage: string): string {
  const message = internalMessage.toLowerCase();

  if (message.includes('not found')) {
    return 'This package was not found. Please check the name and version.';
  }
  if (message.includes('invalid')) {
    return 'Invalid package information. Please check your input.';
  }
  if (message.includes('auth') || message.includes('credential')) {
    return 'Server authentication error. Please try again later.';
  }
  if (message.includes('rate limit')) {
    return 'Too many requests. Please try again in a moment.';
  }
  
  // Generic message for unknown errors
  return 'Failed to load package information. Please try again later.';
}