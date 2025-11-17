/*
# [Security Enhancement] Enable RLS and Define Insert Policies
This migration secures the `real_videos` and `fake_videos` tables by enabling Row Level Security (RLS) and creating policies that allow anonymous users to insert data while preventing them from reading, updating, or deleting existing data. This addresses a critical security advisory.

## Query Description:
This operation enables Row Level Security (RLS) on the `real_videos` and `fake_videos` tables. By default, when RLS is enabled, all access is denied. We then create a specific policy to only allow new rows to be inserted. This is a critical security measure to prevent unauthorized access and modification of the analysis data. No existing data will be lost.

## Metadata:
- Schema-Category: ["Structural", "Security"]
- Impact-Level: ["High"]
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Tables affected:
  - `public.real_videos`
  - `public.fake_videos`
- Changes:
  - RLS will be enabled on both tables.
  - A new policy named "Allow anonymous inserts" will be created for each table.

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes
- Auth Requirements: This policy applies to the `anon` (anonymous) role. It allows data insertion without authentication but blocks all other access, significantly improving data security.

## Performance Impact:
- Indexes: None
- Triggers: None
- Estimated Impact: Negligible performance impact on insert operations. RLS adds a small overhead to every query on the protected tables.
*/

-- Enable RLS for the real_videos table
ALTER TABLE public.real_videos ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anonymous users to insert into real_videos
CREATE POLICY "Allow anonymous inserts for real_videos"
ON public.real_videos
FOR INSERT
TO anon
WITH CHECK (true);

-- Enable RLS for the fake_videos table
ALTER TABLE public.fake_videos ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anonymous users to insert into fake_videos
CREATE POLICY "Allow anonymous inserts for fake_videos"
ON public.fake_videos
FOR INSERT
TO anon
WITH CHECK (true);
