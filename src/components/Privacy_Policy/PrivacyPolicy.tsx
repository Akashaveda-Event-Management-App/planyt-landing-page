import { APP_URL } from "../landing/link";
import LegalLayout, { LegalSection as Section } from "../LegalLayout";

/**
 * Privacy policy: what Planyt collects, why, who sees it, how long it's kept and your rights
 * (India's DPDP Act). Kept in step with the Terms (retention, sharing, cookies) and with
 * em-frontend (src/components/Privacy_Policy/PrivacyPolicy.jsx).
 */
const TOC = [
  ["summary", "The short version"],
  ["collect", "1. What we collect"],
  ["use", "2. Why we use it"],
  ["share", "3. Who sees it"],
  ["cookies", "4. Cookies and storage on your device"],
  ["retention", "5. How long we keep it"],
  ["rights", "6. Your rights and choices"],
  ["security", "7. Keeping it safe"],
  ["age", "8. Age"],
  ["changes", "9. Changes to this policy"],
  ["contact", "10. Contact and grievances"],
];

const Table = ({ rows, head }: { rows: string[][]; head: string[] }) => (
  <div className="overflow-x-auto rounded-2xl border border-[#e4e8ef]">
    <table className="w-full text-[14px] leading-6">
      <thead className="bg-[#f6f8fb] text-left text-[#111826]"><tr>{head.map((h) => <th key={h} className="px-4 py-2.5 font-semibold">{h}</th>)}</tr></thead>
      <tbody className="divide-y divide-[#e4e8ef]">{rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i} className={`px-4 py-2.5 align-top ${i === 0 ? "font-semibold text-[#111826] whitespace-nowrap" : ""}`}>{c}</td>)}</tr>)}</tbody>
    </table>
  </div>
);

export default function PrivacyPolicy({ isModal = false }: { isModal?: boolean }) {
  return (
    <LegalLayout isModal={isModal} title="Privacy policy" updated="Last updated: 22 October 2026" toc={TOC}>
      <Section id="summary" title="The short version">
        <ul className="list-disc pl-6 space-y-1.5">
          <li>We collect what's needed to run events: your account, your registrations and passes, check-ins, and what you submit or upload.</li>
          <li>The organizers of the events you join see your event details. Nobody else does, apart from the services that run Planyt for us.</li>
          <li>We never sell your data or use it for advertising.</li>
          <li>Personal event data is deleted from our active systems 90 days after the event ends.</li>
          <li>Only necessary cookies are on by default; everything else waits for your OK.</li>
        </ul>
      </Section>

      <Section id="collect" title="1. What we collect">
        <Table head={["What", "Details", "Where it comes from"]} rows={[
          ["Account", "Name, email, phone, organisation, designation, country, profile photo, password (stored hashed), consents", "You, or Google if you sign up with Google (name, email, photo)"],
          ["Registrations", "The events you register for, your pass type, answers to the event's registration form, payment status and reference", "You, the organizer, our payment partner"],
          ["Passes and check-ins", "Your pass QR code, when and where it was scanned, by which station or staff member", "Event scanners (they may scan offline and sync later)"],
          ["Papers and reviews", "Submissions, co-authors, files, reviews and decisions", "Authors, reviewers, organizers"],
          ["Messages and engagement", "Chat and networking messages, questions in live Q&A, saved sessions", "You and the people you talk to"],
          ["Uploads", "Slides, photos, logos, documents", "You"],
          ["Usage and devices", "Sign-in times, IP address, browser and device, errors", "Your browser"],
        ]} />
      </Section>

      <Section id="use" title="2. Why we use it">
        <ul className="list-disc pl-6 space-y-1.5">
          <li><strong className="text-[#111826]">To run events</strong>: registration, passes, check-in, badges, agenda, papers, certificates and messages from organizers.</li>
          <li><strong className="text-[#111826]">To keep you signed in and safe</strong>: authentication, fraud and abuse prevention, security logs.</li>
          <li><strong className="text-[#111826]">To tell you what matters</strong>: confirmations, reminders, changes to your sessions. Marketing emails only if you opted in.</li>
          <li><strong className="text-[#111826]">To improve Planyt</strong>: anonymous usage counts, only with your OK for analytics.</li>
        </ul>
        <p>We rely on your consent (given at sign-up and in your profile) and on what's needed to provide the service you asked for. You can withdraw consent at any time; some features then stop working.</p>
      </Section>

      <Section id="share" title="3. Who sees it">
        <ul className="list-disc pl-6 space-y-1.5">
          <li><strong className="text-[#111826]">Organizers</strong> of events you register for, and the staff, volunteers and reviewers they invite, see what they need for that event.</li>
          <li><strong className="text-[#111826]">Other attendees</strong> see only what you choose to share (for example your networking profile or chat messages).</li>
          <li><strong className="text-[#111826]">Service providers</strong> that run Planyt for us and may only use data on our instructions: cloud hosting, storage and email (Amazon Web Services), event websites (Cloudflare), sign-in with Google, and our payment partner for online payments.</li>
          <li><strong className="text-[#111826]">Authorities</strong>, only when the law requires it.</li>
        </ul>
        <p>We never sell personal data and never share it for advertising.</p>
      </Section>

      <Section id="cookies" title="4. Cookies and storage on your device">
        <Table head={["Kind", "What it does", "Default"]} rows={[
          ["Necessary", "Keeps you signed in and protects forms from forgery (session and security cookies). Planyt can't work without them.", "Always on"],
          ["Preferences", "Remembers choices on this device, like dismissed tips, saved filters and studio settings.", "Off until you allow"],
          ["Analytics", "Anonymous counts of how pages are used. Never used for advertising.", "Off until you allow"],
        ]} />
        <p>Scanner devices at events also keep a list of pass codes (only scrambled fingerprints, never the codes themselves) and check-ins waiting to sync, so scanning works without internet.</p>
        <p>You can change your choice any time from Cookie settings at the bottom of any page in the Planyt app.</p>
      </Section>

      <Section id="retention" title="5. How long we keep it">
        <ul className="list-disc pl-6 space-y-1.5">
          <li><strong className="text-[#111826]">Event data</strong> (registrations, check-ins, submissions, messages tied to an event) is deleted from our active systems 90 days after the event ends.</li>
          <li><strong className="text-[#111826]">Your account</strong> stays until you ask us to delete it.</li>
          <li><strong className="text-[#111826]">Records the law requires</strong> (such as payment records) are kept for as long as the law says.</li>
          <li>Anonymous statistics that can't identify you may be kept longer.</li>
        </ul>
      </Section>

      <Section id="rights" title="6. Your rights and choices">
        <p>Under India's Digital Personal Data Protection Act you can:</p>
        <ul className="list-disc pl-6 space-y-1.5">
          <li>see the personal data we hold about you, and correct or update it (most of it directly in your {isModal ? "profile" : <a href={`${APP_URL}/profile-setup`}>profile</a>});</li>
          <li>ask us to delete it, or withdraw a consent you gave;</li>
          <li>nominate someone to act for you;</li>
          <li>raise a grievance with us, and then with the Data Protection Board of India.</li>
        </ul>
        <p>Write to <a href="mailto:contact@planyt.in">contact@planyt.in</a> from the email on your account. We reply as soon as we can, within the time the law allows. For data an organizer collected for their event, we'll involve the organizer.</p>
      </Section>

      <Section id="security" title="7. Keeping it safe">
        <p>Data is encrypted in transit, and passwords are stored as one-way hashes. Scanner devices hold only scrambled fingerprints of pass codes. Files are private and shared only through short-lived links. Chat messages are stored encrypted. Access inside Planyt is limited to people who need it. If a breach affects you, we'll tell you and the authorities as the law requires.</p>
      </Section>

      <Section id="age" title="8. Age">
        <p>Planyt is for people aged 18 and over. We don't knowingly collect data from children; if you think we have, tell us and we'll delete it.</p>
      </Section>

      <Section id="changes" title="9. Changes to this policy">
        <p>When we change this policy we'll update the date at the top, and tell you in the app or by email if the change affects you.</p>
      </Section>

      <Section id="contact" title="10. Contact and grievances" last>
        <p>Questions, requests and grievances: <a href="mailto:contact@planyt.in">contact@planyt.in</a>. See also our {isModal ? "Terms of service" : <a href="/terms">Terms of service</a>}.</p>
      </Section>
    </LegalLayout>
  );
}
