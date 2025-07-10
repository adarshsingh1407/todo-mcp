-- Create the todo table
CREATE TABLE IF NOT EXISTS todo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'TODO' CHECK (status IN ('TODO', 'DONE')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on status for better query performance
CREATE INDEX IF NOT EXISTS idx_todo_status ON todo(status);

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_todo_updated_at 
    BEFORE UPDATE ON todo 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column(); 