"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Star, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { MobileNav } from "@/components/mobile-nav";

interface User {
  id: number;
  name: string;
  points: number;
  rank: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export default function Leaderboard() {
  // Mock data for leaderboard
  const users: User[] = [
    {
      id: 1,
      name: "Alex Thompson",
      points: 2500,
      rank: 1,
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      name: "Sarah Chen",
      points: 2350,
      rank: 2,
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      name: "Mike Johnson",
      points: 2200,
      rank: 3,
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 4,
      name: "You",
      points: 1750,
      rank: 42,
      avatar: "https://i.pravatar.cc/150?img=4",
      isCurrentUser: true
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background px-4 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto pt-6 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-primary">Leaderboard</h1>
          <Trophy className="w-8 h-8 text-primary" />
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          {users.slice(0, 3).map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex flex-col items-center ${
                index === 0 ? "order-2" : index === 1 ? "order-1" : "order-3"
              }`}
            >
              <div className="relative">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={index === 0 ? 80 : 60}
                  height={index === 0 ? 80 : 60}
                  className="rounded-full border-4 border-primary/20"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="absolute -top-3 -right-3 bg-secondary rounded-full p-1"
                >
                  {getRankIcon(user.rank)}
                </motion.div>
              </div>
              <p className="mt-2 text-sm font-medium text-primary truncate max-w-[100px] text-center">
                {user.name}
              </p>
              <p className="text-sm text-muted-foreground">{user.points} pts</p>
            </motion.div>
          ))}
        </div>

        {/* Leaderboard List */}
        <div className="space-y-3">
          <AnimatePresence>
            {users.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-4 ${
                    user.isCurrentUser
                      ? "bg-primary/10 border-primary"
                      : "bg-secondary/50"
                  } backdrop-blur-sm border-primary/20`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.points} points
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 text-center">
                        {getRankIcon(user.rank)}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <MobileNav />
    </div>
  );
}