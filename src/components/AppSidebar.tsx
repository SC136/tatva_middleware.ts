import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChartBar as BarChart3, Package, Wallet, FileText, Settings, CircleHelp as HelpCircle, BookOpen, TriangleAlert as AlertTriangle, CreditCard, Chrome as Home, LogOut, User, ChevronUp, Sparkles, Database, Zap, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useStats } from '@/hooks/useStorage';
import { LanguageSwitcher } from './LanguageSwitcher';
import { usePreferences } from '@/contexts/PreferencesContext';
import { useTranslations, type Language } from '@/lib/translations';

const navigationItems = [
  {
    titleKey: 'dashboard' as const,
    url: '/dashboard',
    icon: Home,
    isActive: true,
  },
  {
    titleKey: 'smartAssistant' as const,
    url: '/assistant',
    icon: Sparkles,
    badge: 'new' as const,
  },
  {
    titleKey: 'transactions' as const,
    url: '/transactions',
    icon: Wallet,
  },
  {
    titleKey: 'inventory' as const,
    url: '/inventory',
    icon: Package,
  },
  {
    titleKey: 'analytics' as const,
    url: '/analytics',
    icon: BarChart3,
  },
  {
    titleKey: 'reports' as const,
    url: '/reports',
    icon: FileText,
  },
];

const secondaryItems = [
  {
    titleKey: 'integrations' as const,
    url: '/integrations',
    icon: Zap,
    badge: 'new' as const,
  },
  {
    titleKey: 'dataManagement' as const,
    url: '/data-management',
    icon: Database,
  },
  {
    titleKey: 'learn' as const,
    url: '/learn',
    icon: BookOpen,
  },
];

const bottomItems = [
  {
    titleKey: 'settings' as const,
    url: '/settings',
    icon: Settings,
  },
  {
    titleKey: 'help' as const,
    url: '/help',
    icon: HelpCircle,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { todayStats } = useStats();
  const { language } = usePreferences();
  const t = useTranslations((language || 'en') as Language);

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  <span className="text-sm font-bold">T</span>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Tatva Business</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <LanguageSwitcher />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{t(item.titleKey)}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {t(item.badge)}
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{t(item.titleKey)}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {t(item.badge)}
                        </Badge>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats - Hidden when collapsed */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Today's Summary</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2 px-2">
              <div className="rounded-lg bg-green-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-700">{t('income')}</span>
                  <span className="text-sm font-semibold text-green-800">
                    ₹{todayStats.totalIncome.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-red-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-red-700">{t('expense')}</span>
                  <span className="text-sm font-semibold text-red-800">
                    ₹{todayStats.totalExpenses.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-blue-50 p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-blue-700">{t('profit')}</span>
                  <span className={`text-sm font-semibold ${
                    todayStats.netProfit >= 0 ? 'text-blue-800' : 'text-red-800'
                  }`}>
                    ₹{todayStats.netProfit.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.titleKey}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{t(item.titleKey)}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name || user?.email} />
                    <AvatarFallback className="rounded-lg">
                      {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user?.user_metadata?.full_name || 'User'}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name || user?.email} />
                      <AvatarFallback className="rounded-lg">
                        {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user?.user_metadata?.full_name || 'User'}</span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <NavLink to="/settings">
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}