'use server';

/** 
 * Mock SafeDep API Client 
 * Returns realistic mock data based on real SafeDep database */

export async function fetchPackageInsight(
    ecosystem: string,
    name: string,
    version: string
) {
    // Validate inputs (same security as real version)
    if (!ecosystem || !name || !version) {
        throw new Error("Invalid package parameters");
    }

    if (name.length > 256 || version.length > 128 || ecosystem.length > 50) {
        throw new Error("Package parameters too long");
    }

    const suspiciousChars = /[<>:"\/\\|?*]/;
    if (
        suspiciousChars.test(ecosystem) ||
        suspiciousChars.test(name) ||
        suspiciousChars.test(version)
    ) {
        throw new Error("Invalid package parameters");
    }

    // simulate slight delay like a real API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock vulnerabilities
    const mockVulnerabilities = [
        {
            id: { value: "GHSA-rv95-896h-c2vc" },
            summary: "Express.js Open Redirect in malformed URLs",
            aliases: [{ value: "CVE-2024-29041" }],
            severities: [
              {
                type: "TYPE_CVSS_V3",
                score: "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N",
                risk: "RISK_MEDIUM",
              },
            ],
            publishedAt: "2024-03-25T19:40:26Z",
          },
          {
            id: { value: "GHSA-qw6h-vgh9-j6wx" },
            summary: "express vulnerable to XSS via response.redirect()",
            aliases: [{ value: "CVE-2024-43796" }],
            severities: [
              {
                type: "TYPE_CVSS_V3",
                score: "CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:L/I:L/A:L",
                risk: "RISK_MEDIUM",
              },
            ],
            publishedAt: "2024-09-10T19:41:04Z",
          },
    ];

    // Mock dependencies
    const mockDependencies = [
        { package: { name: "accepts" }, version: "1.1.4" },
    { package: { name: "content-disposition" }, version: "0.5.0" },
    { package: { name: "cookie" }, version: "0.1.2" },
    { package: { name: "cookie-signature" }, version: "1.0.5" },
    { package: { name: "debug" }, version: "2.1.3" },
    { package: { name: "depd" }, version: "1.0.1" },
    { package: { name: "escape-html" }, version: "1.0.1" },
    { package: { name: "etag" }, version: "1.5.1" },
    { package: { name: "finalhandler" }, version: "0.3.2" },
    { package: { name: "fresh" }, version: "0.2.4" },
    { package: { name: "media-typer" }, version: "0.3.0" },
    { package: { name: "merge-descriptors" }, version: "0.0.2" },
    { package: { name: "methods" }, version: "1.1.0" },
    { package: { name: "on-finished" }, version: "2.1.1" },
    { package: { name: "parseurl" }, version: "1.3.3" },
    { package: { name: "path-to-regexp" }, version: "0.1.3" },
    { package: { name: "proxy-addr" }, version: "1.0.10" },
    { package: { name: "qs" }, version: "2.3.3" },
    { package: { name: "range-parser" }, version: "1.0.3" },
    { package: { name: "send" }, version: "0.10.1" },
    { package: { name: "serve-static" }, version: "1.7.2" },
    { package: { name: "type-is" }, version: "1.5.7" },
    { package: { name: "utils-merge" }, version: "1.0.0" },
    { package: { name: "vary" }, version: "1.0.1" },
    ];

    // Mock scorecard
    const mockScorecard = {
        score: 7.2,
    checks: [
      {
        name: "Code-Review",
        score: 10,
        reason: "all changesets reviewed",
      },
      {
        name: "Maintained",
        score: 10,
        reason: "24 commit(s) and 12 issue activity found in the last 90 days",
      },
      {
        name: "Security-Policy",
        score: 10,
        reason: "security policy file detected",
      },
      {
        name: "Dangerous-Workflow",
        score: 10,
        reason: "no dangerous workflow patterns detected",
      },
      {
        name: "Token-Permissions",
        score: 0,
        reason: "detected GitHub workflow tokens with excessive permissions",
      },
      {
        name: "Binary-Artifacts",
        score: 10,
        reason: "no binaries found in the repo",
      },
      {
        name: "Vulnerabilities",
        score: 10,
        reason: "0 existing vulnerabilities detected",
      },
      {
        name: "License",
        score: 10,
        reason: "license file detected",
      },
      {
        name: "SAST",
        score: 9,
        reason: "SAST tool detected but not run on all commits",
      },
    ],
    };

    // Mock project insights
    const mockProjectInsights = {
        project: {
            type: "PROJECT_SOURCE_TYPE_GITHUB",
            name: "github.com/strongloop/express",
            url: "https://github.com/strongloop/express",
          },
          stars: "66020",
          forks: "16984",
          issues: { open: "215" },
          scorecard: mockScorecard,
        };
      
        // Return mock data in SafeDep API format
        return {
          packageVersion: {
            package: {
              ecosystem: ecosystem.toUpperCase(),
              name: name,
            },
            version: version,
          },
          insight: {
            dependencies: mockDependencies,
            vulnerabilities: mockVulnerabilities,
            projectInsights: [mockProjectInsights],
            licenses: {
              licenses: [{ licenseId: "MIT" }],
            },
          },
          packagePublishedAt: "2014-12-11T05:08:02Z",
        };
}