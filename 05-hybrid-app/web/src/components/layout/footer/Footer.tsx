export default function Footer({ children }) {
  return (
    <>
      <div className="flex-1" />
      <footer className="h-60 w-full px-20 pb-96 flex justify-center items-center">
        {children}
      </footer>
    </>
  );
}
