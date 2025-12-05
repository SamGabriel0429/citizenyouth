# 🎨 Citizen Youth PH - Feature Overview & Visual Guide

## 📱 App Layout

```
┌─────────────────────────────────┐
│   HEADER                        │
│   Citizen Youth PH 🇵🇭         │
│   Ang iyong boses ay mahalaga   │
│   [Stats: 127 | 8 | 15]        │
├─────────────────────────────────┤
│   [Search Box 🔍]               │
├─────────────────────────────────┤
│   [News] [My City] [Actions] [Polls]  ← TABS
├─────────────────────────────────┤
│                                 │
│   CONTENT AREA                  │
│   (Changes based on active tab) │
│                                 │
├─────────────────────────────────┤
```

---

## 📰 NEWS TAB

### Filter Section

```
┌────────────┬─────────────┬──────────┬──────────┐
│ All [✓]    │ Environment │ Education│ Community│
└────────────┴─────────────┴──────────┴──────────┘
```

### News Card Example

```
┌─────────────────────────────────────┐
│ 🌍 ENVIRONMENT                      │
│                                     │
│ Manila Bay Cleanup Drive This Sat   │
│                                     │
│ Join 200+ volunteers for a...       │
│                                     │
│ 2 hours ago  [❤️] [🔖] [📤]       │
└─────────────────────────────────────┘
```

**Card Interactions:**

- Click ❤️ to like (turns red/pink)
- Click 🔖 to bookmark (save to profile)
- Click 📤 to share (uses Web Share API)

---

## 🗺️ MY CITY TAB

### City Selector

```
┌──────────────────────────────┐
│ 📍 Metro Manila ▼             │
│ (Cebu City, Davao, Iloilo...) │
└──────────────────────────────┘
```

### Event Map

```
┌──────────────────────────────┐
│      [Interactive Map]       │  ← Visual representation
│      🌊 📍 🎓               │
│                              │
│      (320px height on mobile) │
└──────────────────────────────┘
```

### Location List

```
┌──────────────────────────────┐
│ 📍 Manila Bay                 │
│ Coastal Cleanup Event         │
│ Saturday 6AM • 15 km away     │
├──────────────────────────────┤
│ 🏢 Quezon City Hall          │
│ Community Feeding Program     │
│ Ongoing • 8 km away          │
├──────────────────────────────┤
│ 🎓 Youth Center              │
│ STEM Workshop & Mentorship   │
│ Next Tuesday 4PM • 5 km away │
└──────────────────────────────┘
```

---

## ⚡ TAKE ACTION TAB

### Action Cards (2x2 Grid on Desktop, 1x4 on Mobile)

```
┌──────────────┬──────────────┐
│    💰        │      🤝      │
│   DONATE     │  VOLUNTEER   │
│ Support     │ Give your     │
│ causes      │ time          │
│ [Find...]   │ [See...]      │
├──────────────┼──────────────┤
│    📅        │      📢      │
│  JOIN EVENTS │ AWARENESS    │
│ Attend      │ Share        │
│ workshops   │ important    │
│ [Browse...] │ [Share...]   │
└──────────────┴──────────────┘
```

**Card Features:**

- Smooth hover animations
- Icon floats up/down
- Button with gradient background
- Interactive effects on click

---

## 🗳️ POLLS TAB

### Poll Analytics Badge

```
┌─────────────────────────────┐
│ 📈 Trending Topics          │
│             1,247 responses │
└─────────────────────────────┘
```

### Poll Card Example

```
┌─────────────────────────────────────┐
│ What environmental issue concerns   │
│ you most?                           │
├─────────────────────────────────────┤
│ ⭕ Climate Change & Typhoons    42% │
│    ████████████████░░░░░░░░░░   │
├─────────────────────────────────────┤
│ ⭕ Waste & Plastic Pollution    35% │
│    ████████████░░░░░░░░░░░░░░░ │
├─────────────────────────────────────┤
│ ⭕ Water Quality & Access       18% │
│    ███████░░░░░░░░░░░░░░░░░░░░ │
├─────────────────────────────────────┤
│ ⭕ Air Pollution               5%  │
│    ██░░░░░░░░░░░░░░░░░░░░░░░░░ │
├─────────────────────────────────────┤
│         [Vote Now]                  │
│      📊 3,842 votes                 │
└─────────────────────────────────────┘
```

**Poll Features:**

- Visual progress bars
- Percentage display
- Radio button selection
- "Vote Now" action button
- Vote count per poll

---

## 🔄 USER INTERACTION FLOWS

### Voting Flow

```
User Opens Poll
        ↓
    Selects Option
        ↓
   Clicks "Vote Now"
        ↓
Algorithm Records Vote
        ↓
Vote Count Updates
        ↓
Success Toast Shows ✓
        ↓
Data Saved to Local Storage
```

### Bookmarking Flow

```
User Sees Article
        ↓
    Clicks 🔖 Button
        ↓
Article Added to Profile
        ↓
Button Shows Success (🔖)
        ↓
Toast: "Article bookmarked!"
        ↓
Data Persists on Refresh
```

### City Switch Flow

```
Opens "My City" Tab
        ↓
Selects New City from Dropdown
        ↓
Location List Updates
        ↓
Shows City's Specific Events
        ↓
Toast: "Switched to [City Name]"
        ↓
Engagement Score +2
```

---

## 📊 ALGORITHM VISUALIZATION

### Data Flow

```
┌──────────────────────────────────┐
│   User Takes Action              │
│   (Vote, Like, Bookmark, etc)    │
└────────────┬─────────────────────┘
             ↓
┌──────────────────────────────────┐
│   PollAlgorithm.recordVote()     │
│   Records vote + option          │
└────────────┬─────────────────────┘
             ↓
┌──────────────────────────────────┐
│   Update Trending Topics         │
│   Recalculate top 3              │
└────────────┬─────────────────────┘
             ↓
┌──────────────────────────────────┐
│   Update User Profile            │
│   Increment engagement level     │
└────────────┬─────────────────────┘
             ↓
┌──────────────────────────────────┐
│   Save to Local Storage          │
│   survives page refresh          │
└──────────────────────────────────┘
```

### Sample Poll Response Distribution

```
Environmental Issues Poll

Climate Change:     ████████████████████ 42%
Waste/Pollution:    █████████████████ 35%
Water Quality:      ████████ 18%
Air Pollution:      ██ 5%

Total Votes: 3,842
```

---

## 🎨 COLOR SCHEME

### Primary Colors

```
Gradient:  #667eea (Purple) → #764ba2 (Violet)
Background: #f8f9fa (Light Gray)
Text:      #333 (Dark Gray)
Accent:    #667eea (Purple)
Success:   #81c784 (Green)
```

### Interactive States

```
Normal:    #667eea (Purple)
Hover:     Lighter shade with shadow
Active:    Fully saturated gradient
Disabled:  Faded (0.7 opacity)
Success:   #81c784 (Green)
```

---

## 🎯 HEADER STATS

### Dynamic Counter System

```
┌───────────┬───────────────┬──────────────┐
│ 127       │ 8             │ 15           │
│ Articles  │ Events        │ Votes        │
│ Read      │ Joined        │ Cast         │
└───────────┴───────────────┴──────────────┘

Updates When:
- Like article → +1 Articles Read
- Click "Join Events" → +1 Events Joined
- Submit poll vote → +1 Votes Cast
```

---

## 📱 RESPONSIVE BREAKPOINTS

### Desktop (> 480px)

- Max width: 480px container
- 2x2 action card grid
- Larger fonts and padding
- Full-size header

### Mobile (≤ 480px)

```
┌─────────┐
│ Header  │ ← Reduced padding, smaller text
├─────────┤
│ Search  │ ← Full width
├─────────┤
│ Tabs    │ ← Smaller font, no wrapping
├─────────┤
│ Content │ ← Single column layout
│         │ ← Larger touch targets (44px min)
│         │ ← Optimized spacing
└─────────┘
```

---

## 🚀 PERFORMANCE FEATURES

### Animations (All 60fps)

- Card hover lifts (translateY)
- Button scale effects
- Tab transitions (slideUp)
- Poll bar fill animations
- Toast slide-in/out

### Optimization

- CSS-based animations (GPU accelerated)
- Event delegation (single listener)
- Local Storage caching
- No external dependencies

### Bundle Size

```
index.html: ~13KB
style.css:  ~30KB
app.js:     ~15KB
────────────────
Total:      ~58KB (minified: ~40KB)
```

---

## ✨ VISUAL EFFECTS

### Glassmorphism Header

```
Blurred gradient background
Animated pulse effect
Text shadow for readability
```

### Card Animations

```
On Hover:
- Scale up 2%
- Shadow increases
- Background tints
- Smooth 300ms transition
```

### Button Feedback

```
On Click:
- Scale down to 90%
- Color change
- Success state after interaction
- Toast notification appears
```

---

## 🇵🇭 PHILIPPINES-SPECIFIC DESIGN

### Emojis Used

```
🇵🇭 Philippines flag
🌍 Environment & Climate
📚 Education & Learning
🏛️ Community & Governance
💰 Donations
🤝 Volunteering
📅 Events
📢 Awareness
🎓 Education/Workshops
🌊 Coastal/Water
🍲 Community Feeding
🔧 Skills/Technical
🌾 Agriculture
💻 Technology
```

### Content Themes

```
Environmental:  Coastal cleanup, waste reduction, water quality
Education:      Scholarships, STEM, workshops, mental health
Community:      Youth councils, local governance, civic engagement
Livelihood:     Skills training, startups, job matching
```

---

**Design Philosophy**: Mobile-first, accessibility-focused, engagement-driven 🎯
