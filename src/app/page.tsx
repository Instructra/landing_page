export default async function Home() {
  return (
    <main>
      <section
        id="home"
        className="flex h-screen items-center justify-center bg-white"
      >
        <div className="max-sm max-tb max-l max-ll bg-primary block">
          <h1 className="text-5xl font-bold">Home Section</h1>
        </div>
      </section>

      <section
        id="about"
        className="flex h-screen items-center justify-center bg-white"
      >
        <h2 className="text-4xl font-semibold">About </h2>
      </section>

      <section
        id="how"
        className="flex h-screen items-center justify-center bg-white"
      >
        <h2 className="text-4xl font-semibold">How it works</h2>
      </section>

      <section
        id="contact"
        className="flex h-screen items-center justify-center bg-white"
      >
        <h2 className="text-4xl font-semibold">Contact Section</h2>
      </section>
    </main>
  );
}
