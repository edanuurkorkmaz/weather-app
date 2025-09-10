type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="flex justify-between items-center p-4 border-b-slate-200 dark:border-b-slate-700">
      <span className="flex gap-2 items-center text-2xl font-bold mb-4">
        <img src="/logo.svg" alt="Weather Now" />
      </span>
    </div>
  );
}
