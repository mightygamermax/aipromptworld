'use client';

import * as React from 'react';
import { Share2, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const [shared, setShared] = React.useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setShared(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setShared(false), 2000);
    } catch {
      toast.error('Failed to share link.');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent hover:bg-accent/80 text-foreground text-xs font-bold border border-border transition-all"
    >
      {shared ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-500" />
          <span>Link Copied</span>
        </>
      ) : (
        <>
          <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
          <span>Share Prompt</span>
        </>
      )}
    </button>
  );
    }
