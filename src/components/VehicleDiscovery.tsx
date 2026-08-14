const BRANDS = [
  { name: "Honda", logo: "/brands/honda.svg" },
  { name: "Toyota", logo: "/brands/toyota.svg" },
  { name: "Suzuki", logo: "/brands/suzuki.svg" },
  { name: "Nissan", logo: "/brands/nissan.svg" },
  { name: "Mitsubishi", logo: "/brands/mitsubishi.svg" },
  { name: "Daihatsu", logo: "/brands/daihatsu.svg" },
];

const TYPES = ["Hatchback", "MPV", "SUV", "Sedan", "Wagon", "Pickup"] as const;

function VehicleIcon({ type }: { type: (typeof TYPES)[number] }) {
  const common = "fill-none stroke-current stroke-[1.8]";

  if (type === "Hatchback") {
    return <svg viewBox="0 0 64 32" aria-hidden><path className={common} d="M7 22h3l4-9 8-5h17l11 9 5 2v3h-4M14 22h30M18 22a4 4 0 1 0 8 0m15 0a4 4 0 1 0 8 0M17 13h24l7 5H12" /></svg>;
  }
  if (type === "MPV") {
    return <svg viewBox="0 0 64 32" aria-hidden><path className={common} d="M6 22h4l3-11 7-4h24l8 8 5 3v4h-5M14 22h34M17 22a4 4 0 1 0 8 0m19 0a4 4 0 1 0 8 0M14 12h31l6 6H11" /></svg>;
  }
  if (type === "SUV") {
    return <svg viewBox="0 0 64 32" aria-hidden><path className={common} d="M6 22h4l4-11 8-5h22l10 10 4 2v4h-5M14 22h35M18 22a4 4 0 1 0 8 0m19 0a4 4 0 1 0 8 0M15 12h30l7 6H11" /></svg>;
  }
  if (type === "Sedan") {
    return <svg viewBox="0 0 64 32" aria-hidden><path className={common} d="M5 22h6l5-8 10-6h16l8 7 8 3v4h-6M14 22h34M18 22a4 4 0 1 0 8 0m18 0a4 4 0 1 0 8 0M16 14h34l5 4H10" /></svg>;
  }
  if (type === "Wagon") {
    return <svg viewBox="0 0 64 32" aria-hidden><path className={common} d="M5 22h5l4-10 8-5h27l6 9 4 2v4h-6M14 22h35M18 22a4 4 0 1 0 8 0m19 0a4 4 0 1 0 8 0M15 12h34l5 6H10" /></svg>;
  }
  return <svg viewBox="0 0 64 32" aria-hidden><path className={common} d="M5 22h7l3-8h9l4-7h12l5 7h13v8h-5M15 22h34M18 22a4 4 0 1 0 8 0m20 0a4 4 0 1 0 8 0M28 14h17" /></svg>;
}

export default function VehicleDiscovery() {
  return (
    <>
      <div className="mt-4 flex gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {BRANDS.map((brand) => (
          <a key={brand.name} href="#katalog" className="w-16 shrink-0 text-center">
            <span className="mx-auto flex h-10 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="max-h-8 max-w-11 object-contain"
              />
            </span>
            <span className="mt-1.5 block text-[11px] text-ink">{brand.name}</span>
          </a>
        ))}
      </div>

      <div className="mt-4 flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TYPES.map((type) => (
          <a key={type} href="#katalog" className="w-16 shrink-0 text-center text-navy">
            <span className="mx-auto block h-9 w-14">
              <VehicleIcon type={type} />
            </span>
            <span className="mt-1 block text-[11px] text-ink">{type}</span>
          </a>
        ))}
      </div>
    </>
  );
}
