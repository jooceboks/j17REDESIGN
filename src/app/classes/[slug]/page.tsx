import { notFound } from "next/navigation";
import { ServicePage, serviceMetadata } from "@/components/ServicePage";
import { classes, getService } from "@/content/services";

export function generateStaticParams() {
  return classes.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/classes/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service || service.group !== "classes") return {};
  return serviceMetadata(service);
}

export default async function ClassPage(props: PageProps<"/classes/[slug]">) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service || service.group !== "classes") notFound();
  return <ServicePage service={service} />;
}
