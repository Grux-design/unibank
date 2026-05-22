-- Replace overly-permissive INSERT policies with real validation
DROP POLICY IF EXISTS "Anyone can insert complaints" ON public.complaints;
CREATE POLICY "Anyone can insert valid complaints"
  ON public.complaints FOR INSERT
  TO public
  WITH CHECK (
    accepted_terms = true
    AND reason IS NOT NULL AND length(reason) BETWEEN 1 AND 200
    AND description IS NOT NULL AND length(description) BETWEEN 1 AND 5000
    AND (relationship IS NULL OR length(relationship) <= 200)
    AND (location IS NULL OR length(location) <= 200)
    AND (company IS NULL OR length(company) <= 200)
    AND (incident_time IS NULL OR length(incident_time) <= 50)
    AND (file_url IS NULL OR length(file_url) <= 1000)
    AND (
      is_anonymous = true
      OR (
        name IS NOT NULL AND length(name) BETWEEN 1 AND 200
        AND email IS NOT NULL AND length(email) <= 320 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
        AND (phone IS NULL OR length(phone) <= 40)
      )
    )
  );

DROP POLICY IF EXISTS "Anyone can insert job applications" ON public.job_applications;
CREATE POLICY "Anyone can insert valid job applications"
  ON public.job_applications FOR INSERT
  TO public
  WITH CHECK (
    name IS NOT NULL AND length(name) BETWEEN 1 AND 200
    AND email IS NOT NULL AND length(email) <= 320 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (phone IS NULL OR length(phone) <= 40)
    AND (message IS NULL OR length(message) <= 5000)
    AND (cv_url IS NULL OR length(cv_url) <= 1000)
  );