import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
export const supabase = createClient(
  'https://fscotvimytudamnlfbix.supabase.co', // Your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzY290dmlteXR1ZGFtbmxmYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2MzI2MDMsImV4cCI6MjAzMDIwODYwM30.gkWkqmh_igAKMkvXamLL5dmBtiWPPQl5z7Hz3k1FjjY' // Your Supabase public key
);

export default supabase;

