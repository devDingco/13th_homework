export default function Footer({ children, className }) {
  return (
    <>
      <div className="flex-1" />
      <footer
        className={` w-full flex justify-center items-center ${className}`}
      >
        {children}
      </footer>
    </>
  );
}
