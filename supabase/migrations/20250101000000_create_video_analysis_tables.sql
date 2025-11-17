/*
# [Operation] Create Video Analysis Tables
This migration creates two tables, `real_videos` and `fake_videos`, to store the results of the deepfake detection analysis.

## Query Description:
This operation is safe and will create two new tables in the `public` schema. It will not affect any existing data as it only adds new database objects. These tables are essential for the application to persist analysis results.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (The tables can be dropped manually if needed)

## Structure Details:
- **Table `real_videos`**:
  - `id` (UUID, Primary Key): Unique identifier for each record.
  - `created_at` (TIMESTAMPTZ): Timestamp of when the record was created.
  - `source` (TEXT): The source of the video ('live' or 'upload').
  - `confidence_score` (REAL): The calculated confidence score of the analysis.
  - `duration_seconds` (INT): The duration of the analyzed video in seconds.
  - `metadata` (JSONB): A flexible field to store detailed analysis metrics and file info.
  - `anomalies_detected` (INT): The number of anomalies detected during the analysis.
- **Table `fake_videos`**:
  - Identical structure to `real_videos`.

## Security Implications:
- RLS Status: Disabled by default on new tables.
- Policy Changes: No.
- Auth Requirements: None for this migration. RLS policies can be added later to restrict access.

## Performance Impact:
- Indexes: A primary key index will be created on the `id` column for both tables.
- Triggers: None.
- Estimated Impact: Low. These are new tables and will not impact existing query performance.
*/

-- Create the table for authentic videos
CREATE TABLE public.real_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    source TEXT NOT NULL,
    confidence_score REAL NOT NULL,
    duration_seconds INT,
    metadata JSONB,
    anomalies_detected INT DEFAULT 0
);

-- Add comments to the table and columns for clarity
COMMENT ON TABLE public.real_videos IS 'Stores analysis results for videos classified as authentic.';
COMMENT ON COLUMN public.real_videos.source IS 'The source of the video, e.g., ''live'' or ''upload''.';
COMMENT ON COLUMN public.real_videos.confidence_score IS 'The confidence score (0-100) that the video is authentic.';
COMMENT ON COLUMN public.real_videos.metadata IS 'Detailed analysis data, such as average scores, frame counts, or file info.';


-- Create the table for suspicious/fake videos
CREATE TABLE public.fake_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    source TEXT NOT NULL,
    confidence_score REAL NOT NULL,
    duration_seconds INT,
    metadata JSONB,
    anomalies_detected INT DEFAULT 0
);

-- Add comments to the table and columns for clarity
COMMENT ON TABLE public.fake_videos IS 'Stores analysis results for videos classified as fake or suspicious.';
COMMENT ON COLUMN public.fake_videos.source IS 'The source of the video, e.g., ''live'' or ''upload''.';
COMMENT ON COLUMN public.fake_videos.confidence_score IS 'The confidence score (0-100) that the video is authentic. Lower scores indicate suspicion.';
COMMENT ON COLUMN public.fake_videos.metadata IS 'Detailed analysis data, such as average scores, frame counts, or file info.';
