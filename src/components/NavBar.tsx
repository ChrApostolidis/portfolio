import { useEffect, useState } from "react";
import MainButton from "./MainButton";
import BurgerButton from "./BurgerButton";

interface NavBarProps {
  onNavigate?: (sectionId: string) => void;
}

export default function NavBar({ onNavigate }: NavBarProps) {
  const [isSticky, setIsSticky] = useState(false);
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
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

  return (
    <>
      <div className={`flex items-center justify-center`}>
        <header
          className={`z-50 fixed top-0 lg:top-3 flex justify-center items-center w-full max-w-210
             `}
        >
          <div
            className={`${isSticky ? "border-border-soft" : "border-transparent"} transition-all duration-500 lg:border 
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
              <a
                href="#About"
                onClick={(e) => handleNavClick(e, "About")}
                className="text-main-text hover:text-primary lg:text-xl"
              >
                About
              </a>
              <a
                href="#Skills"
                onClick={(e) => handleNavClick(e, "Skills")}
                className="text-main-text hover:text-primary lg:text-xl cursor-pointer"
              >
                Skills
              </a>
              <a
                href={"/"}
                className="text-main-text hover:text-primary lg:text-xl"
              >
                Projects
              </a>
              <a
                href="#Contact"
                onClick={(e) => handleNavClick(e, "Contact")}
                className="text-main-text hover:text-primary lg:text-xl cursor-pointer"
              >
                Contact
              </a>
            </nav>
            <div className="hidden md:block lg:block">
              <MainButton>Resume</MainButton>
            </div>
            <div className="md:hidden flex justify-end">
              <BurgerButton />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
