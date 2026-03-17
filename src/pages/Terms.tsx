import Seo from "@/components/Seo";

const sections = [
  { title: "1. Acceptance of Terms", content: "By accessing or using Instructra, you agree to be bound by these terms. If you do not agree, you may not use our services." },
  { title: "2. The Service", content: "Instructra provides a platform connecting driving learners with qualified instructors. We facilitate bookings and communication but do not provide driving instruction directly." },
  { title: "3. Accounts", content: "You must provide accurate information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activity under your account." },
  { title: "4. Instructor Obligations", content: "Instructors are responsible for ensuring they hold valid ADI qualifications, appropriate insurance, and comply with all applicable regulations. Instructra does not verify credentials beyond what is stated." },
  { title: "5. Bookings & Cancellations", content: "Bookings are subject to the cancellation policy set by each instructor. Learners and instructors agree to the applicable policy at the time of booking." },
  { title: "6. Payments & Subscriptions", content: "Instructor subscriptions are billed monthly at the rate shown at sign-up. We do not take commission on lessons. You may cancel your subscription at any time." },
  { title: "7. Acceptable Use", content: "You agree not to misuse the platform, including but not limited to: submitting false information, harassing other users, or using the platform for unlawful purposes." },
  { title: "8. Limitation of Liability", content: "To the extent permitted by law, Instructra's liability is limited to the fees paid by you in the 12 months preceding the claim. We are not liable for the quality of driving instruction." },
  { title: "9. Termination", content: "We may suspend or terminate your access to Instructra if you breach these terms. You may delete your account at any time." },
  { title: "10. Governing Law", content: "These terms are governed by the laws of England and Wales." },
  { title: "11. Contact", content: "For legal enquiries, email hello@instructra.com." },
];

export default function Terms() {
  // SEO handled via <Seo> in JSX return

  return (
    <>
      <Seo title="Terms of Service | Instructra" description="Terms and conditions governing your use of Instructra." path="/terms" />
      <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-display-lg">Terms of Service</h1>
        <p className="mt-4 text-body text-muted-foreground">Last updated: February 2026</p>
        <p className="mt-6 text-body text-muted-foreground">
          These terms govern your use of the Instructra platform and services operated by Instructra Ltd.
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
