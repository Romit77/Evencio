import Link from "next/link";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import {
  Medal,
  Check,
  ArrowRight,
  Star,
  Users,
  BarChart,
  Calendar,
  Zap,
  Shield,
  Clock,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

const headingFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 pb-20 bg-gradient-to-br from-fuchsia-100 via-white to-pink-100">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col items-center mb-16 md:mb-24">
            <div className="w-full max-w-3xl text-center">
              <div
                className={cn(
                  "flex flex-col items-center",
                  headingFont.className
                )}
              >
                <div
                  className="mb-4 flex items-center border-0 shadow-lg p-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white rounded-full uppercase text-xs font-bold tracking-wider"
                  data-testid="main_award"
                >
                  <Medal className="h-5 w-5 mr-2 text-yellow-300" />
                  #1 Event Management Platform
                </div>
                <h1
                  className="text-4xl md:text-6xl text-neutral-800 mb-4 leading-tight"
                  data-testid="main_title"
                >
                  Evencio helps teams{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-600">
                    create memorable events
                  </span>{" "}
                  with ease.
                </h1>
                <p
                  className={cn(
                    "text-lg text-neutral-500 mb-8 max-w-2xl",
                    textFont.className
                  )}
                  data-testid="main_description"
                >
                  Plan, organize, and execute exceptional events of any size.
                  From corporate conferences to intimate gatherings, bring your
                  vision to life with Evencio.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="rounded-lg"
                    asChild
                    data-testid="main_button"
                  >
                    <Link href="/sign-up">
                      Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-lg">
                    <Link href="/demo">Watch Demo</Link>
                  </Button>
                </div>

                <div className="mt-8 flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 border-2 border-white flex items-center justify-center text-white text-xs"
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-500">
                      Trusted by 10,000+ event organizers worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-10 border-y mb-16 bg-gradient-to-r from-neutral-50 to-neutral-100">
            <p className="text-center text-sm text-neutral-500 uppercase tracking-wider mb-6 font-medium">
              Why organizers choose Evencio
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-3xl mx-auto">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-fuchsia-600 mb-2">
                  99.9%
                </div>
                <p className="text-neutral-500">Platform reliability</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-fuchsia-600 mb-2">
                  40%
                </div>
                <p className="text-neutral-500">Planning time saved</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-fuchsia-600 mb-2">
                  5M+
                </div>
                <p className="text-neutral-500">Events successfully hosted</p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <div className="text-center mb-12">
              <h2
                className={cn("text-3xl font-bold mb-4", headingFont.className)}
              >
                Everything you need to manage events
              </h2>
              <p
                className={cn(
                  "text-lg text-neutral-500 max-w-2xl mx-auto",
                  textFont.className
                )}
              >
                Powerful features to help every organizer plan, promote, and
                execute exceptional events from start to finish.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Attendee Management",
                  description:
                    "Effortlessly manage guest lists, RSVPs, and personalized communications.",
                },
                {
                  icon: <BarChart className="h-6 w-6" />,
                  title: "Event Analytics",
                  description:
                    "Gain valuable insights with comprehensive event metrics and attendee engagement data.",
                },
                {
                  icon: <Calendar className="h-6 w-6" />,
                  title: "Schedule Builder",
                  description:
                    "Create dynamic event agendas with customizable timelines and session management.",
                },
                {
                  icon: <Zap className="h-6 w-6" />,
                  title: "Vendor Coordination",
                  description:
                    "Streamline communication with caterers, venues, and service providers.",
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: "Secure Ticketing",
                  description:
                    "Sell tickets with confidence using our secure payment processing system.",
                },
                {
                  icon: <Clock className="h-6 w-6" />,
                  title: "Real-time Updates",
                  description:
                    "Keep attendees informed with instant notifications and event changes.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition"
                >
                  <div className="bg-gradient-to-r from-fuchsia-50 to-pink-50 p-3 rounded-lg w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-fuchsia-50 to-pink-50 rounded-2xl p-8 mb-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="inline-block h-6 w-6 fill-yellow-400 text-yellow-400 mx-1"
                  />
                ))}
              </div>
              <p className="text-xl md:text-2xl font-medium text-neutral-700 mb-6 italic">
                &quot;Evencio revolutionized our annual conference. We reduced
                planning time by 45% and increased attendee satisfaction scores
                by 30%.&quot;
              </p>
              <div>
                <p className="font-semibold">Sarah Johnson</p>
                <p className="text-sm text-neutral-500">
                  Event Director at TechCorp
                </p>
              </div>
            </div>
          </div>

          <div className="bg-neutral-900 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2
              className={cn(
                "text-3xl md:text-4xl font-bold mb-4",
                headingFont.className
              )}
            >
              Ready to elevate your next event?
            </h2>
            <p
              className={cn(
                "text-lg text-neutral-300 mb-8 max-w-2xl mx-auto",
                textFont.className
              )}
            >
              Join thousands of event professionals already using Evencio to
              create unforgettable experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-neutral-200 rounded-lg"
              >
                <Link href="/sign-up">Get Started Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-black border-white hover:bg-white/10 rounded-lg"
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MarketingPage;
