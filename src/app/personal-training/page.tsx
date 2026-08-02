import { ServicePage, serviceMetadata } from "@/components/ServicePage";
import { getService } from "@/content/services";

const service = getService("personal-training")!;

export const metadata = serviceMetadata(service);

export default function Page() {
  return <ServicePage service={service} />;
}
