import { Link } from "react-router-dom";
import {
  Apple,
  CalendarClock,
  Shield,
  Monitor,
  Lock,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReactElement } from "react";

const features = [
  {
    icon: CalendarClock,
    title: "Google Calendar sync",
    description:
      "Reads your upcoming events and detects Google Meet links automatically, with no manual setup per meeting.",
  },
  {
    icon: Monitor,
    title: "Fullscreen overlay",
    description:
      "When a meeting starts, a fullscreen overlay takes over your screen so you never miss the join moment.",
  },
  {
    icon: Lock,
    title: "Private by design",
    description:
      "No backend, no analytics, no tracking. OAuth tokens live in your macOS Keychain and never leave your device.",
  },
  {
    icon: Shield,
    title: "Read-only access",
    description:
      "remeetner only requests read access to your calendar, and you can revoke it from your Google account at any time.",
  },
];

export const RemeetnerMainPage = (): ReactElement => {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--background)/0.08),_transparent_60%)]"
        />
        <div className="relative max-w-5xl mx-auto px-8 py-24 md:py-32">
          <div className="flex flex-col items-start gap-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs text-muted-foreground">
              <Apple className="h-3.5 w-3.5" />
              Free utility for macOS
            </div>
            <h1 className="text-5xl md:text-6xl font-thin text-primary leading-tight tracking-tight">
              Never miss a <strong className="font-normal">Google Meet</strong>
              <br />
              again.
            </h1>
            <p className="max-w-2xl text-xl font-thin text-muted-foreground leading-relaxed">
              <strong className="font-normal text-primary">remeetner</strong>{" "}
              watches your Google Calendar and drops a fullscreen overlay on
              your Mac the moment a Meet starts — so you're always one click
              away from joining.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a
                  href="https://github.com/albertdeiz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link to="/remeetner/privacy">Read the privacy policy</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-8 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-thin text-primary mb-3">
            Built to stay out of your way
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            A focused tool that does one thing well: make sure you show up on
            time without any extra tabs, reminders or bots in your calendar.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-muted/20 p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium text-primary mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/20">
        <div className="max-w-5xl mx-auto px-8 py-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-thin text-primary mb-2">
                Your calendar stays yours
              </h2>
              <p className="text-muted-foreground max-w-xl">
                No servers, no logs, no data retention. Everything runs locally
                on your Mac. Review the details before you install.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link to="/remeetner/privacy">Privacy policy</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/remeetner/conditions">Terms of use</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-8 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} remeetner</span>
          <Link to="/" className="hover:text-primary transition-colors">
            ← Back to albertdeiz.com
          </Link>
        </div>
      </footer>
    </main>
  );
};
