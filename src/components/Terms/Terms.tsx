import LegalLayout, { LegalSection as Section } from "../LegalLayout";

/**
 * Terms of service: plain-language summary first, then the full terms. Kept in step with the
 * Privacy policy (same retention, sharing and cookie wording) and with em-frontend (src/components/Terms/Terms.jsx).
 */
const TOC = [
  ["summary", "The short version"],
  ["accounts", "1. Your account"],
  ["roles", "2. Attendees, organizers and other roles"],
  ["organizers", "3. If you organize events"],
  ["attending", "4. If you attend events"],
  ["payments", "5. Payments and refunds"],
  ["passes", "6. Passes, QR codes and badges"],
  ["content", "7. What you upload"],
  ["acceptable", "8. Acceptable use"],
  ["data", "9. Your data"],
  ["availability", "10. Availability and changes"],
  ["liability", "11. Liability"],
  ["ending", "12. Ending your account"],
  ["law", "13. Governing law"],
  ["contact", "14. Contact"],
];

const Summary = ({ items }: { items: string[][] }) => (
  <ul className="grid sm:grid-cols-2 gap-3 list-none p-0 m-0">
    {items.map(([title, text]) => (
      <li key={title} className="rounded-2xl border border-[#e4e8ef] bg-[#f6f8fb] p-4">
        <strong className="block text-[#111826] font-semibold mb-1">{title}</strong>
        <span className="text-[14px] leading-6">{text}</span>
      </li>
    ))}
  </ul>
);

export default function Terms({ isModal = false }: { isModal?: boolean }) {
  return (
    <LegalLayout isModal={isModal} title="Terms of service" updated="Last updated: 22 October 2026" toc={TOC}>
      <Section id="summary" title="The short version">
        <p>These terms are an agreement between you and Planyt for using planyt.in, the Planyt app and the event websites built on it. Please read the full terms; this summary is not a substitute.</p>
        <Summary items={[
          ["You need to be 18 or over", "One account per person. Keep your sign-in details to yourself."],
          ["Organizers run their events", "Each event belongs to its organizer: its rules, prices, refunds and the people it accepts."],
          ["Your pass is yours", "A QR pass admits one person. Don't share it; ask the desk for a new one if it's lost."],
          ["We never sell your data", "Event details go to that event's organizers and the services that run Planyt. Details in the Privacy policy."],
          ["Event data is deleted after 90 days", "Personal event data leaves our active systems 90 days after the event ends."],
          ["Play fair", "No scraping, spam, fake registrations or attempts to break the service."],
        ]} />
      </Section>

      <Section id="accounts" title="1. Your account">
        <p>You can sign up with your email address or with Google. With Google we receive your name, email address and profile photo; we ask for any other detail we need (such as phone, organisation and country) in your profile.</p>
        <p>You must be at least 18, give accurate details and keep them up to date. You are responsible for what happens under your account, so keep your password and the devices you sign in on safe, and tell us at <a href="mailto:contact@planyt.in">contact@planyt.in</a> if you think someone else has used it.</p>
      </Section>

      <Section id="roles" title="2. Attendees, organizers and other roles">
        <p>Everyone starts as an attendee: you can register for events, keep your passes and submit papers. An account can also hold other roles, each with its own dashboard:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li><strong className="text-[#111826]">Organizer</strong>: creates and runs events. Organizer access is given on sign-up through an organizer plan, or by Planyt on request.</li>
          <li><strong className="text-[#111826]">Reviewer, volunteer, sponsor</strong>: invited by an event's organizer for that event only.</li>
        </ul>
        <p>Roles given by an organizer end when the organizer removes them or the event ends.</p>
      </Section>

      <Section id="organizers" title="3. If you organize events">
        <ul className="list-disc pl-6 space-y-1.5">
          <li>You are responsible for your events: their content, schedule, venue, safety, accessibility, the prices you set and the refund rules you publish.</li>
          <li>You may only collect and use attendee details for running your event, and you must handle them lawfully, including under India's Digital Personal Data Protection Act. Don't export them for unrelated marketing.</li>
          <li>Invite reviewers, volunteers and staff only for work on your event, and remove their access when it ends.</li>
          <li>Your plan sets limits such as the number of events and people per event. If a plan ends, your events stay readable but can't be changed until it's renewed.</li>
          <li>Content you publish on an event website must be yours to publish and must not mislead attendees.</li>
        </ul>
      </Section>

      <Section id="attending" title="4. If you attend events">
        <ul className="list-disc pl-6 space-y-1.5">
          <li>Each event is run by its organizer, not by Planyt. Its organizer decides who is accepted and sets the event's rules, which apply on top of these terms.</li>
          <li>Organizers can see the details you give when you register and how you check in, because they need them to run the event.</li>
          <li>If you submit a paper or proposal, the organizer and the reviewers they invite will read it. Accepted papers may be listed in the agenda with your name.</li>
        </ul>
      </Section>

      <Section id="payments" title="5. Payments and refunds">
        <p>Paid registrations are paid to the event's organizer. Online payments are processed by our payment partner; we don't store your card details. Some events take payment offline (for example a bank transfer) and confirm it by hand: until the organizer verifies it, your pass may not open doors.</p>
        <p>Refunds, cancellations and transfers follow the organizer's published policy. Ask the organizer first; if you can't reach them, write to us and we'll help where we can.</p>
      </Section>

      <Section id="passes" title="6. Passes, QR codes and badges">
        <p>Your pass QR code admits one person to the event it was issued for. Don't share or post it. If it's lost or shared, the organizer can replace it, and the old code then stops working. Scanners at the venue may work offline and sync later; what they record (time, place, who checked you in) is kept with the event.</p>
      </Section>

      <Section id="content" title="7. What you upload">
        <p>You keep the rights to what you upload (papers, slides, photos, event pages). You give Planyt the permission it needs to store, process and show it to the people it's meant for, for as long as it stays on Planyt. Don't upload anything you don't have the right to share.</p>
        <p>Planyt itself (the software, design and brand) belongs to Planyt and is not licensed to you beyond using the service.</p>
      </Section>

      <Section id="acceptable" title="8. Acceptable use">
        <p>Do not:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>scrape, copy or bulk-export Planyt or other people's data, or use it to build a competing product;</li>
          <li>create fake registrations, accounts or passes, or try to get into events you're not entitled to;</li>
          <li>send spam, harass people, or upload anything unlawful, hateful or harmful;</li>
          <li>probe, overload or break the service, or get around its security or plan limits.</li>
        </ul>
        <p>We may remove content or suspend accounts that break these rules.</p>
      </Section>

      <Section id="data" title="9. Your data">
        <p>How we collect, use and protect personal data is in the <a href="/privacy-policy">Privacy policy</a>, which is part of these terms. We never sell your data. Personal event data is deleted from our active systems 90 days after the event ends.</p>
      </Section>

      <Section id="availability" title="10. Availability and changes">
        <p>We work to keep Planyt running and safe, but it is provided as is and may sometimes be unavailable or change. We may update these terms; if a change matters to you we'll tell you in the app or by email before it applies. Using Planyt after that means you accept the new terms.</p>
      </Section>

      <Section id="liability" title="11. Liability">
        <p>To the extent the law allows, Planyt is not liable for indirect or consequential loss, or for how an organizer runs an event (including cancellations and refunds). Our total liability to you for any claim is limited to what you paid Planyt in the 12 months before it. Nothing here limits liability that cannot be limited by law.</p>
        <p>You agree to cover Planyt for claims caused by your breach of these terms or misuse of the service.</p>
      </Section>

      <Section id="ending" title="12. Ending your account">
        <p>You can stop using Planyt at any time and ask us to delete your account at <a href="mailto:contact@planyt.in">contact@planyt.in</a>. We may suspend or close accounts that break these terms. Event data you're part of is still deleted on the 90-day schedule.</p>
      </Section>

      <Section id="law" title="13. Governing law">
        <p>These terms are governed by the laws of India. Courts in Karnataka, India have exclusive jurisdiction.</p>
      </Section>

      <Section id="contact" title="14. Contact" last>
        <p>Questions about these terms: <a href="mailto:contact@planyt.in">contact@planyt.in</a>.</p>
      </Section>
    </LegalLayout>
  );
}
