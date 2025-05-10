export default function PageLoader({ size = 40 }) {
  return (
    <div className="flex h-[100svh] justify-center items-center">
      <div
        style={{ width: size, height: size }}
        className={`rounded-full border-2 border-t-transparent border-[var(--secondary-color)] animate-spin`}
      ></div>
    </div>
  );
}
