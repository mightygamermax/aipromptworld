'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import {
Globe,
Compass,
PlusCircle,
LayoutDashboard,
ShieldAlert,
User as UserIcon,
LogOut,
LogIn,
Menu,
X,
} from 'lucide-react';
import { toast } from 'sonner';

export default function Navbar() {
const pathname = usePathname();
const router = useRouter();
const [user, setUser] = React.useState<User | null>(null);
const [isAdmin, setIsAdmin] = React.useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

React.useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
setUser(currentUser);
if (currentUser) {
try {
const userSnap = await getDoc(doc(db, 'users', currentUser.uid));
if (userSnap.exists() && userSnap.data()?.role === 'admin') {
setIsAdmin(true);
} else {
setIsAdmin(false);
}
} catch {
setIsAdmin(false);
}
} else {
setIsAdmin(false);
}
});
return () => unsubscribe();
}, []);

const handleSignOut = async () => {
try {
await signOut(auth);
toast.success('Signed out successfully.');
router.push('/');
} catch {
toast.error('Failed to sign out.');
}
};

return (
<header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
{/* LOGO */}
<Link href="/" className="flex items-center gap-2 group">
<div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
<Globe className="w-5 h-5" />
</div>
<span className="font-black text-base sm:text-lg tracking-tight text-foreground">
AI Prompt <span className="text-brand-500">World</span>
</span>
</Link>

{/* DESKTOP NAV LINKS */}  
    <nav className="hidden md:flex items-center gap-6">  
      <Link  
        href="/explore"  
        className={`text-xs font-bold transition-colors ${  
          pathname === '/explore' ? 'text-brand-500' : 'text-muted-foreground hover:text-foreground'  
        }`}  
      >  
        Explore Directory  
      </Link>  
      {user && (  
        <>  
          <Link  
            href="/submit"  
            className={`text-xs font-bold transition-colors ${  
              pathname === '/submit' ? 'text-brand-500' : 'text-muted-foreground hover:text-foreground'  
            }`}  
          >  
            Submit Prompt  
          </Link>  
          <Link  
            href="/dashboard"  
            className={`text-xs font-bold transition-colors ${  
              pathname.startsWith('/dashboard') ? 'text-brand-500' : 'text-muted-foreground hover:text-foreground'  
            }`}  
          >  
            Dashboard  
          </Link>  
          {isAdmin && (  
            <Link  
              href="/admin"  
              className={`text-xs font-bold flex items-center gap-1 transition-colors ${  
                pathname === '/admin' ? 'text-amber-500' : 'text-amber-600/80 hover:text-amber-500'  
              }`}  
            >  
              <ShieldAlert className="w-3.5 h-3.5" />  
              <span>Admin</span>  
            </Link>  
          )}  
        </>  
      )}  
    </nav>  

    {/* RIGHT ACTIONS */}  
    <div className="hidden md:flex items-center gap-3">  
      {user ? (  
        <div className="flex items-center gap-3">  
          <Link  
            href="/profile"  
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-accent transition-colors"  
            title="Profile Settings"  
          >  
            {user.photoURL ? (  
              /* eslint-disable-next-line @next/next/no-img-element */  
              <img  
                src={user.photoURL}  
                alt={user.displayName || 'Avatar'}  
                className="w-7 h-7 rounded-full object-cover border border-border"  
              />  
            ) : (  
              <div className="w-7 h-7 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-xs">  
                {user.displayName?.charAt(0) || 'U'}  
              </div>  
            )}  
            <span className="text-xs font-bold text-foreground max-w-[100px] truncate">  
              {user.displayName || 'Account'}  
            </span>  
          </Link>  
          <button  
            onClick={handleSignOut}  
            className="p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"  
            title="Sign Out"  
          >  
            <LogOut className="w-4 h-4" />  
          </button>  
        </div>  
      ) : (  
        <div className="flex items-center gap-2">  
          <Link  
            href="/auth/signin"  
            className="px-4 py-2 rounded-xl text-xs font-bold text-foreground hover:bg-accent transition-colors"  
          >  
            Sign In  
          </Link>  
          <Link  
            href="/auth/signup"  
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold transition-all shadow-md shadow-brand-500/20"  
          >  
            Get Started  
          </Link>  
        </div>  
      )}  
    </div>  

    {/* MOBILE MENU TOGGLE */}  
    <button  
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}  
      className="md:hidden p-2 rounded-xl text-foreground hover:bg-accent"  
    >  
      {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}  
    </button>  
  </div>  

  {/* MOBILE DROPDOWN */}  
  {isMobileMenuOpen && (  
    <div className="md:hidden border-t border-border bg-card p-4 space-y-3">  
      <Link  
        href="/explore"  
        onClick={() => setIsMobileMenuOpen(false)}  
        className="block px-3 py-2 rounded-xl text-xs font-bold text-foreground hover:bg-accent"  
      >  
        Explore Directory  
      </Link>  
      {user ? (  
        <>  
          <Link  
            href="/submit"  
            onClick={() => setIsMobileMenuOpen(false)}  
            className="block px-3 py-2 rounded-xl text-xs font-bold text-foreground hover:bg-accent"  
          >  
            Submit Prompt  
          </Link>  
          <Link  
            href="/dashboard"  
            onClick={() => setIsMobileMenuOpen(false)}  
            className="block px-3 py-2 rounded-xl text-xs font-bold text-foreground hover:bg-accent"  
          >  
            Dashboard  
          </Link>  
          <Link  
            href="/profile"  
            onClick={() => setIsMobileMenuOpen(false)}  
            className="block px-3 py-2 rounded-xl text-xs font-bold text-foreground hover:bg-accent"  
          >  
            Profile Settings  
          </Link>  
          {isAdmin && (  
            <Link  
              href="/admin"  
              onClick={() => setIsMobileMenuOpen(false)}  
              className="block px-3 py-2 rounded-xl text-xs font-bold text-amber-500 hover:bg-accent"  
            >  
              Admin Console  
            </Link>  
          )}  
          <button  
            onClick={() => {  
              setIsMobileMenuOpen(false);  
              handleSignOut();  
            }}  
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-destructive hover:bg-destructive/10"  
          >  
            Sign Out  
          </button>  
        </>  
      ) : (  
        <div className="grid grid-cols-2 gap-2 pt-2">  
          <Link  
            href="/auth/signin"  
            onClick={() => setIsMobileMenuOpen(false)}  
            className="text-center py-2.5 rounded-xl border border-border text-xs font-bold text-foreground"  
          >  
            Sign In  
          </Link>  
          <Link  
            href="/auth/signup"  
            onClick={() => setIsMobileMenuOpen(false)}  
            className="text-center py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-md"  
          >  
            Get Started  
          </Link>  
        </div>  
      )}  
    </div>  
  )}  
</header>

);
}
