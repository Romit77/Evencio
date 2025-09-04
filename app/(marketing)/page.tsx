"use client";
import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import {
  ArrowUpRight,
  Calendar,
  Users,
  Zap,
  PlayCircle,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Star,
  TrendingUp,
  Shield,
  Github,
} from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Navbar } from "./_components/navbar";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="min-h-screen flex items-center pt-14">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium"
              >
                <Sparkles className="w-4 h-4 mr-2 text-violet-600" />
                Trusted by project teams
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-4"
              >
                <h1
                  className={cn(
                    "text-4xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-slate-900 leading-none",
                    headingFont.className
                  )}
                >
                  Organize
                  <br />
                  <span className="text-violet-600">events</span> and
                  <br />
                  <span className="text-slate-400">projects</span>
                </h1>

                <p
                  className={cn(
                    "text-lg lg:text-xl text-slate-600 max-w-lg leading-relaxed",
                    textFont.className
                  )}
                >
                  The all-in-one platform for event planning and project
                  management. Kanban boards, budget tracking, social media
                  automation, and AI-powered tools.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/sign-up">
                    Start organizing
                    <ArrowUpRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  className="text-slate-700 hover:text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300"
                  asChild
                >
                  <Link href="/demo">
                    <PlayCircle className="mr-2 w-5 h-5" />
                    Watch demo
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex items-center space-x-8 pt-4"
              >
                <div className="text-sm text-slate-500">
                  <div className="font-semibold text-slate-900">500+</div>
                  <div>Projects managed</div>
                </div>
                <div className="text-sm text-slate-500">
                  <div className="font-semibold text-slate-900">50+</div>
                  <div>Events created</div>
                </div>
                <div className="text-sm text-slate-500">
                  <div className="font-semibold text-slate-900">95%</div>
                  <div>Task completion</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 lg:p-12">
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4 bg-violet-500 text-white rounded-2xl p-4 shadow-lg"
                >
                  <Calendar className="w-6 h-6" />
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-4 -left-4 bg-emerald-500 text-white rounded-2xl p-4 shadow-lg"
                >
                  <Users className="w-6 h-6" />
                </motion.div>

                {/* Card Content */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">
                      Project Dashboard
                    </h3>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-slate-600">12 boards created</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-slate-600">
                        Budget tracking enabled
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span className="text-slate-600">
                        Team collaboration active
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Project Progress</span>
                      <span className="text-slate-900 font-medium">78%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "78%" }}
                        transition={{ duration: 2, delay: 1 }}
                        className="bg-violet-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute inset-0 -z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-violet-200 to-purple-200 rounded-full opacity-20"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full opacity-20"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative py-16 bg-gradient-to-br from-white via-violet-50 to-slate-100 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-50 to-purple-50 rounded-full opacity-30 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Powerful Features
            </div>
            <h2
              className={cn(
                "text-4xl lg:text-6xl font-bold text-slate-900 mb-6",
                headingFont.className
              )}
            >
              Everything you need to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600">
                succeed
              </span>
            </h2>
            <p
              className={cn(
                "text-xl text-slate-600 max-w-3xl mx-auto",
                textFont.className
              )}
            >
              Everything you need to manage projects and events in one powerful
              platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "Kanban Boards",
                description:
                  "Organize projects with boards, lists, and cards. Drag and drop to manage tasks effortlessly.",
                gradient: "from-violet-500 to-purple-500",
                delay: 0,
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Event Management",
                description:
                  "Create events, track budgets, generate posters, and automate social media posts.",
                gradient: "from-emerald-500 to-teal-500",
                delay: 0.2,
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "AI-Powered Tools",
                description:
                  "Generate event content, find speakers, and get chatbot assistance for your projects.",
                gradient: "from-orange-500 to-red-500",
                delay: 0.4,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  <div className="relative p-8">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-violet-700 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {feature.description}
                    </p>

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative py-32 bg-gradient-to-br from-slate-50 via-white to-emerald-50 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20"></div>

          <div className="absolute top-32 left-32 w-80 h-80 bg-gradient-to-br from-violet-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>

          <motion.div
            animate={{
              x: [-20, 20, -20],
              y: [-10, 10, -10],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-violet-300/30 to-purple-300/30 rounded-3xl shadow-lg"
          />
          <motion.div
            animate={{
              x: [20, -20, 20],
              y: [10, -10, 10],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-emerald-300/30 to-teal-300/30 rounded-full shadow-lg"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-violet-200 text-violet-700 text-sm font-medium shadow-lg">
                <TrendingUp className="w-4 h-4 mr-2" />
                Customer Success Story
              </div>

              <blockquote
                className={cn(
                  "text-3xl lg:text-4xl font-light text-slate-800 leading-relaxed",
                  textFont.className
                )}
              >
                &quot;Evencio streamlined our project management and event
                planning.
                <span className="text-violet-600 font-medium">
                  {" "}
                  The Kanban boards and budget tracking are game-changers.
                </span>
                &quot;
              </blockquote>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    S
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-900 text-lg">
                    Sarah Chen
                  </div>
                  <div className="text-slate-600">
                    Project Manager, TechFlow
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">
                  Impact Metrics
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center p-4 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200"
                  >
                    <div className="text-4xl font-bold text-violet-600 mb-2">
                      87%
                    </div>
                    <div className="text-slate-600 text-sm font-medium">
                      Time Saved
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200"
                  >
                    <div className="text-4xl font-bold text-emerald-600 mb-2">
                      3x
                    </div>
                    <div className="text-slate-600 text-sm font-medium">
                      Productivity
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center p-4 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200"
                  >
                    <div className="text-4xl font-bold text-orange-600 mb-2">
                      95%
                    </div>
                    <div className="text-slate-600 text-sm font-medium">
                      Success Rate
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200"
                  >
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      24/7
                    </div>
                    <div className="text-slate-600 text-sm font-medium">
                      Support
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative py-32 bg-gradient-to-br from-white via-violet-50 to-slate-100 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-violet-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-violet-100/40 to-purple-100/40 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-32 left-32 w-4 h-4 bg-violet-400 rounded-full opacity-60"
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
            rotate: [0, -15, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-32 right-32 w-6 h-6 bg-emerald-400 rounded-full opacity-60"
        />
        <motion.div
          animate={{
            y: [-15, 15, -15],
            rotate: [0, 20, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-40 right-40 w-3 h-3 bg-purple-400 rounded-full opacity-60"
        />

        <div className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.03]">
          <h2 className="text-[20vw] md:text-[16vw] lg:text-[14vw] leading-none font-black tracking-[0.15em] md:tracking-[0.2em] text-slate-900 translate-y-[5%]">
            EVENCIO
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-violet-200 text-violet-700 text-sm font-medium shadow-lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Start Your Journey Today
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2
                className={cn(
                  "text-4xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight",
                  headingFont.className
                )}
              >
                Ready to
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600">
                  transform
                </span>
                <br />
                your workflow?
              </h2>

              <p
                className={cn(
                  "text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed",
                  textFont.className
                )}
              >
                Join teams who are organizing projects and events more
                efficiently with Evencio. Experience the future of project
                management today.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-10 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/sign-up">
                  Start organizing
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-300 text-slate-700 hover:text-slate-900 hover:border-violet-400 hover:bg-white/60 backdrop-blur-sm px-10 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/contact">
                  <PlayCircle className="mr-3 w-5 h-5" />
                  Watch demo
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <div className="inline-flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-violet-200 shadow-lg">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold text-sm ${
                        i === 0
                          ? "bg-violet-500"
                          : i === 1
                          ? "bg-emerald-500"
                          : i === 2
                          ? "bg-orange-500"
                          : "bg-purple-500"
                      }`}
                    >
                      {["A", "S", "M", "R"][i]}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-medium">
                    +50
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-slate-900 font-semibold">
                    Join 500+ teams
                  </div>
                  <div className="text-slate-600 text-sm">
                    already organizing with Evencio
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            viewport={{ once: true }}
            className="pt-16 mt-16 border-t border-slate-200/50"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <Link
                  href="https://github.com/Romit77/Evencio"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Repository"
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-200/60 bg-white/80 text-slate-600 backdrop-blur-sm transition-all duration-300 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 hover:shadow-xl relative overflow-hidden cursor-pointer z-20"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Github className="h-6 w-6 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                </Link>
                <div className="absolute -inset-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300" />
              </motion.div>

              <div className="text-center relative">
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-emerald-500/10 blur-xl opacity-50"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
                <p className="text-sm text-slate-600 font-semibold mb-1 relative z-10">
                  © {year} Evencio. All rights reserved.
                </p>
                <p className="text-xs text-slate-500 relative z-10 flex items-center justify-center gap-2">
                  Built with
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-red-500"
                  >
                    ♥
                  </motion.span>
                  for better Event management
                </p>
              </div>

              <div className="flex items-center gap-4 relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative"
                >
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-600 font-medium">
                    System operational
                  </span>
                  <span className="text-xs text-slate-400">99.9% uptime</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MarketingPage;
