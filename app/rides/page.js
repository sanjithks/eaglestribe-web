function RideTile({ ride }) {
  if (!ride) return null;

  const { id, title, short_description, documentId } = ride;

  return (
    <div className="bg-foreground rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-2xl">
      <h3 className="text-2xl font-bold text-secondary-brown mb-2">{title}</h3>
      <p className="text-dark-charcoal">{short_description}</p>

      <Link
        href={`/rides/${documentId || id}`}
        className="mt-4 inline-block text-primary-red font-semibold hover:underline"
      >
        Read More...
      </Link>
    </div>
  );
}