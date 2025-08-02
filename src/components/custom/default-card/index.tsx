import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@template/components/ui/card";

type AuthCardProps = {
  children: React.ReactNode;
  title: string;
  description: string;
  logo?: React.ReactNode;
};

const AuthCard = ({ children, title, description, logo }: AuthCardProps) => (
  <>
    {logo && (
      <div className="flex items-center justify-center mb-8">{logo}</div>
    )}
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  </>
);

export default AuthCard;
