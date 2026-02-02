interface NavLinkProps {
  handleNavClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => void;
  sectionId: string;
}

export default function NavLink({ handleNavClick, sectionId }: NavLinkProps) {
  return (
    <a
      href={`#${sectionId}`}
      onClick={(e) => handleNavClick(e, sectionId)}
      className="relative pb-2 lg:text-xl text-gray-300 hover:text-white
                after:absolute after:bottom-0 after:left-1/2
                after:h-0.5 after:w-0 after:bg-primary
                after:transition-all after:duration-300
                hover:after:w-full hover:after:left-0"
    >
      {sectionId}
    </a>
  );
}
