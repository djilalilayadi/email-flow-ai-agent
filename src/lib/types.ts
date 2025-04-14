
export interface EmailSender {
  name: string;
  email: string;
}

export interface Attachment {
  id: string;
  filename: string;
  size: string;
  url?: string;
}

export interface EmailType {
  id: string;
  sender: EmailSender;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  important?: boolean;
  summary?: string;
  labels?: string[];
  attachments?: Attachment[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture: string;
  given_name?: string;
  family_name?: string;
  locale?: string;
  verified_email?: boolean;
}
