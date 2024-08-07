export default function Footer() {
  return (
    <footer className="mt-2 py-5 px-10 font-iaWriterQuattro flex-none text-sm">
      <div className="flex gap-2 text-slate-400">
        <div>&copy; 2024</div>
        <a
          href="https://jshamsul.com"
          className="text-slate-500 hover:text-black hover:underline hover:underline-offset-2 hover:decoration-2 hover:decoration-purple-500"
        >
          jshamsul.com
        </a>
        <span>/</span>
        <a
          href="https://x.com/jibone"
          className="text-slate-500 hover:text-black hover:underline hover:underline-offset-2 hover:decoration-2 hover:decoration-purple-500"
        >
          X
        </a>
        <span>/</span>
        <a
          href="https://github.com/jibone/ai.jshamsul.com"
          className="text-slate-500 hover:text-black hover:underline hover:underline-offset-2 hover:decoration-2 hover:decoration-purple-500"
        >
          Github
        </a>
      </div>
    </footer>
  );
}
