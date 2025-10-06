import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wuvgflwybgwembcnammi.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1dmdmbHd5Ymd3ZW1iY25hbW1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzUzMDUsImV4cCI6MjA3NTM1MTMwNX0.OWxieP1hdyxV1NqGIKF7lKCahx2TsObAmYf6Vfzryow";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
