import Header from "./Header";
import SideNav from "./SideNav";

export default function Layout({
  children,
  title,
  sideNavItem,
}: {
  children: React.ReactNode;
  title: string;
  sideNavItem: string;
}) {
  return (
    <>
      <div className="h-full flex flex-col">
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <SideNav currentItem={sideNavItem} />
        </div>

        <Header title={title} sideNavItem={sideNavItem} />

        <div className="lg:pl-72 flex-grow h-full">
          <main className="py-10 h-full">
            <div className="px-4 h-full sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
