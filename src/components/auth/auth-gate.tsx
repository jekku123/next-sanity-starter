import { currentUser } from "@/lib/next-auth/utils/auth";
import { FormError } from "../form-error";

type AuthGateProps = {
  children: React.ReactNode;
  isProtected?: boolean;
};

export default async function AuthGate({
  children,
  isProtected = false,
}: AuthGateProps) {
  if (!isProtected) {
    return <>{children}</>;
  }

  const user = await currentUser();

  if (!user) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
}
