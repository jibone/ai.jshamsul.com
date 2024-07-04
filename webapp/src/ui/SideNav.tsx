"use client";

import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  BarsArrowDownIcon,
  PhotoIcon,
  ArrowPathRoundedSquareIcon,
  PencilSquareIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Chat",
    href: "/chat",
    icon: ChatBubbleLeftRightIcon,
    current: false,
  },
  {
    name: "Summarize",
    href: "/summarize",
    icon: BarsArrowDownIcon,
    current: false,
  },
  {
    name: "Write",
    href: "/write",
    icon: PencilSquareIcon,
    current: false,
  },
  { name: "Image", href: "/image", icon: PhotoIcon, current: false },
  {
    name: "Workflow",
    href: "/workflow",
    icon: ArrowPathRoundedSquareIcon,
    current: false,
  },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SideNav({ currentItem }: { currentItem: string }) {
  const isCurrentItem = (name: string): boolean => {
    return name === currentItem;
  };
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-200 px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center text-slate-600">
        <SparklesIcon className="h-8 w-8 text-purple-500" />{" "}
        <span className="ml-2 leading-relaxed font-semibold">
          ai.jshamsul.com
        </span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      isCurrentItem(item.name)
                        ? "bg-slate-500 text-slate-200"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-600",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                    )}
                  >
                    <item.icon
                      className={classNames(
                        isCurrentItem(item.name)
                          ? "text-slate-200"
                          : "text-slate-600 group-hover:text-slate-600",
                        "h-6 w-6 shrink-0",
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          <li className="mt-auto">
            <a
              href="/settings"
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-slate-600 hover:bg-slate-100 hover:text-slate-600"
            >
              <Cog6ToothIcon
                className="h-6 w-6 shrink-0 text-slate-600 group-hover:text-slate-600"
                aria-hidden="true"
              />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
