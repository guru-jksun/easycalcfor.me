# EasyCalcFor.me

**The AI-powered calculator platform with 50+ free calculators in 9 languages.**

[https://easycalcfor.me](https://easycalcfor.me)

## Features

- **AI Calculator** - Type what you want to calculate in plain language
- **50+ Calculators** - Math, Finance, Health, Date/Time, Conversion, Tax, Living, Korea-specific
- **9 Languages** - English, Korean, Spanish, French, German, Portuguese, Japanese, Chinese, Arabic
- **Modern UI** - Mobile-first responsive design with dark mode
- **No Sign-up** - 100% free, no registration required
- **Privacy First** - All calculations run in your browser

## Calculator Categories

| Category | Calculators |
|----------|------------|
| Math | Basic, Scientific, Percentage, Fraction, Square Root, Prime, GPA, Discount, Password Strength |
| Finance | Compound Interest, Loan, Mortgage, ROI, Savings, Interest Rate, Salary, Tip, Rent Compare, Acquisition Tax, Capital Gains Tax, Severance Pay, Housing Points |
| Health | BMI, Calorie, Body Fat, Due Date, Ideal Weight, 1RM, BAC, Sleep |
| Date/Time | Age, Date Difference, D-Day, Time Duration, Annual Leave, Military Discharge |
| Conversion | Length, Weight, Temperature, Currency, Speed, Energy, Fuel Cost |
| Tax | Income Tax, Sales Tax, VAT |

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl (9 languages)
- **AI**: Claude API (Anthropic)
- **Hosting**: Google Cloud Run
- **CDN/DNS**: Cloudflare
- **Analytics**: Google Analytics

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description |
|----------|------------|
| `ANTHROPIC_API_KEY` | Claude API key for AI calculator |

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Localized pages
│   │   ├── calculator/    # Calculator pages
│   │   ├── blog/          # Blog pages
│   │   └── ...
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── calculators/       # Calculator components
│   ├── layout/            # Header, Footer
│   ├── ads/               # Ad components
│   └── ui/                # UI primitives
├── data/                  # Blog post data
├── i18n/                  # Internationalization config
└── messages/              # Translation files (9 languages)
```

## Supported Languages

English, Korean (한국어), Spanish (Español), French (Français), German (Deutsch), Portuguese (Português), Japanese (日本語), Chinese (中文), Arabic (العربية)

## License

MIT

## Links

- **Website**: [https://easycalcfor.me](https://easycalcfor.me)
- **Product Hunt**: [EasyCalcFor.me](https://www.producthunt.com/products/easycalcfor-me)
- **Contact**: help@easycalcfor.me
