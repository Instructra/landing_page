/* eslint-disable @next/next/no-img-element */

export interface WaitlistUserAddedTemplateProp {
  name: string;
  email: string;
  city: string;
  waitListType: string;
}
export function WaitlistUserAddedTemplate(
  waitlistUserAddedTemplateProp: WaitlistUserAddedTemplateProp,
) {
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

          <div style={{ borderTop: "1px solid #eee", paddingTop: "30px" }}>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Hi ,
            </h1>
            <p style={{ fontSize: "16px", color: "#333", lineHeight: 1.6 }}>
              <strong>{waitlistUserAddedTemplateProp.name}</strong>, with email{" "}
              {waitlistUserAddedTemplateProp.email} from{" "}
              <strong>{waitlistUserAddedTemplateProp.city}</strong> has been
              successfully added to our
              <strong> {waitlistUserAddedTemplateProp.waitListType} </strong>
              waiting list.
            </p>

            <div style={{ borderTop: "1px solid #eee", margin: "30px 0" }} />

            <p style={{ fontSize: "14px", color: "#333", lineHeight: 1.6 }}>
              Learn more about{" "}
              <a
                href="https://www.instructra.com"
                style={{ color: "#4a7bff", textDecoration: "none" }}
              >
                what Instructra is
              </a>
              . Questions? Contact us at{" "}
              <a
                href="mailto:info@instructra.com"
                style={{ color: "#4a7bff", textDecoration: "none" }}
              >
                info@instructra.com
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
