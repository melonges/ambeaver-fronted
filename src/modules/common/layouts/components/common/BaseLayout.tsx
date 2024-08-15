import { CSSProperties, ReactNode } from "react";
import { NAVBAR_HEIGHT } from "../../constants";
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
  return (
    <>
      <section
        style={{ paddingBottom: NAVBAR_HEIGHT + "px", ...style }}
        className="app w-full"
      >
        <main
          className={`h-full w-full overflow-y-auto overflow-x-hidden ${contentClassName}`}
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
