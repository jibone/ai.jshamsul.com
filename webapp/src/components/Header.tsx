import { SparklesIcon } from "@heroicons/react/24/solid";

export default function Header() {
  return (
    <header className="pt-20 px-10 flex-none">
      <div className="flex gap-2">
        <SparklesIcon className="h-6 w-6 text-purple-500" />
        <div className="text-black mb-2">
          <a href="/" className="relative z-50">
            ai.jShamsul.com
          </a>
        </div>
      </div>
    </header>
  );
}
