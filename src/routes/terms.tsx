import { createFileRoute } from "@tanstack/react-router";
import Terms from "../components/Terms/Terms";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service | Planyt" },
      { name: "description", content: "Planyt's Terms of Service. The terms for using Planyt: accounts, organizer and attendee roles, payments, passes and your data." },
      { property: "og:title", content: "Terms of Service | Planyt" },
      { property: "og:description", content: "Planyt's Terms of Service outlining user rights and platform usage guidelines." },
      { property: "og:url", content: "https://planyt.in/terms" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://planyt.in/terms",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return <Terms isModal={false} />;
}
