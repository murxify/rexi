import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;

////////////////////////////////////////////// Example
// import { useAuth } from '@clerk/nextjs'
// import supabase from '../lib/supabaseClient'

// export default function Home() {
//   const { getToken } = useAuth()

//   const fetchData = async () => {
// This token is short-lived for better security and should
// be called before every request to your Supabase backend.
//     // TODO #1: Replace with your JWT template name
//     const token = await getToken({ template: 'supabase' })

//     supabase.auth.setAuth(token)

//     // TODO #2: Replace with your database table name
//     const { data, error } = await supabase.from('your_table').select()

//     // TODO #3: Handle the response
//   }

//   return (
//     <button type="button" onClick={fetchData}>
//       Fetch data
//     </button>
//   )
// }
