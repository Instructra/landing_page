import * as React from "react";

export interface EmailTemplateProps {
  senderName: string;
  email: string;
  message: string;
  userType: string;
  token: string;
}

export function EmailTemplate({
  senderName,
  email,
  message,
  userType,
}: EmailTemplateProps) {
  return (
    <div>
      <h1>Greetings from {senderName}!</h1>
      <p>📧 email: {email} </p>
      <p>💬 Message: {message}</p>
      <p>👤 User type: {userType}</p>
    </div>
  );
}
