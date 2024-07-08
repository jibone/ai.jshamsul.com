import Layout from "@/ui/Layout";
import Link from "next/link";

export default function Summarize() {
  return (
    <Layout title="Summarise" sideNavItem="Summarize">
      <div className="grid grid-cols-3 gap-4">
        <div className="">
          <Link
            href="/summarize/text"
            className="p-2 rounded-md border border-slate-200 flex group hover:bg-slate-800 hover:border-slate-900"
          >
            <div className="flex-col">
              <div className="font-semibold text-slate-700 group-hover:text-slate-100">
                Text
              </div>
              <div className="text-slate-600 group-hover:text-slate-200">
                Summarise a long text.
              </div>
            </div>
          </Link>
        </div>
        <div className="">
          <Link
            href="/summarize/web"
            className="p-2 rounded-md border border-slate-200 flex group hover:bg-slate-800 hover:border-slate-900"
          >
            <div className="flex-col">
              <div className="font-semibold text-slate-700 group-hover:text-slate-100">
                Webpage
              </div>
              <div className="text-slate-600 group-hover:text-slate-200">
                Summarise a webpage.
              </div>
            </div>
          </Link>
        </div>
        <div className="">
          <Link
            href="/summarize/doc"
            className="p-2 rounded-md border border-slate-200 flex group hover:bg-slate-800 hover:border-slate-900"
          >
            <div className="flex-col">
              <div className="font-semibold text-slate-700 group-hover:text-slate-100">
                Documents
              </div>
              <div className="text-slate-600 group-hover:text-slate-200">
                Summarise a document.
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
