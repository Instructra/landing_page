import Seo from "@/components/Seo";

const sections = [
  { title: "1. Information We Collect", content: "We collect information you provide directly (name, email, contact details) and information generated through your use of Instructra (booking history, messages, device information). We do not collect sensitive personal data unless necessary to provide our services." },
  { title: "2. How We Use Your Information", content: "We use your information to provide and improve the Instructra service, process bookings, facilitate communication between learners and instructors, send service notifications, and comply with legal obligations." },
  { title: "3. Data Sharing", content: "We share your information only as necessary: with your instructor or learner to facilitate bookings and communication, with service providers who help us operate the platform, and when required by law. We never sell your personal data." },
  { title: "4. Data Retention", content: "We retain your personal data for as long as your account is active or as needed to provide services. You can request deletion of your account and associated data at any time." },
  { title: "5. Your Rights", content: "Under UK GDPR, you have the right to access, correct, delete, or port your personal data. You may also object to or restrict processing. To exercise these rights, contact us at hello@instructra.com." },
  { title: "6. Cookies", content: "We use essential cookies to operate the platform and optional analytics cookies to understand usage. You can manage cookie preferences in your browser settings." },
  { title: "7. Security", content: "We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse." },
  { title: "8. Changes to This Policy", content: "We may update this policy from time to time. We will notify you of significant changes via email or in-app notification." },
  { title: "9. Contact", content: "For privacy enquiries, email hello@instructra.com." },
];

export default function Privacy() {
  // SEO handled via <Seo> in JSX return

  return (
    <>
      <Seo title="Privacy Policy | Instructra" description="How Instructra collects, uses, and protects your personal data." path="/privacy" />
      <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-display-lg">Privacy Policy</h1>
        <p className="mt-4 text-body text-muted-foreground">Last updated: February 2026</p>
        <p className="mt-6 text-body text-muted-foreground">
          This privacy policy explains how Instructra Ltd ("we", "us") collects, uses, and protects your personal data when you use our platform and services.
        </p>
        <div className="mt-10 flex flex-col gap-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-heading">{s.title}</h2>
              <p className="mt-2 text-body text-muted-foreground">{s.content}</p>
            </div>
          ))}
        </div>
        </div>
      </section>
    </>
  );
}
