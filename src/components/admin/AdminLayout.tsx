import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BarChart3,
  ShoppingBag,
  Ticket,
  Zap,
  Image as ImageIcon,
  LayoutGrid,
  HelpCircle,
  Star,
  Search,
  Map,
  Users,
  LifeBuoy,
  Activity,
  ShieldCheck,
  ScrollText,
  HeartPulse,
  Flag,
  DatabaseZap,
  ListOrdered,
  HardDriveDownload,
  ChevronLeft,
  Bell,
  Plane,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type NavItem = { title: string; to: string; icon: React.ElementType; badge?: string };

const COMMERCE: NavItem[] = [
  { title: "Дашборд", to: "/admin", icon: LayoutDashboard },
  { title: "Аналитика", to: "/admin/analytics", icon: BarChart3 },
  { title: "Заказы", to: "/admin/orders", icon: ShoppingBag, badge: "12" },
  { title: "Промокоды", to: "/admin/promocodes", icon: Ticket },
  { title: "Flash-продажи", to: "/admin/flash", icon: Zap },
];

const CONTENT: NavItem[] = [
  { title: "Баннеры", to: "/admin/banners", icon: ImageIcon },
  { title: "Категории", to: "/admin/categories", icon: LayoutGrid },
  { title: "FAQ", to: "/admin/faq", icon: HelpCircle },
  { title: "Отзывы", to: "/admin/reviews", icon: Star },
  { title: "SEO", to: "/admin/seo", icon: Search },
  { title: "Sitemap", to: "/admin/sitemap", icon: Map },
];

const COMMUNITY: NavItem[] = [
  { title: "Пользователи", to: "/admin/users", icon: Users },
  { title: "Тикеты", to: "/admin/tickets", icon: LifeBuoy, badge: "3" },
];

const OPS: NavItem[] = [
  { title: "Мониторинг", to: "/admin/monitoring", icon: Activity },
  { title: "Безопасность", to: "/admin/security", icon: ShieldCheck },
  { title: "Журнал действий", to: "/admin/logs", icon: ScrollText },
  { title: "Health Check", to: "/admin/health", icon: HeartPulse },
  { title: "Feature Flags", to: "/admin/flags", icon: Flag },
  { title: "Кэш", to: "/admin/cache", icon: DatabaseZap },
  { title: "Очередь", to: "/admin/queue", icon: ListOrdered },
  { title: "Бэкапы", to: "/admin/backups", icon: HardDriveDownload },
];

function SectionNav({ label, items }: { label: string; items: NavItem[] }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  return (
    <SidebarGroup>
      {!collapsed && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = item.to === "/admin" ? pathname === "/admin" : pathname === item.to;
            return (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                  <Link to={item.to} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 truncate">{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto rounded-full bg-coral px-1.5 py-0.5 text-[10px] font-semibold text-white">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/admin" className="flex items-center gap-2 px-2 py-1.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-ocean to-ocean/70 text-white">
            <Plane className="h-4 w-4" />
          </span>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate font-display text-sm font-bold leading-none">JetSale</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">Админ-панель</div>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SectionNav label="Коммерция" items={COMMERCE} />
        <SectionNav label="Контент" items={CONTENT} />
        <SectionNav label="Сообщество" items={COMMUNITY} />
        <SectionNav label="Эксплуатация" items={OPS} />
      </SidebarContent>
    </Sidebar>
  );
}

export function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-6">
            <SidebarTrigger />
            <Link
              to="/"
              className="hidden items-center gap-1 text-xs text-muted-foreground hover:text-foreground md:inline-flex"
            >
              <ChevronLeft className="h-3.5 w-3.5" /> На сайт
            </Link>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Поиск…" className="h-9 w-64 pl-8" />
              </div>
              <Button size="icon" variant="ghost" aria-label="Уведомления" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-coral" />
              </Button>
              <div className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1 pr-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-ocean to-coral text-xs font-semibold text-white">
                  АД
                </span>
                <div className="hidden text-xs leading-tight md:block">
                  <div className="font-semibold">Администратор</div>
                  <div className="text-muted-foreground">admin@jetsale.online</div>
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}