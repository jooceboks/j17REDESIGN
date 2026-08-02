import Link from "next/link";
import { Container, Section } from "@/components/Section";

export default function NotFound() {
  return (
    <Section className="pt-36 sm:pt-44">
      <Container>
        <p className="type-eyebrow mb-5">404</p>
        <h1 className="type-h1 max-w-3xl">
          Nothing <span className="text-[var(--accent-lime)]">here</span>
        </h1>
        <p className="type-body mt-8 max-w-xl text-lg">
          That page doesn&apos;t exist. Head back to the club.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/contact-us" className="btn-secondary">
            Contact Us
          </Link>
        </div>
      </Container>
    </Section>
  );
}
