import { forwardRef } from "react";
import { createIcon, type IconComponent, type IconProps, type IconWeight } from "reicon-react";

export type { IconComponent as Icon, IconProps, IconWeight };

function withDefaultWeight(Icon: IconComponent, defaultWeight: IconWeight): IconComponent {
  const Wrapped = forwardRef<SVGSVGElement, IconProps>(({ weight, ...props }, ref) => (
    <Icon ref={ref} weight={weight ?? defaultWeight} {...props} />
  ));
  Wrapped.displayName = Icon.displayName ?? "Icon";
  return Wrapped as IconComponent;
}

const outline = (icon: IconComponent) => withDefaultWeight(icon, "Outline");
const filled = (icon: IconComponent) => withDefaultWeight(icon, "Filled");

import {
  AlignVertically2 as AlignVertically2Icon,
  ArrowDoorIn as ArrowDoorInIcon,
  ArrowDoorOut3 as ArrowDoorOut3Icon,
  ArrowSwapHorizontal2 as ArrowSwapHorizontal2Icon,
  Award as AwardIcon,
  Bank as BankIcon,
  Banknote as BanknoteIcon,
  BoltLightning as BoltLightningIcon,
  BookOpen as BookOpenIcon,
  Box as BoxIcon,
  Briefcase as BriefcaseIcon,
  Building3 as Building3Icon,
  Buildings2 as Buildings2Icon,
  Calendar as CalendarIconRaw,
  CalendarDays as CalendarDaysIcon,
  Car as CarIcon,
  Card as CardIcon,
  ChartBar as ChartBarIcon,
  ChartBarTrendUp as ChartBarTrendUpIcon,
  Check as CheckIcon,
  CheckCircle as CheckCircleIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronUp as ChevronUpIcon,
  CircleInfo as CircleInfoIcon,
  Clock as ClockIcon,
  ClockCircle as ClockCircleIcon,
  CloseCircle2 as CloseCircle2Icon,
  CloudUpload as CloudUploadIcon,
  Cookie as CookieIcon,
  CreditCard as CreditCardIcon,
  Crown as CrownIcon,
  Download as DownloadIcon,
  Eye as EyeIcon,
  FileText as FileTextIcon,
  ForbiddenCircle as ForbiddenCircleIcon,
  GemSparkle as GemSparkleIcon,
  Globe as GlobeIcon,
  Grid as GridIcon,
  Handshake as HandshakeIcon,
  Home as HomeIcon,
  HomeTrendUp2 as HomeTrendUp2Icon,
  InfoCircle as InfoCircleIcon,
  Instagram2 as Instagram2Icon,
  Iphone as IphoneIcon,
  Key as KeyIcon,
  Leaf as LeafIcon,
  Lightning as LightningIcon,
  Lightbulb3 as Lightbulb3Icon,
  LinkSquare as LinkSquareIcon,
  Loader as LoaderIcon,
  Lock as LockIcon,
  Mailbox as MailboxIcon,
  Map as MapIcon,
  MapPoint as MapPointIcon,
  Menu as MenuIcon,
  MessageCircle2 as MessageCircle2Icon,
  MessageSquare2 as MessageSquare2Icon,
  Monitor as MonitorIcon,
  MoreH as MoreHIcon,
  Package as PackageIcon,
  Phone as PhoneIcon,
  PhoneMedical as PhoneMedicalIcon,
  Plus as PlusIcon,
  Receipt as ReceiptIcon,
  Record as RecordIcon,
  Refresh as RefreshIcon,
  Rocket as RocketIcon,
  Search as SearchIcon,
  SearchMinus as SearchMinusIcon,
  Settings2 as Settings2Icon,
  Share as ShareIcon,
  Shield as ShieldIcon,
  ShieldCheck as ShieldCheckIcon,
  ShieldOff as ShieldOffIcon,
  Sidebar as SidebarIcon,
  Sparkles as SparklesIcon,
  Stop as StopIcon,
  Stethoscope as StethoscopeIcon,
  Sun as SunIcon,
  Target as TargetIcon,
  Truck as TruckIcon,
  Upload as UploadIcon,
  User as UserIcon,
  UserAdd as UserAddIcon,
  UserCheck as UserCheckIcon,
  Users as UsersIcon,
  Users2 as Users2Icon,
  Wallet as WalletIcon,
  X as XIcon,
} from "reicon-react";

/* Outline: search, arrows, chevrons, close/cancel, expand */
export const Search = outline(SearchIcon);
export const SearchMinus = outline(SearchMinusIcon);
export const ArrowSwapHorizontal2 = outline(ArrowSwapHorizontal2Icon);
export const ArrowDoorIn = outline(ArrowDoorInIcon);
export const ArrowDoorOut3 = outline(ArrowDoorOut3Icon);
export const ChevronDown = outline(ChevronDownIcon);
export const ChevronLeft = outline(ChevronLeftIcon);
export const ChevronRight = outline(ChevronRightIcon);
export const ChevronUp = outline(ChevronUpIcon);
export const X = outline(XIcon);
export const Plus = outline(PlusIcon);
export const Menu = outline(MenuIcon);

/* Filled: everything else */
export const AlignVertically2 = filled(AlignVertically2Icon);
export const Award = filled(AwardIcon);
export const Bank = filled(BankIcon);
export const Banknote = filled(BanknoteIcon);
export const BoltLightning = filled(BoltLightningIcon);
export const BookOpen = filled(BookOpenIcon);
export const Box = filled(BoxIcon);
export const Briefcase = filled(BriefcaseIcon);
export const Building3 = filled(Building3Icon);
export const Buildings2 = filled(Buildings2Icon);
export const Calendar = filled(CalendarIconRaw);
export const CalendarDays = filled(CalendarDaysIcon);
export const Car = filled(CarIcon);
export const Card = filled(CardIcon);
export const ChartBar = filled(ChartBarIcon);
export const ChartBarTrendUp = filled(ChartBarTrendUpIcon);
export const Check = filled(CheckIcon);
export const CheckCircle = filled(CheckCircleIcon);
export const CircleInfo = filled(CircleInfoIcon);
export const Clock = filled(ClockIcon);
export const ClockCircle = filled(ClockCircleIcon);
export const CloseCircle2 = filled(CloseCircle2Icon);
export const CloudUpload = filled(CloudUploadIcon);
export const Cookie = filled(CookieIcon);
export const CreditCard = filled(CreditCardIcon);
export const Crown = filled(CrownIcon);
export const Download = filled(DownloadIcon);
export const Eye = filled(EyeIcon);
export const FileText = filled(FileTextIcon);
export const ForbiddenCircle = filled(ForbiddenCircleIcon);
export const GemSparkle = filled(GemSparkleIcon);
export const Globe = filled(GlobeIcon);
export const Grid = filled(GridIcon);
export const Handshake = filled(HandshakeIcon);
export const Home = filled(HomeIcon);
export const HomeTrendUp2 = filled(HomeTrendUp2Icon);
export const InfoCircle = filled(InfoCircleIcon);
export const Instagram2 = filled(Instagram2Icon);
export const Iphone = filled(IphoneIcon);
export const Key = filled(KeyIcon);
export const Leaf = filled(LeafIcon);
export const Lightning = filled(LightningIcon);
export const Lightbulb3 = filled(Lightbulb3Icon);
export const LinkSquare = filled(LinkSquareIcon);
export const Loader = filled(LoaderIcon);
export const Lock = filled(LockIcon);
export const Mailbox = filled(MailboxIcon);
export const Map = filled(MapIcon);
export const MapPoint = filled(MapPointIcon);
export const MessageCircle2 = filled(MessageCircle2Icon);
export const MessageSquare2 = filled(MessageSquare2Icon);
export const Monitor = filled(MonitorIcon);
export const MoreH = filled(MoreHIcon);
export const Package = filled(PackageIcon);
export const Phone = filled(PhoneIcon);
export const PhoneMedical = filled(PhoneMedicalIcon);
export const Receipt = filled(ReceiptIcon);
export const Record = filled(RecordIcon);
export const Refresh = filled(RefreshIcon);
export const Rocket = filled(RocketIcon);
export const Settings2 = filled(Settings2Icon);
export const Share = filled(ShareIcon);
export const Shield = filled(ShieldIcon);
export const ShieldCheck = filled(ShieldCheckIcon);
export const ShieldOff = filled(ShieldOffIcon);
export const Sidebar = filled(SidebarIcon);
export const Sparkles = filled(SparklesIcon);
export const Stop = filled(StopIcon);
export const Stethoscope = filled(StethoscopeIcon);
export const Sun = filled(SunIcon);
export const Target = filled(TargetIcon);
export const Truck = filled(TruckIcon);
export const Upload = filled(UploadIcon);
export const User = filled(UserIcon);
export const UserAdd = filled(UserAddIcon);
export const UserCheck = filled(UserCheckIcon);
export const Users = filled(UsersIcon);
export const Users2 = filled(Users2Icon);
export const Wallet = filled(WalletIcon);

/* ── Lucide-compatible aliases ───────────────────────────── */

export const Building2 = Buildings2;
export const MessageCircle = MessageCircle2;
export const MessageSquare = MessageSquare2;
export const BarChart3 = ChartBar;
export const TrendingUp = ChartBarTrendUp;
export const LayoutGrid = Grid;
export const MoreHorizontal = MoreH;
export const PanelLeft = Sidebar;
export const GripVertical = AlignVertically2;
export const ArrowLeftRight = ArrowSwapHorizontal2;
export const DoorOpen = ArrowDoorOut3;
export const KeyRound = Key;
export const Landmark = Bank;
export const PiggyBank = Banknote;
export const Smartphone = Iphone;
export const UploadCloud = CloudUpload;
export const ArrowLeft = ChevronLeft;
export const ArrowRight = ChevronRight;
export const ArrowUpRight = ChevronRight;
export const CheckCircle2 = CheckCircle;
export const Info = InfoCircle;
export const Loader2 = Loader;
export const SearchX = SearchMinus;
export const CircleStop = Stop;
export const ExternalLink = LinkSquare;
export const MapPin = MapPoint;
export const CalendarIcon = Calendar;
export const Recycle = Refresh;
export const Sprout = HomeTrendUp2;
export const BadgeCheck = Award;
export const Newspaper = BookOpen;
export const Share2 = Share;
export const UserPlus = UserAdd;
export const Instagram = Instagram2;
export const CalendarClock = ClockCircle;
export const Mail = Mailbox;
export const Circle = Record;
export const Dot = Record;
export const Zap = Lightning;
export const Lightbulb = Lightbulb3;

/* ── Brand social icons (not in Reicon) ──────────────────── */

const facebookPaths = {
  F: '<path fill="currentColor" d="M14.5 4H12c-2.2 0-2.5 1.1-2.5 2.5V9H7v3.5h2.5V20h3.5v-7.5H16l.5-3.5h-3V7c0-.8.7-1.5 1.5-1.5H14.5V4z"/>',
  O: '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M14.5 4H12c-2.2 0-2.5 1.1-2.5 2.5V9H7v3.5h2.5V20h3.5v-7.5H16l.5-3.5h-3V7c0-.8.7-1.5 1.5-1.5H14.5V4z"/>',
};

const linkedinPaths = {
  F: '<path fill="currentColor" d="M6.5 9.5h3v10h-3v-10zm1.5-5a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM10.5 9.5h2.9v1.4h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7v5.5h-3v-4.9c0-1.2 0-2.7-1.7-2.7s-2 1.3-2 2.6v5h-3v-10z"/>',
  O: '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M6.5 9.5h3v10h-3v-10zm1.5-5a1.75 1.75 0 110 3.5M10.5 9.5h2.9v1.4h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7v5.5h-3v-4.9c0-1.2 0-2.7-1.7-2.7s-2 1.3-2 2.6v5h-3v-10z"/>',
};

const youtubePaths = {
  F: '<path fill="currentColor" d="M20.2 7.3a2.3 2.3 0 00-1.6-1.5C17.2 5.5 12 5.5 12 5.5s-5.2 0-6.6.3a2.3 2.3 0 00-1.6 1.5 24 24 0 000 9.4 2.3 2.3 0 001.6 1.5c1.4.3 6.6.3 6.6.3s5.2 0 6.6-.3a2.3 2.3 0 001.6-1.5 24 24 0 000-9.4zM10.5 15.2V9.8l5 2.7-5 2.7z"/>',
  O: '<path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M20.2 7.3a2.3 2.3 0 00-1.6-1.5C17.2 5.5 12 5.5 12 5.5s-5.2 0-6.6.3a2.3 2.3 0 00-1.6 1.5a24 24 0 000 9.4 2.3 2.3 0 001.6 1.5c1.4.3 6.6.3 6.6.3s5.2 0 6.6-.3a2.3 2.3 0 001.6-1.5 24 24 0 000-9.4z"/><path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M10.5 15.2V9.8l5 2.7-5 2.7z"/>',
};

export const Facebook = filled(createIcon("Facebook", facebookPaths));
export const Linkedin = filled(createIcon("Linkedin", linkedinPaths));
export const Youtube = filled(createIcon("Youtube", youtubePaths));
