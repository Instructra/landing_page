import * as React from "react";

export interface EmailTemplateProps {
  senderName: string;
  email: string;
  message: string;
  userType: string;
}

export function EmailTemplate({
  senderName,
  email,
  message,
  userType,
}: EmailTemplateProps) {
  return (
    <div>
      <h1>Hello, {senderName}!</h1>
      <p>from: {email} </p>
      <p>message: {message}</p>
      <p>user type: {userType}</p>
    </div>
  );
}
