# Paraphrasing Tool

A professional paraphrasing tool built with React.js and RapidAPI integration.

## Features

- ✅ RapidAPI Integration
- ✅ Glassmorphism Design
- ✅ Responsive Layout
- ✅ Smart Fallback System
- ✅ Professional UI/UX

## Technologies Used

- React.js
- Vite
- RapidAPI
- CSS3 (Glassmorphism)
- Axios

## Live Demo

Coming soon...

## Installation

- Node.js 16+ and npm/yarn installed
- (Optional) RapidAPI key for real paraphrasing API

### Setup

1. **Clone and setup**:

```bash
git clone <your-repo-url>
cd paraphrasing-tool
npm install
```

2. **Environment Configuration**:

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your RapidAPI key (optional)
# The app works with mock responses if no API key is provided
VITE_RAPIDAPI_KEY=your_actual_rapidapi_key_here
```

3. **Start Development Server**:

```bash
npm run dev
```

4. **Open your browser** and navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Deploy to Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables
4. Deploy

## 🔧 API Configuration

### Using RapidAPI (Recommended)

1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to a paraphrasing API service
3. Copy your API key to `.env` file
4. Update the API endpoint in `src/services/api.js`

### Using Mock API (Default)

The app includes intelligent mock responses that work without any API key. Perfect for development and demonstration.

## 📁 Project Structure

```
paraphrasing-tool/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Animated header with logo
│   │   ├── ParaphraseForm.jsx  # Main form with input handling
│   │   ├── ResultBox.jsx       # Results display with copy functionality
│   │   ├── Loader.jsx          # Beautiful loading animation
│   │   └── Footer.jsx          # Footer with social links
│   ├── services/
│   │   └── api.js              # API service with mock fallback
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles and utilities
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js            # Vite configuration
└── README.md                 # This file
```

## 🎨 Design Features

### Glassmorphism Elements

- Frosted glass cards with backdrop blur
- Subtle borders and shadows
- Gradient overlays and backgrounds

### Animations

- Smooth page transitions
- Hover effects with scale and rotation
- Loading animations with orbiting elements
- Text appearance animations
- Floating background particles

### Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔍 Code Quality

- **Clean Architecture**: Modular component structure
- **Commented Code**: Comprehensive documentation
- **Error Handling**: Robust error management
- **Performance**: Optimized animations and rendering
- **Accessibility**: ARIA labels and keyboard navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is created for the Anslation Internship Assignment.

## 👨‍💻 Built By

**Piyush Rajput** for Anslation Internship Assignment

- 🌐 Portfolio: https://piyushrajput-portfolio.netlify.app/
- 💼 LinkedIn: https://www.linkedin.com/in/piyush-patil-7a2a261b9/
- 📧 Email: piyushrajput710@gmail.com

---

**Ready for production deployment! 🚀**

_This project demonstrates modern React development practices, beautiful UI/UX design, and production-ready code quality._
