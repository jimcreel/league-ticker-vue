import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    'https://vhtlukazgitxegqngstd.supabase.co',
    process.env.VUE_APP_SUPABASE_KEY as string
)
