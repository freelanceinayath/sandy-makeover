-- Drop the permissive policy
DROP POLICY IF EXISTS "insert_contact_messages" ON contact_messages;

-- Re-create with a real WITH CHECK that validates the incoming row
CREATE POLICY "insert_contact_messages" ON contact_messages FOR INSERT
  TO anon
  WITH CHECK (
    char_length(trim(name))    BETWEEN 1 AND 200    AND
    char_length(trim(email))   BETWEEN 1 AND 200    AND
    email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$' AND
    char_length(trim(message)) BETWEEN 1 AND 5000
  );
