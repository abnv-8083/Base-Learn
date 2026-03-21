-- Base Learn Supabase Initial Schema

-- Create the profiles table that links to Supabase Auth users
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('student', 'admin', 'faculty', 'instructor')) DEFAULT 'student',
  studentId TEXT,
  department TEXT,
  profilePhoto TEXT,
  isActive BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Note: RLS (Row Level Security) is disabled by default. If you want to enable it:
-- Trigger function to automatically create a profile for new users (e.g. via Google OAuth)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', 'Student'), 
    new.email, 
    'student'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a user is created
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
