import { useAppStore } from "@/modules/common/store/appStore";
import { CSSProperties, ReactNode } from "react";
import { NavBar } from "./NavBar";

export const BaseLayout = ({
  children,
  style,
  contentStyle,
  contentClassName,
}: {
  children: ReactNode;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  contentClassName?: string;
}) => {
  const appStore = useAppStore();

  return (
    <>
      <section
        style={{ paddingBottom: appStore.navBarHeight + "px", ...style }}
        className="app w-full"
      >
        <main
          className={`h-full w-full overflow-y-auto overflow-x-hidden dark:bg-[#2B312B] ${contentClassName}`}
        >
          <div style={contentStyle} className="h-full w-full">
            {children}
          </div>
        </main>
      </section>
      <NavBar />
    </>
  );
};
