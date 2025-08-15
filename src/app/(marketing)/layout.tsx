import FooterSection from "@template/modules/marketing/ui/components/footer-section";
import NavigationBar from "@template/modules/marketing/ui/components/navigation-bar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => (
  <div>
    <NavigationBar />
    {children}
    <FooterSection />
  </div>
);

export default MarketingLayout;
