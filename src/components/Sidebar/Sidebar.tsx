import { ReactNode } from "react";

interface SidebarProps {
  children: ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <aside className="border-secondary bg-secondary/10 relative h-screen w-1/3 min-w-32 overflow-hidden border-r p-5 lg:w-1/4">
      {children}
    </aside>
  );
};
