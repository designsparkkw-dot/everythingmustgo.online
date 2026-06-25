export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-[#1a1a1a] bg-grid-pattern px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {eyebrow && (
          <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#FFC107]">{eyebrow}</p>
        )}
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-white/60">{description}</p>}
      </div>
    </section>
  );
}
