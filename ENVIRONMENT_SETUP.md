# Environment Setup Guide

## Required Environment Variables

To fix the environment variable errors, you need to create a `.env` file in the root directory with the following variables:

### 1. Create `.env` file

Create a `.env` file in the root directory (`portfolio/.env`) with the following content:

```env
# Frontend Environment Variables
VITE_API_URL=http://localhost:3001/api

# EmailJS Configuration
# Get these values from https://www.emailjs.com/
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here

# Backend Environment Variables
NODE_ENV=development
PORT=3001
```

### 2. EmailJS Setup

1. Go to [EmailJS](https://www.emailjs.com/)
2. Create an account and set up a service
3. Create an email template
4. Get your Service ID, Template ID, and Public Key
5. Replace the placeholder values in your `.env` file

### 3. Backend API (Optional)

If you want to use the backend API for availability status:

1. Make sure your backend server is running on port 3001
2. The API should have endpoints:
   - `GET /api/availability` - Get current availability status
   - `PUT /api/availability` - Update availability status
   - `GET /api/health` - Health check

## What Was Fixed

1. **Process.env Error**: Updated all services to use Vite's `import.meta.env` instead of `process.env`
2. **API Service Import**: Changed to dynamic imports to prevent build-time errors
3. **Environment Variables**: Updated to use Vite's `VITE_` prefix for environment variables
4. **Vite Configuration**: Added process.env support for compatibility

## Notes

- The application will work without the backend API (using localStorage only)
- Email functionality requires EmailJS configuration
- All environment variables are optional and have fallbacks
