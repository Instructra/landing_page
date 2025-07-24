export default function MainContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mm:w(--max-mm) ml:w-(--max-ml) tb:w-(--max-tb) tb:justify-center l:w-(--max-l) ll:w-(--max-ll) flex w-(--max-sm) flex-col pb-8">
      {children}
    </div>
  );
}
