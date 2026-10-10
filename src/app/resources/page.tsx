import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Markdown } from "@/components/markdown";
import { getEntry } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Starter tools, public sample evidence, and references for digital forensics.",
};

export default async function ResourcesPage() {
  const page = await getEntry("pages", "resources");
  if (!page) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Toolkit"
        title={page.title}
        description={page.description}
      />
      <Container className="py-14">
        <div className="max-w-3xl">
          <Markdown html={page.content} />
        </div>
      </Container>
    </>
  );
}
