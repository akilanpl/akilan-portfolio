import type { Metadata } from "next";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Container, Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildMetadata } from "@/lib/metadata";
import profile from "@content/profile.json";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch about internships, collaborations, or open-source work.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Say hello."
        description="Open to Software Engineering / ML Engineering internships, collaborations, and interesting problems in general."
      />

      <Container className="grid gap-14 pb-28 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <p className="meta-label mb-4">Direct</p>
            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="focus-ring flex items-center gap-3 rounded text-sm text-ink dark:text-ink-dark hover:text-accent-blue"
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} /> {profile.email}
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex items-center gap-3 rounded text-sm text-ink dark:text-ink-dark hover:text-accent-blue"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.5} /> LinkedIn
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring flex items-center gap-3 rounded text-sm text-ink dark:text-ink-dark hover:text-accent-blue"
              >
                <Github className="h-4 w-4" strokeWidth={1.5} /> GitHub
              </a>
              <p className="flex items-center gap-3 text-sm text-muted dark:text-muted-dark">
                <MapPin className="h-4 w-4" strokeWidth={1.5} /> {profile.location}
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <p className="meta-label mb-3">Availability</p>
            <p className="text-sm leading-relaxed text-muted dark:text-muted-dark">
              Currently open to Software Engineering / ML Engineering internships.
            </p>
          </Card>

          <Card className="p-6">
            <p className="meta-label mb-3">FAQ</p>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-ink dark:text-ink-dark">
                  What are you looking for right now?
                </p>
                <p className="mt-1 text-sm text-muted dark:text-muted-dark">
                  Software Engineering or ML Engineering internships, and interesting AI-systems
                  problems in general.
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-ink dark:text-ink-dark">
                  Fastest way to reach you?
                </p>
                <p className="mt-1 text-sm text-muted dark:text-muted-dark">Email or LinkedIn.</p>
              </div>
            </div>
          </Card>
        </div>

        <div>
          <p className="meta-label mb-6">Send a message</p>
          <ContactForm />
        </div>
      </Container>
    </>
  );
}
