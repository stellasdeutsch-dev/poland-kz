import {
  GraduationCap,
  ArrowLeftRight,
  Ban,
  Briefcase,
  Percent,
  IdCard,
  Wallet,
  ShieldCheck,
  Code2,
  TrendingUp,
  Stethoscope,
  Palette,
  LineChart,
  Scale,
  PlaneLanding,
  Home,
  MessagesSquare,
  FileSignature,
  MapPin,
  Star,
  Users,
  Landmark,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  GraduationCap,
  ArrowLeftRight,
  Ban,
  Briefcase,
  Percent,
  IdCard,
  Wallet,
  ShieldCheck,
  Code2,
  TrendingUp,
  Stethoscope,
  Palette,
  LineChart,
  Scale,
  PlaneLanding,
  Home,
  MessagesSquare,
  FileSignature,
  MapPin,
  Star,
  Users,
  Landmark,
};

export default function Icon({
  name,
  size = 24,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Cmp = map[name] ?? GraduationCap;
  return <Cmp size={size} className={className} strokeWidth={2.2} />;
}
