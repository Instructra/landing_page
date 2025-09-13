import HomeSection from "./_components/HomeSection";
import AboutSection from "./_components/AboutSection";
import HowItWorks from "./_components/HowItWorksSection";
import JoinWaitlistSection from "./_components/JoinWaitListSection";
export default function Home() {
  return (
    <main>
      {HomeSection()}
      {AboutSection()}
      {HowItWorks()}
      {JoinWaitlistSection()}
    </main>
  );
}
