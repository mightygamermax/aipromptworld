import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50 text-muted-foreground text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* BRAND COLUMN */}
          <div className="space-y-3 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-600 to-pink-500 flex items-center justify-center text-white">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-black text-sm text-foreground">AI Prompt World</span>
            </Link>
            <p className="text-xs text-muted-foreground max-w-sm">
              The premier free marketplace and directory for high-performance AI prompt templates across GPT-4o, Claude 3.5, Midjourney, and Flux.
            </p>
          </div>

          {/* NAV COLUMN 1 */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-foreground text-[11px]">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/explore" className="hover:text-foreground transition-colors">
                  Explore Directory
                </Link>
              </li>
              <li>
                <Link href="/submit" className="hover:text-foreground transition-colors">
                  Submit Prompt
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Creator Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* NAV COLUMN 2 */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-foreground text-[11px]">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {currentYear} AI Prompt World. All rights reserved.</p>
          <p className="text-[11px]">Engineered for Next.js 15 &amp; Firebase.</p>
        </div>
      </div>
    </footer>
  );
          }
