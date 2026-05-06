import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicy from "../components/Privacy_Policy/PrivacyPolicy";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Planyt" },
      { name: "description", content: "Planyt's Privacy Policy. Learn how we collect, use, and protect your personal information and data." },
      { property: "og:title", content: "Privacy Policy | Planyt" },
      { property: "og:description", content: "Planyt's comprehensive privacy policy explaining data handling and user rights." },
      { property: "og:url", content: "https://planyt.in/privacy-policy" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://planyt.in/privacy-policy",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return <PrivacyPolicy isModal={false} />;
}
