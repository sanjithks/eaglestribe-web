export default function HomePage() {
  return (
    <section className="bg-background text-foreground min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
      <div className="max-w-3xl">
        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to <span className="text-primary">Eagles Tribe MC</span>
        </h1>
        <p className="text-lg text-secondary mb-8">
          Brotherhood. Adventure. Legacy. Experience motorcycle culture across the Emirates with a tribe that lives for the ride.
        </p>
        <a
          href="/rides"
          className="inline-block px-8 py-3 rounded-full bg-primary text-white font-semibold hover:bg-opacity-90 transition"
        >
          View Rides
        </a>
      </div>
    </section>
  );
}