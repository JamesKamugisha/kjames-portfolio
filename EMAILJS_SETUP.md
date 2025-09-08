# EmailJS Setup Guide

This guide will help you set up EmailJS for your portfolio contact form.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for personal use)
   - **Outlook**
   - **Yahoo**
   - Or any other provider
4. Follow the setup instructions for your chosen provider
5. **Copy the Service ID** (you'll need this)

### Step 3: Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template content:

**Subject:** New Contact Form Message from {{from_name}}

**Body:**

```
Hello James,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio website.
Reply directly to this email to respond to {{from_name}}.
```

4. **Copy the Template ID** (you'll need this)

### Step 4: Get Public Key

1. Go to **Account** → **General**
2. **Copy your Public Key**

### Step 5: Update Environment Variables

1. Create a `.env` file in your project root
2. Add your EmailJS credentials:

```env
# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Step 6: Test the Form

1. Start your development server: `npm run dev`
2. Go to the contact form
3. Fill out and submit the form
4. Check your email inbox!

## 🔧 Troubleshooting

### Common Issues:

**"Email service is not configured"**

- Check that all environment variables are set correctly
- Make sure you're using `REACT_APP_` prefix
- Restart your development server after adding env vars

**"Invalid email" error**

- Check your email service configuration in EmailJS dashboard
- Verify the email address you're testing with

**Form submits but no email received**

- Check your spam folder
- Verify the email template is correct
- Check EmailJS dashboard for delivery logs

### Testing Locally:

1. Make sure your `.env` file is in the project root
2. Restart your dev server: `npm run dev`
3. The form should now send real emails!

## 📧 Email Template Variables

The template uses these variables:

- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - Message content
- `{{to_name}}` - Your name (James Kamugisha)
- `{{reply_to}}` - Reply-to email (sender's email)

## 🚀 Deployment

When deploying to production:

1. Add the same environment variables to your hosting platform
2. For Vercel: Add them in Project Settings → Environment Variables
3. For Netlify: Add them in Site Settings → Environment Variables
4. For other platforms: Check their documentation for env var setup

## 💡 Pro Tips

- **Free Tier**: 200 emails/month (perfect for portfolio)
- **Spam Protection**: EmailJS handles this automatically
- **Analytics**: Check your EmailJS dashboard for delivery stats
- **Custom Domain**: You can use your own domain for emails (paid feature)

## 🆘 Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)
- Check the browser console for any error messages

---

**Your contact form is now ready to send real emails! 🎉**
