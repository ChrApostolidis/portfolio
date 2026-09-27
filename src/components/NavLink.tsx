interface NavLinkProps {
  handleNavClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => void;
  sectionId: string;
  isActive: boolean;
}

export default function NavLink({
  handleNavClick,
  sectionId,
  isActive,
}: NavLinkProps) {
  return (
    <a
      href={`#${sectionId}`}
      onClick={(e) => handleNavClick(e, sectionId)}
      aria-current={isActive ? "true" : undefined}
      className={`relative pb-2 lg:text-xl hover:text-white
                after:absolute after:bottom-0
                after:h-0.5 after:bg-primary
                after:transition-all after:duration-300
                hover:after:w-full hover:after:left-0
                ${isActive ? "text-white after:w-full after:left-0" : "text-gray-300 after:w-0 after:left-1/2"}`}
    >
      {sectionId}
    </a>
  );
}
