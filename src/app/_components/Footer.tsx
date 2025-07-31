import { Buttons, ButtonType } from "./Buttons";
import MainContainer from "./MainContainer";

export default function Footer() {
  return (
    <footer>
      <section
        id="contact"
        className="bg-dark-bg flex flex-col items-center justify-center pb-20"
      >
        <MainContainer>
          <div className="l:flex-row l:fle flex w-full flex-col gap-16">
            {/* header group */}
            <div className="flex flex-1 flex-col gap-8">
              <h2 className="text-start text-4xl font-semibold text-white">
                Let’s talk
              </h2>
              <p className="text-[16px]/6 text-white">
                Have questions or ideas? We are happy to hear from you.
              </p>
              {/* contact info group */}
              <div className="flex flex-col gap-4">
                <p className="flex gap-4 text-[16px]/6 text-white">
                  <i>📞</i> +44 123 456 7890
                </p>
                <p className="flex gap-4 text-[16px]/6 text-white">
                  <i>✉️</i>hello@instructra.com
                </p>
                <p className="flex gap-4 text-[16px]/6 text-white">
                  <i>📍</i>
                  5th Floor, 123 Maplewood Drive, Manchester, M14 6AQ, United
                  Kingdom
                </p>
              </div>
            </div>
            {/*  */}
            {/* form group */}
            <form action=" " className="flex flex-1 flex-col gap-8">
              {/* text input group */}
              <div className="flex flex-col gap-6">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter your name"
                  className="bg-dart-input-bg placeholder-placeholder w-full rounded-full p-4 text-white"
                />
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="Enter your email address"
                  className="bg-dart-input-bg placeholder-placeholder w-full rounded-full p-4 text-white"
                />
                <textarea
                  name=""
                  id=""
                  rows={5}
                  minLength={5}
                  placeholder="Type your message"
                  className="bg-dart-input-bg placeholder-placeholder w-full rounded-2xl p-4 text-white"
                ></textarea>
              </div>
              {/* selectors */}
              <div className="flex flex-col gap-8">
                <p className="text-2xl text-white">What user type are you?</p>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="user_type"
                      id="instructor"
                      className="bg-transparent"
                    />
                    <label htmlFor="learner" className="text-white">
                      Instructor
                    </label>
                  </div>{" "}
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="user_type"
                      id="learner"
                      className="bg-transparent"
                    />
                    <label htmlFor="learner" className="text-white">
                      Learner
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      name="user_type"
                      id="driving_school"
                      className="bg-transparent"
                    />
                    <label htmlFor="driving_school" className="text-white">
                      Driving School
                    </label>
                  </div>
                </div>
              </div>
              {/* submit button */}
              <div className="flex w-full justify-center">
                <Buttons
                  text={"Submit message"}
                  buttonType={ButtonType.Primary}
                  iconText={null}
                  classNames={"w-full"}
                />
              </div>
            </form>
            {/* banner group */}
          </div>
        </MainContainer>
        <div>
          <p className="tb:pt-14 tb:text-[150px]/[170px] l:text-[246px] pt-4 text-center text-7xl text-white">
            Instructra
          </p>
        </div>
      </section>
    </footer>
  );
}
