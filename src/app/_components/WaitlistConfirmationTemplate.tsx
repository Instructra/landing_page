import * as React from "react";
import { LogoPng } from "./Logo";

export interface WaitlistConfirmationProps {
  senderName: string;
}

export function WaitlistConfirmationTemplate({
  senderName,
}: WaitlistConfirmationProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Waitlist Confirmation</title>
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
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <LogoPng />
          </div>

          <div style={{ borderTop: "1px solid #eee", paddingTop: "30px" }}>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Hi {senderName},
            </h1>
            <p style={{ fontSize: "16px", color: "#333", lineHeight: 1.6 }}>
              🎉 Thanks for joining the Instructra waiting list! You’re
              officially on board, and we’ll keep you updated as soon as we
              launch. Exciting things are coming your way.
            </p>
            <p style={{ fontSize: "16px", color: "#333", lineHeight: 1.6 }}>
              Stay tuned!
            </p>

            <div style={{ marginTop: "50px", color: "#555" }}>
              <p style={{ fontSize: "14px", margin: "5px 0" }}>Warm Regards,</p>
              <p style={{ fontSize: "14px", margin: "5px 0" }}>
                The Instructra Team.
              </p>
            </div>

            <div style={{ borderTop: "1px solid #eee", margin: "30px 0" }} />

            <p style={{ fontSize: "14px", color: "#333", lineHeight: 1.6 }}>
              Learn more about{" "}
              <a
                href="https://instructra.com/about"
                style={{ color: "#4a7bff", textDecoration: "none" }}
              >
                what Instructra is
              </a>
              . Questions? Contact us at{" "}
              <a
                href="mailto:help@instructra.com"
                style={{ color: "#4a7bff", textDecoration: "none" }}
              >
                help@instructra.com
              </a>
              .
            </p>
          </div>

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
