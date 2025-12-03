# MizanMeals

A smart nutrition planning app powered by wearable device data (WHOOP, Apple Watch, Fitbit) that generates personalized meal plans tailored to your activity level, dietary preferences, and fitness goals.

## Features

- **Wearable Integration**: Connect your WHOOP, Apple Watch, or Fitbit to sync activity data
- **Smart Onboarding**: 4-step guided setup for profile, preferences, and nutrition targets
- **AI-Powered Meal Plans**: Automatically generated daily meal plans based on your wearable data
- **Restaurant Partners**: Access meals from 16+ partner restaurants in Doha
- **Meal Customization**: Swap meals while maintaining your calorie and macro targets
- **Browse & Filter**: Search through 300+ meals with advanced filtering
- **Subscription Plans**: Flexible pricing with monthly and yearly options

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd mizan-meals
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. (Optional) Set up environment variables:

If you have integrations or API keys, create a `.env.local` file:
\`\`\`env
# Add your environment variables here
# Example:
# NEXT_PUBLIC_API_URL=https://api.example.com
\`\`\`

## Running the Development Server

Start the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Building for Production

Build the optimized production bundle:

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

Start the production server:

\`\`\`bash
npm start
# or
yarn start
\`\`\`

## Project Structure

```text
mizan-meals/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── onboarding/               # 4-step onboarding flow
│   │   ├── connect-whoop/
│   │   ├── whoop-summary/
│   │   ├── preferences/
│   │   └── goal/
│   ├── dashboard/                # Main meal plan page
│   ├── browse/                   # Browse meals page
│   ├── restaurants/              # Restaurant listings
│   └── subscription/             # Pricing plans
├── components/                   # React components
│   ├── layout/                   # Navbar, Footer, StepProgress
│   ├── onboarding/               # Onboarding-specific components
│   ├── meals/                    # MealCard, MealSwapDialog, etc.
│   ├── charts/                   # WHOOP data charts
│   ├── shared/                   # Reusable components
│   ├── home/                     # Homepage components
│   └── ui/                       # shadcn/ui primitives
├── lib/                          # Utilities and types
│   ├── types.ts                  # TypeScript interfaces
│   ├── theme.ts                  # Color theme constants
│   ├── utils.ts                  # Helper functions
│   └── mock-data.ts              # Sample data (300+ meals)
└── public/                       # Static assets
```

## Key Routes

- `/` - Homepage with hero and demo
- `/onboarding/connect-whoop` - Step 1: Connect wearable device
- `/onboarding/whoop-summary` - Step 2: View activity summary
- `/onboarding/preferences` - Step 3: Set food preferences
- `/onboarding/goal` - Step 4: Choose fitness goal (lose/maintain/gain)
- `/dashboard` - Main meal plan dashboard
- `/browse` - Browse all available meals
- `/restaurants` - View partner restaurants
- `/subscription` - View pricing plans

## Features in Detail

### Onboarding Flow
1. **Connect Wearable**: OAuth integration for WHOOP, Apple Watch, or Fitbit
2. **Activity Summary**: 7-day charts showing strain, recovery, calories, and sleep
3. **Food Preferences**: Select dietary preferences, dislikes, and budget
4. **Goal Setting**: Choose weight goal with auto-calculated nutrition targets

### Meal Plan Dashboard
- Progress rings showing daily calorie and macro targets
- 2x2 macro grid with protein, carbs, fat, and fiber
- Tabbed meal categories (Breakfast, Lunch, Dinner, Snacks)
- Swap meals while maintaining nutritional balance
- Support for 4+ meals for high-calorie goals (3000+ kcal)

### Browse Meals
- Search by name or restaurant
- Filter by category, dietary tags, and calorie range
- Sort by calories or protein
- View meal details with full nutritional info

## Customization

### Theme Colors
The app uses a green-based color palette defined in `lib/theme.ts`:
- Primary: `#008037` (dark green)
- Accent: `#00C16A` (bright green)
- Protein: `#2d7a4f` (dark green)
- Carbs: `#52b788` (medium green)
- Fat: `#95d5b2` (light green)

### Mock Data
Sample meals and restaurants are in `lib/mock-data.ts`. Replace with real API calls for production.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy automatically

### Other Platforms
Build the static export:
\`\`\`bash
npm run build
\`\`\`
Deploy the `.next` folder to your hosting provider.

## License

MIT License - feel free to use this project for your own purposes.

## Contact

For questions or support, please open an issue on GitHub.
