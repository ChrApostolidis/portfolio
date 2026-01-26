import LinkContainer from "../components/LinkContainer";

export default function ContactSection() {
  return (
    <div className="mx-50" id="Contact">
      <div className="relative flex justify-start items-center mb-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          Contact Me<span className="text-accent text-2xl">.</span>
        </h3>
      </div>
      <div className="mx-15">
        <div>
          <h3 className="text-primary text-5xl lg:text-7xl text-center">Get in Touch</h3>
        </div>
        <div className="mt-2 flex justify-center items-center text-lg mx-10">
          <p>
            I&apos;m currently open to new opportunities and collaborations. If you&apos;re
            interested in my work or think I&apos;d be a good fit for your team, I&apos;d be
            happy to connect.
          </p>
        </div>
        <div>
          <LinkContainer />
        </div>
      </div>
    </div>
  );
}
