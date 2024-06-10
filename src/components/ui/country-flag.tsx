import { cn } from "@/lib/utils";
import Flags from "country-flag-icons/react/3x2";

type CountryFlagProps = {
  title?: string;
  countryCode: string;
  className?: string;
};

export const CountryFlag = ({
  title,
  countryCode,
  className,
}: CountryFlagProps) => {
  const FlagComponent = Flags[countryCode.toUpperCase() as keyof typeof Flags];
  return <FlagComponent title={title} className={cn("mx-2 w-5", className)} />;
};
