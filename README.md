# Citizen Youth PH - Youth Civic Engagement Mobile Application

A mobile-first web application designed to empower Filipino youth (13-35 years old) to stay informed about social issues, participate in community actions, and have their voices heard through interactive polls and voting systems.

## 🎯 Features Overview

### 1. **News Feed Section**

- **Philippines-specific content** covering critical issues:
  - 🌍 Environmental initiatives (Manila Bay cleanup, zero-waste programs)
  - 📚 Education programs (STEM scholarships, workshops)
  - 🏛️ Community governance (youth councils, civic participation)
- **Interactive News Cards** with:

  - Like/Heart reactions (❤️)
  - Bookmark/Save articles (🔖)
  - Share functionality (📤)
  - Real-time engagement tracking

- **Smart Filtering**
  - Filter by category: All, Environment, Education, Community
  - Search functionality for finding specific topics
  - Category badges with emoji indicators

### 2. **My City Map Section**

- **Multi-City Support**

  - Metro Manila (default)
  - Cebu City
  - Davao City
  - Iloilo City
  - Quezon City

- **Location-based Events**
  - Visual map representation with event markers
  - List of nearby events with distance indicators
  - Category indicators (🌊 cleanup, 🎓 education, 🍲 community)

### 3. **Take Action Section**

- Four action categories with icons:

  - 💰 **Donate** - Support local causes
  - 🤝 **Volunteer** - Give your time
  - 📅 **Join Events** - Attend activities
  - 📢 **Spread Awareness** - Share important issues

- Interactive cards with:
  - Smooth hover animations
  - Call-to-action buttons
  - Progress indicators

### 4. **Youth Voice Polls** (Advanced Algorithm)

Three trending poll categories tailored to Philippine youth priorities:

#### Poll 1: Environmental Issues

- Climate Change & Typhoons (42%)
- Waste & Plastic Pollution (35%)
- Water Quality & Access (18%)
- Air Pollution (5%)

#### Poll 2: Education Reform

- More Vocational/Technical Schools (45%)
- Mental Health Support in Schools (32%)
- More Scholarship Programs (17%)
- Better Digital Learning Access (6%)

#### Poll 3: Livelihood Support

- Free Skills Training Programs (50%)
- Startup Funding & Mentorship (28%)
- Better Job Matching Platform (17%)
- Livelihood Subsidies (5%)

## 🧠 Poll Algorithm & Youth Priority System

The app includes a sophisticated algorithm that:

1. **Tracks User Votes**

   - Records each vote with the option selected
   - Maintains vote count per poll

2. **Identifies Trending Topics**

   - Analyzes which issues get the most votes
   - Displays top 3 trending topics
   - Shows total response count

3. **Builds User Profile**

   - Engagement Level Scoring (increments for: voting, liking, bookmarking, sharing)
   - Tracks bookmarked articles
   - Records participated polls
   - Stores user preferences in Local Storage

4. **Generates Recommendations**
   - Suggests actions/events based on voting patterns
   - Personalized content based on interests
   - Engagement analytics

## 📱 Mobile-First Design Features

### Responsive Breakpoints

- **Full optimization for 320px - 480px screens** (mobile phones)
- Scalable up to larger tablets (max-width: 480px container)

### Touch-Friendly Interface

- Minimum 44px touch targets for all interactive elements
- Buttons, radio buttons, and checkboxes properly sized
- Large tap areas to prevent accidental clicks
- Smooth animations (300ms-500ms transitions)

### Performance Optimizations

- Lightweight CSS with modern styling (gradients, shadows, animations)
- Efficient JavaScript with event delegation
- Local Storage for data persistence
- Smooth 60fps animations

### Visual Feedback

- Toast notifications for user actions
- Button state changes (disabled, loading, success)
- Hover and active states
- Loading animations

## 🎨 Design System

### Color Palette

- **Primary Gradient**: #667eea → #764ba2 (Purple to Violet)
- **Background**: #f8f9fa (Light Gray)
- **Text**: #333 (Dark Gray)
- **Accent**: Linear gradients throughout

### Typography

- **Font Family**: System fonts (San Francisco, Segoe UI, Roboto)
- **Sizes**: 28px (H1), 22px (H2), 17px (Body), 12-14px (Small)
- **Font Weights**: 400-700 for hierarchy

### Component Spacing

- Header padding: 30px (desktop), 24px (mobile)
- Card padding: 18-24px
- Gap between items: 15px (cards), 10px (options)
- Responsive adjustments for small screens

## 🔧 Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS Grid, Flexbox, CSS Animations
- **Storage**: Browser Local Storage API
- **Animations**: CSS transitions, keyframe animations, JavaScript animation frames

### File Structure

```
aa/
├── index.html      (HTML structure & semantic markup)
├── style.css       (Complete styling with responsive design)
├── app.js          (Poll algorithm, interactions, event handlers)
└── README.md       (This documentation)
```

## 🚀 Getting Started

### Installation

1. Place all three files (`index.html`, `style.css`, `app.js`) in the same directory
2. No server or build tools required - works on any modern browser
3. Open `index.html` in a web browser

### Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📊 User Engagement Metrics

The app tracks:

- **Articles Read**: Incremented by voting and liking
- **Events Joined**: Incremented by clicking "Join Events"
- **Votes Cast**: Incremented for each poll vote
- **Engagement Level**: Overall user activity score stored in Local Storage

## 🇵🇭 Philippines-Specific Content

All content is tailored to Filipino youth concerns:

- **Environmental**: Typhoons, plastic pollution, water access, coastal cleanup
- **Education**: STEM programs, scholarships, mental health support, vocational training
- **Community**: Youth councils, local governance, community feeding, skills training
- **Livelihood**: Job training, startup support, mentorship programs

## 💡 Key Interactions

### Voting Flow

1. User selects an option in a poll
2. Click "Vote Now" button
3. Algorithm records the vote
4. Success message appears
5. Statistics update in header
6. Vote count updates globally

### Bookmarking Flow

1. Click bookmark (🔖) on a news card
2. Article is saved to user profile
3. Toast notification confirms action
4. Bookmarked articles can be filtered (future feature)

### City Selection Flow

1. Open "My City" tab
2. Select a different city from dropdown
3. Location list dynamically updates
4. New events relevant to selected city appear
5. Engagement level increases

### Search Flow

1. Type keywords in search bar
2. News cards filter in real-time
3. Shows only matching articles
4. Can combine with category filters

## 🔐 Data Privacy

- All data stored locally in browser (Local Storage)
- No external API calls
- No personal information collected
- User can clear data by clearing browser cache
- Offline-capable application

## 📈 Future Enhancements

- User authentication and profiles
- Real-time database integration
- Push notifications for local events
- Social sharing to Facebook, Twitter
- Image uploads for testimonials
- Comment/discussion sections on news
- Mobile app version (React Native/Flutter)
- Analytics dashboard
- Recommendation engine
- Leaderboards for engagement

## 🎓 Educational Value

This app teaches youth about:

- **Civic Participation**: How to engage in their community
- **Data-Driven Decision Making**: See how policy priorities are formed
- **Digital Literacy**: Using technology for social good
- **Social Awareness**: Understanding Philippine issues
- **Activism**: Converting concerns into action

## 📞 Contact & Support

For issues or feature requests, please document them clearly with:

- Browser and device information
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if possible

---

**Version**: 1.0  
**Last Updated**: December 4, 2025  
**Target Audience**: Filipino Youth (13-35 years)  
**Status**: ✅ Production Ready
