// app/privacy-policy/page.tsx
// If your project uses the Pages Router, rename this file to `pages/privacy-policy.tsx`
// and remove the `metadata` export.
// NOTE: Adjust the import path for MainContainer to match your project structure.

import React from "react";
import Link from "next/link";
import MainContainer from "../_components/MainContainer";

export const metadata = {
  title: "Privacy Policy | Instructra",
  description:
    "Learn how Instructra collects, uses, and protects your personal information.",
  alternates: { canonical: "https://www.instructra.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section
      id="privacy-policy"
      className="relative flex flex-col items-center bg-white text-gray-900"
    >
      <MainContainer>
        <div className="tb:grid-cols-6 l:grid-cols-12 grid auto-rows-auto grid-cols-1 gap-8">
          {/* Header */}
          <header className="tb:col-span-6 l:col-span-12 flex flex-col gap-3 pt-8">
            <h1 className="text-text-primary tb:text-6xl l:text-7xl text-[40px] leading-tight font-semibold tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-600">
              Last updated: <time dateTime="2025-10-13">October 13, 2025</time>
            </p>
            <p className="max-w-[780px]">
              This Privacy Policy explains how <strong>Instructra</strong>{" "}
              (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses,
              discloses, and safeguards your information when you visit{" "}
              <strong>https://www.instructra.com</strong>
              (the &quot;Site&quot;) and use our services. By using the Site,
              you agree to the practices described here. If you do not agree,
              please do not use the Site.
            </p>
          </header>

          {/* Quick links */}
          <aside className="tb:col-span-2 l:col-span-3 tb:order-none order-last">
            <nav aria-label="On this page" className="sticky top-24">
              <div className="bg-card/60 rounded-2xl border border-gray-200 p-4">
                <p className="mb-2 text-sm font-medium text-gray-700">
                  On this page
                </p>
                <ul className="space-y-2 text-sm">
                  {[
                    ["information-we-collect", "Information We Collect"],
                    ["how-we-use-information", "How We Use Information"],
                    ["cookies-tracking", "Cookies & Tracking"],
                    ["legal-bases", "Legal Bases (GDPR)"],
                    ["data-sharing", "Data Sharing"],
                    ["data-retention", "Data Retention"],
                    ["your-rights", "Your Rights"],
                    ["security", "Security"],
                    ["children", "Children’s Privacy"],
                    ["international", "International Transfers"],
                    ["third-parties", "Third-Party Links & Services"],
                    ["changes", "Changes to This Policy"],
                    ["contact", "Contact Us"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <Link
                        href={`#${href}`}
                        className="text-gray-700 underline-offset-2 hover:underline"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </aside>

          {/* Body */}
          <article className="tb:col-span-4 l:col-span-9 flex flex-col gap-14">
            <section id="information-we-collect" className="py-2">
              <h2 className="text-2xl font-semibold">
                1. Information We Collect
              </h2>
              <div className="space-y-3">
                <h3 className="font-medium">1.1 Information you provide</h3>
                <ul className="list-disc space-y-1 pl-6">
                  <li>Name and contact details (e.g., email, phone).</li>
                  <li>Account details and profile information.</li>
                  <li>
                    Payment/billing information (processed by our payment
                    provider, not stored by us beyond what’s necessary).
                  </li>
                  <li>Support messages and form submissions.</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium">
                  1.2 Information collected automatically
                </h3>
                <ul className="list-disc space-y-1 pl-6">
                  <li>
                    IP address, device and browser type, operating system.
                  </li>
                  <li>
                    Usage data (pages viewed, time on page, referring/exit
                    pages).
                  </li>
                  <li>Approximate location derived from IP.</li>
                  <li>Diagnostics, crash data, performance metrics.</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium">
                  1.3 Cookies and similar technologies
                </h3>
                <p>
                  We use cookies, local storage, and similar technologies to
                  keep you signed in, remember preferences, analyze traffic, and
                  improve the Site. You can control cookies via your browser
                  settings. Some features may not function if cookies are
                  disabled.
                </p>
              </div>
            </section>

            <section id="how-we-use-information" className="space-y-2">
              <h2 className="text-2xl font-semibold">
                2. How We Use Information
              </h2>
              <ul className="list-disc space-y-1 pl-6">
                <li>Provide, operate, and improve the Site and services.</li>
                <li>Personalize content and features.</li>
                <li>
                  Communicate with you (service updates, support, marketing with
                  your consent).
                </li>
                <li>
                  Monitor usage, perform analytics, and prevent fraud/abuse.
                </li>
                <li>Comply with legal obligations and enforce our terms.</li>
              </ul>
            </section>

            <section id="cookies-tracking" className="space-y-2">
              <h2 className="text-2xl font-semibold">3. Cookies & Tracking</h2>
              <p>
                We may use first‑party and third‑party cookies and pixels (for
                example, analytics and performance). Where required by law, we
                seek your consent before setting non‑essential cookies. You can
                change or withdraw your consent at any time via your browser or
                a cookie banner (if provided).
              </p>
            </section>

            <section id="legal-bases" className="space-y-2">
              <h2 className="text-2xl font-semibold">4. Legal Bases (GDPR)</h2>
              <p>
                If you are in the EEA/UK, we process personal data under these
                legal bases: (a) <em>contract</em>—to provide services you
                request; (b)
                <em>legitimate interests</em>—to improve our services and ensure
                security; (c) <em>consent</em>—for certain analytics/marketing;
                and (d)
                <em>legal obligation</em>—to comply with applicable laws.
              </p>
            </section>

            <section id="data-sharing" className="space-y-2">
              <h2 className="text-2xl font-semibold">5. Data Sharing</h2>
              <ul className="list-disc space-y-1 pl-6">
                <li>
                  <strong>Service providers:</strong> We share data with vendors
                  who help us operate the Site (e.g., hosting, analytics, email,
                  payments).
                </li>
                <li>
                  <strong>Legal and safety:</strong> We may disclose information
                  if required by law or to protect rights, safety, and security.
                </li>
                <li>
                  <strong>Business transfers:</strong> Your information may be
                  transferred in connection with a merger, acquisition, or asset
                  sale.
                </li>
                <li>
                  <strong>With your consent:</strong> We may share data when you
                  agree to it.
                </li>
              </ul>
            </section>

            <section id="data-retention" className="space-y-2">
              <h2 className="text-2xl font-semibold">6. Data Retention</h2>
              <p>
                We retain personal data only for as long as necessary for the
                purposes described in this Policy, including to comply with
                legal, accounting, or reporting requirements. When no longer
                needed, we delete or anonymize the data.
              </p>
            </section>

            <section id="your-rights" className="space-y-2">
              <h2 className="text-2xl font-semibold">7. Your Rights</h2>
              <p>
                Depending on your location, you may have rights to access,
                correct, delete, or restrict the processing of your personal
                data; to object to processing; to portability; and to withdraw
                consent. To exercise these rights, contact us via the details
                below. We may verify your identity before responding.
              </p>
              <p>
                If you are a California resident, you may have additional rights
                under the CCPA/CPRA.
              </p>
            </section>

            <section id="security" className="space-y-2">
              <h2 className="text-2xl font-semibold">8. Security</h2>
              <p>
                We implement reasonable technical and organizational measures to
                protect personal data. However, no method of transmission over
                the Internet or electronic storage is 100% secure, so we cannot
                guarantee absolute security.
              </p>
            </section>

            <section id="children" className="space-y-2">
              <h2 className="text-2xl font-semibold">9. Children’s Privacy</h2>
              <p>
                Our Site is not directed to children under 13 (or the age
                required by your jurisdiction). We do not knowingly collect data
                from children. If you believe a child has provided us data,
                please contact us so we can delete it.
              </p>
            </section>

            <section id="international" className="space-y-2">
              <h2 className="text-2xl font-semibold">
                10. International Transfers
              </h2>
              <p>
                Your information may be processed and stored in countries other
                than your own, which may have different data protection laws.
                Where required, we implement appropriate safeguards for such
                transfers.
              </p>
            </section>

            <section id="third-parties" className="space-y-2">
              <h2 className="text-2xl font-semibold">
                11. Third‑Party Links & Services
              </h2>
              <p>
                The Site may contain links to third‑party websites, apps, or
                services. We are not responsible for their privacy practices. We
                encourage you to review their policies.
              </p>
            </section>

            <section id="changes" className="space-y-2">
              <h2 className="text-2xl font-semibold">
                12. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                revise the “Last updated” date above and, for material changes,
                may provide additional notice.
              </p>
            </section>

            <section id="contact" className="space-y-2">
              <h2 className="text-2xl font-semibold">13. Contact Us</h2>
              <p>
                If you have questions, concerns, or requests about this Privacy
                Policy, contact us at:
              </p>
              <address className="not-italic">
                <div>
                  <strong>Instructra</strong>
                </div>
                <div>
                  Email:{" "}
                  <a className="underline" href="mailto:info@instructra.com">
                    info@instructra.com
                  </a>
                </div>
                <div>Address: [Add your business address]</div>
              </address>
            </section>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href="/"
                className="bg-card text-text-primary rounded-full px-4 py-2 underline-offset-2 hover:underline"
              >
                ← Back to Home
              </Link>
              <Link
                href="/#contact"
                className="rounded-full border border-gray-300 px-4 py-2 hover:bg-gray-50"
              >
                Contact Support
              </Link>
            </div>
          </article>
        </div>
      </MainContainer>
    </section>
  );
}
