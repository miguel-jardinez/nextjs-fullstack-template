import LanguageSelector from "@template/components/custom/language-selector";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => (
  <>
    <div className="flex flex-col h-screen w-screen bg-muted/50">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        {children}
      </div>
    </div>
  </>
);

export default Layout;
