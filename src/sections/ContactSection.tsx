import LinkContainer from "../components/LinkContainer";

export default function ContactSection() {
  const year = new Date().getFullYear();


  return (
    <div className="lg:mx-50" id="Contact">
      <div className="relative flex text-left lg:justify-start items-center ml-4 mb-4 lg:mb-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">
          Contact Me<span className="text-accent text-2xl">.</span>
        </h3>
      </div>
      <div className="mx-5 lg:mx-15">
        <div>
          <h3 className="text-primary text-5xl lg:text-7xl text-center">Get in Touch</h3>
        </div>
        <div className="mt-2 flex justify-center items-center text-lg lg:mx-10">
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
      <div className="flex flex-col text-[12px] text-center lg:text-lg justify-center items-center relative lg:top-25">
        <p>Developed and Designed by Christos Apostolidis</p>
        <p>&copy; {year}. All rights reserved.</p>
      </div>
    </div>
  );
}
