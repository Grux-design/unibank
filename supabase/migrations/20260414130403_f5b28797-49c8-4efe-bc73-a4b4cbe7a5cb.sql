
-- complaints table
CREATE TABLE public.complaints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  relationship TEXT,
  location TEXT,
  company TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  name TEXT,
  phone TEXT,
  email TEXT,
  reason TEXT,
  description TEXT,
  incident_date DATE,
  incident_time TEXT,
  file_url TEXT,
  accepted_terms BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert complaints"
  ON public.complaints FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authenticated can view complaints"
  ON public.complaints FOR SELECT
  TO authenticated
  USING (true);

-- job_applications table
CREATE TABLE public.job_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  message TEXT,
  cv_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert job applications"
  ON public.job_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authenticated can view job applications"
  ON public.job_applications FOR SELECT
  TO authenticated
  USING (true);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('complaint-files', 'complaint-files', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('cv-files', 'cv-files', true);

-- Storage policies - anyone can upload
CREATE POLICY "Anyone can upload complaint files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'complaint-files');

CREATE POLICY "Anyone can read complaint files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'complaint-files');

CREATE POLICY "Anyone can upload cv files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'cv-files');

CREATE POLICY "Anyone can read cv files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'cv-files');
