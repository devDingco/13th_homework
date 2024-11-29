export default function Footer({
  children,
  ...rest
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <>
      <div style={{ flex: 1 }}></div>
      <footer className="w-full p-4" {...rest}>
        {children}
      </footer>
    </>
  );
}
