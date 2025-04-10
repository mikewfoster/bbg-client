import Game from "@/components/extras/Game";

export default function DashboardLayout({ children }) {

  return (
      <>
          {children}
          <Game />
      </>
  );
}
