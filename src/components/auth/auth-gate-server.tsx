import { currentUser } from "@/lib/next-auth/utils/auth";
import { FormError } from "../form-error";

type AuthGateServerProps = {
  children: React.ReactNode;
  isProtected?: boolean;
};

export default async function AuthGateServer({
  children,
  isProtected = false,
}: AuthGateServerProps) {
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
