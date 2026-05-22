-- Make buckets private
UPDATE storage.buckets SET public = false WHERE id IN ('complaint-files', 'cv-files');

-- Drop overly-permissive public SELECT policies
DROP POLICY IF EXISTS "Anyone can read complaint files" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read cv files" ON storage.objects;

-- Restrict reads to authenticated users only
CREATE POLICY "Authenticated can read complaint files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'complaint-files');

CREATE POLICY "Authenticated can read cv files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'cv-files');