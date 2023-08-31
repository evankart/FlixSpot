const Button = ({ btnText, btnAction }) => {
  return (
    <button
      className="w-full text-sm bg-teal hover:bg-teal-dark font-medium px-2 h-6 rounded-lg pb-[2px]"
      type="button"
      onClick={btnAction}
    >
      {btnText}
    </button>
  );
};

export default Button;
