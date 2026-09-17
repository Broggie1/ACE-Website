CREATE TABLE IF NOT EXISTS contact_enquiries (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organisation TEXT,
  enquiry_type TEXT NOT NULL,
  postcode TEXT,
  message TEXT NOT NULL,
  privacy_consent INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'new'
);
CREATE INDEX IF NOT EXISTS idx_contact_enquiries_created_at ON contact_enquiries(created_at);
