# Supabase Setup Instructions

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `rideeasy-auth` (or any name you prefer)
   - Database Password: Create a strong password
   - Region: Choose the closest region to your users
6. Click "Create new project"

## 2. Get Your Project Credentials

1. Once your project is created, go to the project dashboard
2. Click on "Settings" in the left sidebar
3. Click on "API" in the settings menu
4. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## 3. Update Your App Configuration

1. Open `/config/supabase.js`
2. Replace the placeholder values:

```javascript
const supabaseUrl = "YOUR_SUPABASE_URL"; // Replace with your Project URL
const supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY"; // Replace with your Anon Key
```

## 4. Configure Authentication Settings

1. In your Supabase dashboard, go to "Authentication" > "Settings"
2. Configure the following:

### Site URL

- Set to your app's URL (for development: `exp://localhost:8081` or your Expo dev server URL)

### Redirect URLs

- Add your app's redirect URL (for development: `exp://localhost:8081`)

### Email Settings

- Configure your email templates if needed
- Set up email confirmation settings

## 5. Database Setup (Optional)

If you want to store additional user data:

1. Go to "Table Editor" in your Supabase dashboard
2. Create a new table called `profiles`:

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
```

## 6. Test Your Setup

1. Start your React Native app
2. Try to sign up with a new account
3. Check your Supabase dashboard under "Authentication" > "Users" to see if the user was created
4. Try logging in with the created account

## 7. Production Considerations

- Update your Site URL and Redirect URLs for production
- Set up proper email templates
- Configure rate limiting
- Set up proper security policies
- Consider using environment variables for your keys

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error**: Double-check your Supabase URL and Anon Key
2. **Redirect URL mismatch**: Make sure your redirect URLs in Supabase match your app's URL
3. **Email not sending**: Check your email settings in Supabase dashboard
4. **CORS errors**: Make sure your Site URL is correctly configured

### Getting Help:

- Check the [Supabase Documentation](https://supabase.com/docs)
- Join the [Supabase Discord](https://discord.supabase.com)
- Check the [React Native Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-react-native)
