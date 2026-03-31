export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`footer { display: none !important; }`}</style>
      {children}
    </>
  );
}
