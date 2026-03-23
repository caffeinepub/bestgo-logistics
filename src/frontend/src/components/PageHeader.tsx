interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

export default function PageHeader({
  title,
  subtitle,
  breadcrumb,
}: PageHeaderProps) {
  return (
    <div className="bg-brand-navy pt-24 pb-16 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, oklch(0.72 0.19 48) 0px, oklch(0.72 0.19 48) 1px, transparent 1px, transparent 60px)",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        {breadcrumb && (
          <p className="text-white/50 text-sm font-body mb-2">{breadcrumb}</p>
        )}
        <h1 className="font-display font-bold text-white text-4xl md:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-white/70 font-body text-lg max-w-2xl">
            {subtitle}
          </p>
        )}
        <div className="mt-4 w-16 h-1 bg-brand-orange rounded-full" />
      </div>
    </div>
  );
}
