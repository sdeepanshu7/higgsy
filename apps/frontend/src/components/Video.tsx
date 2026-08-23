export function Video({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  return (
    <div className="group overflow-hidden bg-neutral-900">
      <video
        src={url}
        autoPlay
        muted
        loop
        playsInline
        className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="p-1">
        <h3 className="text-white font-small">
          {title}
        </h3>
      </div>
    </div>
  );
}