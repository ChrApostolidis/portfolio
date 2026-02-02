interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const MainButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "cursor-pointer mr-8 border-2 rounded-xl px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50 cursor-pointer font-semibold py-2 px-6 rounded-lg shadow-md";

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${className}`}
    >
      {children}
    </button>
  );
};

export default MainButton;
