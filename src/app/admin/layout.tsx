import Link from 'next/link';
import {
	Bell,
	CalendarDays,
	Home,
	LogOut,
	Menu,
	Package2,
	Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import type { ReactElement, ReactNode } from 'react';
import { validateRequest } from '@/utils/validateRequest';
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// import { signOut } from '@/lib/auth/signOut';

interface Link {
	href: string;
	label: string;
	icon?: ReactElement;
}

const links: Link[] = [
	{ href: '/admin', label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
	{
		href: '/admin/events',
		label: 'Events',
		icon: <CalendarDays className="h-4 w-4" />,
	},
];

interface AdminLayoutProps {
	children: ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
	const { user } = await validateRequest();
	console.log(user);

	if (!user) {
		return redirect('/login');
	}

	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Link href="/" className="flex items-center gap-2 font-semibold">
							<Package2 className="h-6 w-6" />
							<span className="">Voting System</span>
						</Link>
						<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
							<Bell className="h-4 w-4" />
							<span className="sr-only">Toggle notifications</span>
						</Button>
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							{links.map(({ href, label, icon }) => {
								return (
									<Link
										href={href}
										className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
										key={href}
									>
										{icon}
										{label}
									</Link>
								);
							})}
						</nav>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 md:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="flex flex-col">
							<nav className="grid gap-2 text-lg font-medium">
								<Link
									href="#"
									className="flex items-center gap-2 text-lg font-semibold"
								>
									<Package2 className="h-6 w-6" />
									<span className="sr-only">Voting System</span>
								</Link>
								{links.map(({ href, label, icon }) => (
									<Link
										href={href}
										className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
										key={href}
									>
										{icon}
										{label}
									</Link>
								))}
							</nav>
						</SheetContent>
					</Sheet>
					<div className="w-full flex-1">
						<form>
							<div className="relative">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search products..."
									className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
								/>
							</div>
						</form>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<Avatar className="border-2">
									<AvatarImage src={user.avatar_url} />
									<AvatarFallback>
										{user.username.substring(0, 2)}
									</AvatarFallback>
								</Avatar>
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<form action="http://localhost:4001/logout" method="POST">
								<Button variant="ghost" className="h-8 text-destructive">
									<DropdownMenuItem className="cursor-pointer">
										<LogOut className="mr-2 h-4 w-4" /> Logout
									</DropdownMenuItem>
								</Button>
							</form>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
					{children}
				</main>
			</div>
		</div>
	);
};

export default AdminLayout;
