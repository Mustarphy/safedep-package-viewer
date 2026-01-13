# SafeDep Package Viewer

A Next.js 16 application that displays comprehensive details about open source packages including vulnerabilities, dependencies, security scores, and more.

## Features

✨ **Package Intelligence**
- Display package metadata (name, version, ecosystem)
- Show known vulnerabilities with severity levels
- List direct dependencies
- Display license information
- Show OSSF security scorecard data
- Repository statistics (stars, forks, issues)

🎨 **Modern UI/UX**
- Beautiful dark theme with gradient accents
- Responsive design (mobile, tablet, desktop)
- Real-time search with example packages
- Smooth transitions and hover effects
- Error handling with user-friendly messages

## Technology Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **API Integration**: SafeDep Insights API
- **Data Fetching**: Next.js Server Actions

## Prerequisites

Before running this application, you need:

1. **Node.js 18+** installed on your system
2. **SafeDep API Credentials**:
   - Sign up at [app.safedep.io](https://app.safedep.io)
   - Go to Settings > API Keys
   - Copy your Tenant ID and API Key

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd safedep-package-viewer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
SAFEDEP_TENANT_ID=your-team-org.safedep.io
SAFEDEP_API_KEY=your-api-key-here
```

Replace the values with your actual SafeDep credentials.

### 4. Run the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

## Usage

### Homepage

Visit `http://localhost:3000` to see the search interface. You can:
- Select an ecosystem (NPM, PyPI, Maven, etc.)
- Enter a package name
- Enter a version
- Click "Get Package Details"

### Direct URL Access

You can also access packages directly via URL:

```
http://localhost:3000/p/{ecosystem}/{name}/{version}
```

**Examples:**
- `http://localhost:3000/p/npm/express/4.10.5`
- `http://localhost:3000/p/npm/react/18.2.0`
- `http://localhost:3000/p/pypi/django/4.2.0`

### Supported Ecosystems

- `npm` - Node.js packages
- `pypi` - Python packages
- `maven` - Java packages
- `nuget` - .NET packages
- `golang` - Go packages
- `cargo` - Rust packages
- `rubygems` - Ruby packages

## Project Structure

```
safedep-package-viewer/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles
│   └── p/
│       └── [ecosystem]/
│           └── [name]/
│               └── [version]/
│                   └── page.tsx # Package details page
├── components/
│   ├── PackageDetails.tsx       # Main package display
│   ├── VulnerabilitySection.tsx # Vulnerabilities list
│   ├── DependenciesSection.tsx  # Dependencies list
│   ├── ScorecardSection.tsx     # Security scorecard
│   ├── LicenseSection.tsx       # License info
│   └── ui/                      # Shadcn UI components
├── lib/
│   └── safedep.ts              # SafeDep API client
├── .env.local                   # Environment variables (not in git)
└── README.md
```

## API Integration

The application uses SafeDep's Insights API to fetch package data:

### Server Action: `fetchPackageInsight`

Located in `lib/safedep.ts`, this function:
- Authenticates with SafeDep using your credentials
- Fetches comprehensive package information
- Handles errors gracefully
- Returns structured data for the UI

## Error Handling

The application handles various error scenarios:

- **Missing Credentials**: Displays error message if API keys aren't configured
- **Package Not Found**: Shows user-friendly message if package doesn't exist
- **Network Errors**: Gracefully handles API connectivity issues
- **Malformed Data**: Safely handles incomplete or unexpected data structures

## Building for Production

```bash
npm run build
npm run start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `SAFEDEP_TENANT_ID`
   - `SAFEDEP_API_KEY`
4. Deploy!

### Other Platforms

You can deploy to any platform that supports Node.js:
- AWS Amplify
- Railway
- Render
- DigitalOcean
- Netlify Functions

Make sure to set the environment variables on your hosting platform.

## Performance Optimization

- ✅ Server-side rendering for better performance
- ✅ Optimized images and assets
- ✅ Efficient data fetching with Server Actions
- ✅ Lazy loading for large dependency lists
- ✅ CSS optimization via Tailwind

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## Support

For issues related to:
- **SafeDep API**: Visit [SafeDep Documentation](https://docs.safedep.io)
- **Application**: Check GitHub issues or contact via email

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Author

Submitted for SafeDep Frontend Engineering Internship Program 2026

---

**Note**: Keep your SafeDep API credentials secure. Never commit `.env.local` to version control.# safedep-package-viewer
