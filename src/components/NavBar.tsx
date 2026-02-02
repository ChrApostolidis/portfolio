import { useEffect, useState } from "react";
import MainButton from "./MainButton";
import BurgerButton from "./BurgerButton";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import NavLink from "./NavLink";

interface NavBarProps {
  onNavigate?: (sectionId: string) => void;
}

export default function NavBar({ onNavigate }: NavBarProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    e.preventDefault();
    onNavigate?.(sectionId);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  return (
    <>
      <div className={`flex items-center justify-center`}>
        <header
          className={`z-50 fixed top-0 lg:top-3 flex justify-center items-center w-full max-w-210
             `}
        >
          <div
            className={`${isSticky ? "border-white/40" : "border-transparent"} transition-all duration-500 lg:border 
            rounded-3xl p-2 flex justify-between items-center w-full 
            lg:justify-center lg:space-x-20`}
          >
            <div>
              <a
                href="#Hero"
                onClick={(e) => handleNavClick(e, "Hero")}
                className="lg:ml-20 h-15 w-25 lg:w-30 transition hover:scale-110 flex items-center justify-center"
              >
                <img
                  src="/PortfolioLogo.png"
                  className="transition duration-300 group-hover:brightness-110 group-hover:contrast-125"
                  alt="portfolio logo"
                />
              </a>
            </div>
            <nav className="hidden md:flex lg:flex items-center gap-4">
              <NavLink handleNavClick={handleNavClick} sectionId="About" />
              <NavLink handleNavClick={handleNavClick} sectionId="Skills" />
              <NavLink handleNavClick={handleNavClick} sectionId="Projects" />
              <NavLink handleNavClick={handleNavClick} sectionId="Contact" />
            </nav>
            <div className="hidden md:block lg:block">
              <MainButton className="border-white/50 hover:text-black hover:bg-primary/90 hover:border-primary">Resume</MainButton>
            </div>
            <div
              className={`md:hidden flex justify-end ${isMenuOpen ? "z-10" : ""}`}
            >
              <BurgerButton
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </div>
          </div>
        </header>
      </div>
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-10 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="z-10 fixed right-0 top-0 h-screen w-[72vw] bg-[#030408] border border-white/30 p-4 flex flex-col justify-between gap-4 md:hidden"
            >
              <div className="flex">
                <MainButton>Resume</MainButton>
              </div>
              <nav className="flex flex-col text-left text-3xl gap-4">
                <a
                  href="#Hero"
                  onClick={(e) => {
                    handleNavClick(e, "Hero");
                    setIsMenuOpen(false);
                  }}
                  className="text-main-text hover:text-primary"
                >
                  Home
                </a>
                <a
                  href="#About"
                  onClick={(e) => {
                    handleNavClick(e, "About");
                    setIsMenuOpen(false);
                  }}
                  className="text-main-text hover:text-primary"
                >
                  About
                </a>
                <a
                  href="#Skills"
                  onClick={(e) => {
                    handleNavClick(e, "Skills");
                    setIsMenuOpen(false);
                  }}
                  className="text-main-text hover:text-primary"
                >
                  Skills
                </a>
                <a
                  href="#Projects"
                  onClick={(e) => {
                    handleNavClick(e, "Projects");
                    setIsMenuOpen(false);
                  }}
                  className="text-main-text hover:text-primary"
                >
                  Projects
                </a>
                <a
                  href="#Contact"
                  onClick={(e) => {
                    handleNavClick(e, "Contact");
                    setIsMenuOpen(false);
                  }}
                  className="text-main-text hover:text-primary"
                >
                  Contact
                </a>
              </nav>
              <div className="flex justify-center items-center gap-8">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/ChrApostolidis"
                >
                  <FaGithub
                    size={30}
                    className="hover:text-primary cursor-pointer"
                  />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/xristos-apostolidis-5aa0912ab/"
                >
                  <FaLinkedin
                    size={30}
                    className="hover:text-primary cursor-pointer"
                  />
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="mailto:xrsapostolidis@gmail.com"
                >
                  <MdEmail
                    size={30}
                    className="hover:text-primary cursor-pointer"
                  />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
