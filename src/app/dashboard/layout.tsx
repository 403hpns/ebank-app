import Container from "<app>/components/ui/Container";
import Sidebar from "<app>/components/nav/dashboard/Sidebar";

export const metadata = {
  title: "e-Bank | Dashboard",
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      center
      className="flex min-w-[40%] max-w-[60%] flex-row overflow-hidden rounded-lg bg-white p-4"
    >
      <Sidebar />
      <div className="mx-12 flex">{children}</div>
    </Container>
  );
};

export default layout;
