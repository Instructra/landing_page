/* eslint-disable @next/next/no-img-element */
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
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Instructra Notification</title>
      </head>
      <body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f6f7f9",
          margin: 0,
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "40px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div
              style={{ position: "relative", height: "14px", width: "145px" }}
            >
              <img
                src="https://hncbsyyhcafzhkqlolkd.supabase.co/storage/v1/object/public/landingpage/logo.png"
                alt="Instructra logo"
                style={{ display: "inline", height: "100%", width: "100%" }}
              />
            </div>{" "}
          </div>

          {/* Content */}
          <div style={{ borderTop: "1px solid #eee", paddingTop: "30px" }}>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Contact form submitted by {senderName}
            </h1>

            <p
              style={{ fontSize: "16px", color: "#333", marginBottom: "12px" }}
            >
              📧 Email: {email}
            </p>
            <p
              style={{ fontSize: "16px", color: "#333", marginBottom: "12px" }}
            >
              💬 Message: {message}
            </p>
            <p
              style={{ fontSize: "16px", color: "#333", marginBottom: "12px" }}
            >
              👤 User type: {userType}
            </p>

            {/* Footer */}
            <div style={{ marginTop: "50px", color: "#555" }}>
              <p style={{ fontSize: "14px", margin: "5px 0" }}>Warm Regards,</p>
              <p style={{ fontSize: "14px", margin: "5px 0" }}>
                The Instructra Team.
              </p>
            </div>

            <div
              style={{ borderTop: "1px solid #eee", margin: "30px 0" }}
            ></div>

            <p style={{ fontSize: "14px", color: "#333", lineHeight: 1.6 }}>
              P.S. Here’s some more information about{" "}
              <a
                href="https://www.instructra.com"
                style={{ color: "#4a7bff", textDecoration: "none" }}
              >
                what Instructra is
              </a>
              , and if you have further questions, our friendly support team is
              on standby at{" "}
              <a
                href="mailto:info@instructra.com"
                style={{ color: "#4a7bff", textDecoration: "none" }}
              >
                info@instructra.com
              </a>
              .
            </p>
          </div>

          {/* Copyright */}
          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#888",
              marginTop: "30px",
            }}
          >
            © 2024 Instructra LTD.
          </div>
        </div>
      </body>
    </html>
  );
}
