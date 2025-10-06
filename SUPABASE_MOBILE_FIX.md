# 🔧 Fix Supabase Email Confirmation for Mobile Apps

## The Problem

Supabase sends confirmation emails with localhost URLs, which don't work on mobile devices. This guide will fix this issue.

## 🚀 **Step 1: Update Supabase Dashboard Settings**

### 1. Go to your Supabase Dashboard

- Navigate to your project → **Authentication** → **URL Configuration**

### 2. Update Site URL

```
exp://10.216.126.173:8081
```

_(Replace with your computer's IP address)_

### 3. Add Redirect URLs

Add these URLs to the "Redirect URLs" section:

```
exp://10.216.126.173:8081
exp://localhost:8081
exp://127.0.0.1:8081
exp://192.168.1.100:8081
```

### 4. Update Email Templates (Optional)

Go to **Authentication** → **Email Templates** → **Confirm signup**

Update the confirmation link template:

```html
<a href="{{ .ConfirmationURL }}">Confirm your account</a>
```

## 🚀 **Step 2: Test Your Setup**

### 1. Start your Expo development server

```bash
npx expo start
```

### 2. Test the signup flow

1. Open your app
2. Try to sign up with a new email
3. You should see the Email Confirmation screen
4. Check your email for the confirmation link

### 3. Test email confirmation

1. Click the confirmation link in your email
2. It should redirect back to your app
3. You should be automatically logged in

## 🔧 **Alternative Solutions**

### Option 1: Use Deep Linking (Recommended)

If the above doesn't work, you can use deep linking:

1. **Install expo-linking**:

```bash
npx expo install expo-linking
```

2. **Update your app.json**:

```json
{
  "expo": {
    "scheme": "rideeasy",
    "web": {
      "bundler": "metro"
    }
  }
}
```

3. **Update redirect URLs in Supabase**:

```
rideeasy://auth/callback
```

### Option 2: Use Custom Domain (Production)

For production, use a custom domain:

1. **Set up a web app** that handles the redirect
2. **Use URLs like**:

```
https://yourapp.com/auth/callback
```

## 🐛 **Troubleshooting**

### Issue: "Invalid redirect URL"

**Solution**: Make sure all redirect URLs in Supabase match exactly what you're using in your app.

### Issue: Email link doesn't work on mobile

**Solution**:

1. Make sure you're using the correct IP address
2. Try using the `exp://` protocol instead of `http://`
3. Test with a physical device instead of simulator

### Issue: App doesn't open when clicking email link

**Solution**:

1. Make sure your Expo development server is running
2. Check that the IP address is correct
3. Try restarting your development server

### Issue: Confirmation works but user isn't logged in

**Solution**:

1. Check your AuthContext implementation
2. Make sure the auth state change listener is working
3. Verify that the user object is being set correctly

## 📱 **Testing on Physical Device**

### 1. Find your computer's IP address

```bash
# On Mac/Linux
ifconfig | grep "inet " | grep -v 127.0.0.1

# On Windows
ipconfig
```

### 2. Update Supabase with your IP

Replace `10.216.126.173` with your actual IP address in:

- Supabase dashboard redirect URLs
- AuthContext.js emailRedirectTo
- EmailConfirmationScreen.js

### 3. Test on your phone

1. Make sure your phone and computer are on the same WiFi network
2. Start Expo with tunnel mode:

```bash
npx expo start --tunnel
```

3. Scan the QR code with your phone
4. Test the signup flow

## 🎯 **Production Considerations**

For production apps, consider:

1. **Use a custom domain** for email redirects
2. **Set up proper deep linking** with your app store URLs
3. **Configure email templates** with your branding
4. **Set up proper error handling** for failed confirmations

## 📞 **Need Help?**

If you're still having issues:

1. **Check the Expo logs** for any error messages
2. **Verify your Supabase settings** match your app configuration
3. **Test with a simple email** first (like Gmail)
4. **Check your spam folder** for confirmation emails

The key is making sure the redirect URLs in Supabase exactly match what your app is expecting!
