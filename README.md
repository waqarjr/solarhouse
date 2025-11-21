<div align="center">

# 🌞 SolarHouse

### Modern E-Commerce Platform for Solar Energy Solutions

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://solarhouse.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-Proprietary-orange?style=for-the-badge)](https://github.com/waqarjr/solarhouse)

[🚀 Live Demo](https://solarhouse.vercel.app) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/waqarjr/solarhouse/issues) • [✨ Request Feature](https://github.com/waqarjr/solarhouse/issues)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [API Routes](#-api-routes)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 About

**SolarHouse** is a cutting-edge e-commerce platform dedicated to providing sustainable solar energy solutions. The platform offers a seamless shopping experience for solar panels, inverters, batteries, VA protectors, and other renewable energy products.

Built with modern web technologies, SolarHouse combines exceptional performance with an intuitive user interface to help customers transition to clean, renewable energy.

### 🎯 Project Goals

- 🌍 Promote sustainable energy adoption
- 🛒 Provide seamless e-commerce experience
- 📱 Deliver responsive, mobile-first design
- ⚡ Ensure blazing-fast performance
- 🔐 Maintain secure authentication & transactions

---

## ✨ Features

### 🛍️ Customer Features

- **🏠 Home Page** - Dynamic carousel, featured products, new arrivals
- **🔍 Product Catalog** - Browse solar panels, inverters, batteries, and accessories
- **🛒 Shopping Cart** - Add, remove, and manage items
- **💳 Checkout** - Streamlined checkout process
- **❤️ Wishlist** - Save favorite products
- **👤 User Account** - Order history, downloads, profile management
- **📦 Order Tracking** - Real-time order status updates
- **📞 Contact Us** - Customer support and inquiries

### 🔐 Authentication

- JWT-based authentication
- Secure token validation
- Protected routes middleware
- Cookie-based session management

### 📄 Legal & Policies

- Privacy Policy
- Terms & Conditions
- Shipping & Return Policy
- Refund & Returns Policy

### 🎨 Design Features

- Fully responsive design
- Modern UI with Lucide React icons
- Smooth animations and transitions
- Optimized images and assets
- Dark mode ready (Tailwind CSS 4)

---

## 🛠 Tech Stack

### Core Framework

- **[Next.js 15.5.4](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://reactjs.org/)** - UI library
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### State Management & Forms

- **[Zustand 5.0.8](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[Formik 2.4.6](https://formik.org/)** - Form management
- **[Yup 1.7.1](https://github.com/jquense/yup)** - Schema validation

### API & Authentication

- **[Axios 1.12.2](https://axios-http.com/)** - HTTP client
- **[JSON Web Token 9.0.2](https://github.com/auth0/node-jsonwebtoken)** - JWT authentication
- **[Nodemailer 7.0.9](https://nodemailer.com/)** - Email service

### UI Components & Utilities

- **[Lucide React 0.545.0](https://lucide.dev/)** - Beautiful icon library
- **[SweetAlert2 11.26.3](https://sweetalert2.github.io/)** - Elegant alerts

### Development Tools

- **[ESLint 9](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/waqarjr/solarhouse.git
cd solarhouse
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
# Example:
# NEXT_PUBLIC_API_URL=your-api-url
# JWT_SECRET=your-jwt-secret
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## 📁 Project Structure

```
nextadmin/
├── 📂 public/                    # Static assets
│   ├── logo.png                  # Brand logo
│   ├── banner*.png|jpg           # Homepage banners
│   ├── solar-*.jpg|webp          # Product images
│   └── inverter.png              # Product images
├── 📂 src/
│   ├── 📂 app/                   # Next.js App Router
│   │   ├── 📂 (user)/            # User-facing routes
│   │   │   ├── page.js           # Homepage
│   │   │   ├── 📂 shop/          # Product catalog
│   │   │   ├── 📂 cart/          # Shopping cart
│   │   │   ├── 📂 checkout/      # Checkout process
│   │   │   ├── 📂 wishlist/      # User wishlist
│   │   │   ├── 📂 my-account/    # User dashboard
│   │   │   ├── 📂 contact-us/    # Contact page
│   │   │   └── 📂 *-policy/      # Legal pages
│   │   ├── 📂 admin/             # Admin panel
│   │   │   ├── 📂 dashboard/     # Admin dashboard
│   │   │   └── 📂 products/      # Product management
│   │   ├── 📂 api/               # API routes
│   │   │   ├── 📂 auth/          # Authentication endpoints
│   │   │   ├── 📂 checkout/      # Checkout API
│   │   │   └── 📂 orders/        # Order management
│   │   ├── 📂 .component/        # Reusable components
│   │   ├── 📂 lib/               # Utility functions
│   │   ├── globals.css           # Global styles
│   │   └── favicon.ico           # Site favicon
│   └── middleware.js             # Route protection middleware
├── 📄 .env.local                 # Environment variables (gitignored)
├── 📄 eslint.config.mjs          # ESLint configuration
├── 📄 jsconfig.json              # JavaScript configuration
├── 📄 next.config.mjs            # Next.js configuration
├── 📄 postcss.config.mjs         # PostCSS configuration
├── 📄 package.json               # Dependencies & scripts
├── 📄 README.md                  # You are here!
└── 📄 .gitignore                 # Git ignore rules
```

---

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```env
# JWT Authentication
JWT_SECRET=your-jwt-secret-key

# Email Configuration (Nodemailer)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

# API Configuration
NEXT_PUBLIC_API_URL=https://solarhouse.pk/wp-json

# Optional: Analytics, Payment Gateways, etc.
# NEXT_PUBLIC_STRIPE_KEY=your-stripe-key
# NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

> **⚠️ Important:** Never commit `.env.local` to version control!

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at `http://localhost:3000` |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint to check code quality |

---

## 🌐 API Routes

The application includes the following API endpoints:

### Authentication (`/api/auth`)
- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/register` - User registration
- **POST** `/api/auth/validate` - Token validation
- **POST** `/api/auth/logout` - User logout
- **POST** `/api/auth/forgot-password` - Password recovery

### Checkout (`/api/checkout`)
- **POST** `/api/checkout` - Process checkout

### Orders (`/api/orders`)
- **GET** `/api/orders` - Get user orders
- **GET** `/api/orders/[id]` - Get specific order details

---

## 🌍 Deployment

### Deploying to Vercel (Recommended)

1. **Push your code to GitHub**

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Deploy to Vercel**

   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy! 🚀

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/waqarjr/solarhouse)

### Other Platforms

- **Netlify**: Connect GitHub repo and deploy
- **Railway**: Use starter template
- **AWS/GCP**: Use Docker or serverless deployment

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is proprietary software. All rights reserved.

For usage and redistribution permissions, please contact the repository owner.

---

## 📧 Contact

**Waqar Jr** - [@waqarjr](https://github.com/waqarjr)

**Project Link:** [https://github.com/waqarjr/solarhouse](https://github.com/waqarjr/solarhouse)

**Live Demo:** [https://solarhouse.vercel.app](https://solarhouse.vercel.app)

---

<div align="center">

### 🌟 Star this repo if you find it helpful!

Made with ❤️ and ☀️ for a sustainable future

[⬆ Back to Top](#-solarhouse)

</div>