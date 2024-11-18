export default function ChatTitle({ title, infoPage }: { title: string; infoPage: string }) {
  return (
    <div className="mb-5 flex gap-4">
      <h1 className="text-black font-semibold py-1">
        {title}
      </h1>
      <a
        href={infoPage}
        className="text-sm py-1 px-2 border border-slate-200 bg-slate-100 rounded-lg hover:bg-slate-900 hover:text-slate-100"
      >
        More Info
      </a>
    </div>
  )
}
