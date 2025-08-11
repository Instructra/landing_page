// Footer.tsx
import { Buttons, ButtonType } from "./Buttons";
import MainContainer from "./MainContainer";
import { EmailTemplate, type EmailTemplateProps } from "./emailTemplate";
import { Resend } from "resend";

async function sendEmail(formData: FormData): Promise<void> {
  "use server";
  const resend = new Resend(process.env.RESEND);

  const emailProp: EmailTemplateProps = {
    email: formData.get("email") as string,
    senderName: formData.get("name") as string,
    message: formData.get("message") as string,
    userType: formData.get("user_type") as string,
  };

  try {
    const { error } = await resend.emails.send({
      from: emailProp.email,
      to: ["abdulbasit@instructra.com"],
      subject: "New Contact Form Submission",
      react: EmailTemplate(emailProp),
    });

    if (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
}

export default function Footer() {
  return (
    <footer>
      <section
        id="contact"
        className="bg-dark-bg flex flex-col items-center justify-center pb-20"
      >
        <MainContainer>
          <div className="l:flex-row flex w-full flex-col gap-16">
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
                  📞 +44 123 456 7890
                </p>
                <p className="flex gap-4 text-[16px]/6 text-white">
                  ✉️ hello@instructra.com
                </p>
                <p className="flex gap-4 text-[16px]/6 text-white">
                  📍 5th Floor, 123 Maplewood Drive, Manchester, M14 6AQ, United
                  Kingdom
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <form action={sendEmail} className="flex flex-1 flex-col gap-8">
              <div className="flex flex-col gap-6">
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="bg-dark-input-bg w-full rounded-full p-4 text-white"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-dark-input-bg w-full rounded-full p-4 text-white"
                  required
                />
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Type your message"
                  className="bg-dark-input-bg w-full rounded-2xl p-4 text-white"
                  required
                />
              </div>

              {/* User type */}
              <div className="flex flex-col gap-8">
                <p className="text-2xl text-white">What user type are you?</p>
                {["Instructor", "Learner", "Driving School"].map((type) => (
                  <label key={type} className="flex gap-2 text-white">
                    <input
                      type="radio"
                      name="user_type"
                      value={type}
                      required
                    />{" "}
                    {type}
                  </label>
                ))}
              </div>

              <div className="flex w-full justify-center">
                <Buttons
                  text="Submit message"
                  buttonType={ButtonType.Primary}
                  iconText=""
                  classNames="w-full"
                  clickEvent={null}
                />
              </div>
            </form>
          </div>
        </MainContainer>
      </section>
    </footer>
  );
}
