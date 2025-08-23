"use client";
// Footer.tsx
import MainContainer from "./MainContainer";
import { ContactForm } from "./ContactForm";
import StarParticles from "./StartParticles";

export default function Footer() {
  return (
    <footer>
      <section
        id="contact"
        className="bg-dark-bg flex flex-col items-center justify-center pb-20"
      >
        <StarParticles></StarParticles>
        <MainContainer>
          <div className="l:flex-row z-1 flex w-full flex-col gap-16">
            {/* Left: Contact info */}
            <div className="flex flex-1 flex-col gap-8">
              <h2 className="text-start text-4xl font-semibold text-white">
                Let’s talk
              </h2>
              <p className="text-[16px]/6 text-white">
                Have questions or ideas? We are happy to hear from you.
              </p>
              <div className="flex flex-col gap-4">
                <p className="flex gap-4 text-[16px]/6 text-white">
                  ✉️ info@instructra.com
                </p>
                <p className="flex gap-4 text-[16px]/6 text-white">
                  📍 7 Ludgate Hill, London, England, EC4M 7JN
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <ContactForm />
          </div>
        </MainContainer>
      </section>
    </footer>
  );
}
