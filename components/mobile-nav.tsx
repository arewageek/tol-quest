"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Layout } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 h-16 bg-secondary/50 backdrop-blur-lg border-t border-primary/20 px-4"
    >
      <div className="h-full max-w-md mx-auto flex items-center justify-around">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center space-y-1 ${
            pathname === "/dashboard" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Layout className="w-5 h-5" />
          <span className="text-xs">Dashboard</span>
        </Link>
        <Link
          href="/leaderboard"
          className={`flex flex-col items-center space-y-1 ${
            pathname === "/leaderboard" ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Trophy className="w-5 h-5" />
          <span className="text-xs">Leaderboard</span>
        </Link>
      </div>
    </motion.div>
  );
}