"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, CheckCircle2, Timer, ArrowRight, Play, Shield, Gift, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MobileNav } from "@/components/mobile-nav";

interface Task {
  id: number;
  title: string;
  points: number;
  status: "pending" | "started" | "completed" | "verified" | "claimed";
  deadline: string;
  description: string;
}

const stepIcons = {
  pending: Play,
  started: Timer,
  completed: CheckCircle2,
  verified: Shield,
  claimed: Gift,
};

const stepColors = {
  pending: "text-muted-foreground",
  started: "text-blue-400",
  completed: "text-green-400",
  verified: "text-purple-400",
  claimed: "text-primary",
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete Profile",
      points: 50,
      status: "pending",
      deadline: "2h",
      description: "Fill in all your profile details to earn points"
    },
    {
      id: 2,
      title: "Share Achievement",
      points: 100,
      status: "started",
      deadline: "24h",
      description: "Share your achievement on Telegram"
    },
    {
      id: 3,
      title: "Daily Check-in",
      points: 25,
      status: "completed",
      deadline: "12h",
      description: "Check in daily to earn bonus points"
    }
  ]);

  const [totalPoints, setTotalPoints] = useState(175);
  const [rank, setRank] = useState(42);

  const progressTask = (taskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const statusFlow = ["pending", "started", "completed", "verified", "claimed"];
        const currentIndex = statusFlow.indexOf(task.status);
        if (currentIndex < statusFlow.length - 1) {
          const newStatus = statusFlow[currentIndex + 1] as Task["status"];
          if (newStatus === "claimed") {
            setTotalPoints(prev => prev + task.points);
          }
          return { ...task, status: newStatus };
        }
      }
      return task;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background px-4 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto pt-6 space-y-6"
      >
        {/* Logo */}
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <div className="relative w-16 h-16 logo-spin">
            <Image
              src="https://pbs.twimg.com/profile_images/1832369482066546688/O8furigo_400x400.jpg"
              alt="Open Labs Logo"
              width={64}
              height={64}
              className="rounded-full"
            />
          </div>
        </motion.div>

        {/* Points Overview */}
        <Card className="p-6 bg-secondary/50 shadow-lg rounded-2xl backdrop-blur-sm border border-primary/20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mb-4"
          >
            <div>
              <h2 className="text-2xl font-bold text-primary">Your Progress</h2>
              <p className="text-muted-foreground">Keep going! You're doing great!</p>
            </div>
            <Trophy className="w-10 h-10 text-primary" />
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="points-bubble bg-secondary p-4 rounded-xl text-center"
            >
              <Star className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="points-bubble bg-secondary p-4 rounded-xl text-center"
            >
              <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">#{rank}</div>
              <div className="text-sm text-muted-foreground">Current Rank</div>
            </motion.div>
          </div>

          <Progress value={65} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground text-center">
            35 points until next rank
          </p>
        </Card>

        {/* Available Tasks */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-primary">Available Tasks</h3>
          
          <AnimatePresence>
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="task-card p-4 bg-secondary/50 backdrop-blur-sm border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-primary">{task.title}</h4>
                    <Badge variant="secondary" className="font-medium">
                      {task.points} pts
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {task.description}
                  </p>

                  {/* Step Indicators */}
                  <div className="flex justify-between items-center mb-4">
                    {(["pending", "started", "completed", "verified", "claimed"] as const).map((step, index) => {
                      const StepIcon = stepIcons[step];
                      const isActive = task.status === step;
                      const isPast = (["pending", "started", "completed", "verified", "claimed"] as const)
                        .indexOf(task.status) >= (["pending", "started", "completed", "verified", "claimed"] as const).indexOf(step);

                      return (
                        <div key={step} className="flex flex-col items-center">
                          <motion.div
                            animate={{ scale: isActive ? 1.2 : 1 }}
                            className={`${stepColors[isPast ? task.status : "pending"]} step-indicator`}
                          >
                            <StepIcon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                          </motion.div>
                          <span className="text-xs text-muted-foreground mt-1 capitalize">{step}</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Timer className="w-4 h-4 mr-1" />
                      {task.deadline} left
                    </div>
                    
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => progressTask(task.id)}
                      disabled={task.status === "claimed"}
                      className="flex items-center"
                    >
                      {task.status === "claimed" ? (
                        <>
                          <Gift className="w-4 h-4 mr-1" />
                          Claimed
                        </>
                      ) : (
                        <>
                          Next Step
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </Button>
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