interface PrivacyPolicyProps {
  isModal?: boolean;
}

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}

function Section({ id, title, children, last }: SectionProps) {
  return (
    <div id={id} className={last ? "" : "mb-12"}>
      <h2 className="text-sm md:text-base tracking-wide uppercase text-gray-700 font-semibold mb-3">
        {title}
      </h2>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicy({ isModal = false }: PrivacyPolicyProps) {
  return (
    <>
      <div
        className={
          isModal ? "px-2 py-4" : "max-w-6xl mx-auto px-6 py-12 md:py-16"
        }
      >
        <div
          className={
            isModal
              ? "border-b border-gray-200 pb-4 mb-6"
              : "border-b border-gray-200 pb-6 mb-10"
          }
        >
          <p className="text-xs tracking-wider uppercase text-gray-500 mb-2">
            PlanYt — planyt.in
          </p>
          {isModal ? (
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              OUR PRIVACY POLICY
            </h2>
          ) : (
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
              OUR PRIVACY POLICY
            </h1>
          )}
          <p className="text-sm text-gray-500">Effective July 1, 2025</p>
        </div>

        <div
          className={
            isModal ? "flex flex-col gap-6" : "grid lg:grid-cols-12 gap-8"
          }
        >
          <aside
            className={isModal ? "hidden" : "hidden lg:block lg:col-span-4"}
          >
            <div className="sticky top-24 space-y-4">
              <div className="text-xs font-semibold text-gray-500 uppercase">
                Contents
              </div>
              <nav className="space-y-2 text-sm">
                <a
                  href="#s1"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  1. Privacy Checkup
                </a>
                <a
                  href="#s2"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  2. Information We Collect
                </a>
                <a
                  href="#s3"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  3. Things You Provide
                </a>
                <a
                  href="#s4"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  4. Activity & Usage
                </a>
                <a
                  href="#s5"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  5. Why We Collect Data
                </a>
                <a
                  href="#s6"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  6. Your Privacy Controls
                </a>
                <a
                  href="#s7"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  7. Sharing Your Information
                </a>
                <a
                  href="#s8"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  8. Security
                </a>
                <a
                  href="#s9"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  9. Export & Delete
                </a>
                <a
                  href="#s10"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  10. Retention
                </a>
                <a
                  href="#s11"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  11. Compliance
                </a>
                <a
                  href="#s12"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  12. About This Policy
                </a>
              </nav>
            </div>
          </aside>
          <div
            className={
              isModal
                ? "w-full text-gray-800 leading-7"
                : "lg:col-span-8 text-gray-800 leading-7"
            }
          >
            <p className="mb-6 text-gray-700">
              When you use our services, you're trusting us with your
              information. We understand this is a big responsibility and work
              hard to protect your information and put you in control.
            </p>
            <p className="mb-10 text-gray-700">
              This Privacy Policy is meant to help you understand what
              information we collect, why we collect it, and how you can update,
              manage, export, and delete your information.
            </p>

            <Section id="s1" title="1. Privacy Checkup">
              <p>Looking to change your privacy settings?</p>
              <ul
                style={{ paddingLeft: "20px", margin: "8px 0", color: "#444" }}
              >
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Settings / Account / Manage
                </li>
              </ul>
              <p>
                We build services that help millions of people daily to explore
                and interact with the world in new ways. Our services include:
              </p>
              <ul
                style={{ paddingLeft: "20px", margin: "8px 0", color: "#444" }}
              >
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Planyt.in, conference management platform
                </li>
              </ul>
              <p>
                You can use our services in a variety of ways to manage your
                privacy. For example, you can sign up for a PlanYt Account if
                you want to create and manage events, conferences or short
                gatherings. And you can use many PlanYt services when you're
                signed out or without creating an account at all, like searching
                on various conferences, live events etc. For our services, you
                can adjust your privacy settings to control whether we collect
                some types of data and how we use it.
              </p>
              <p>
                If you have any questions about this Privacy Policy, you can
                contact us at{" "}
                <a
                  className="text-blue-600 hover:underline"
                  href="mailto:contact@planyt.in"
                >
                  contact@planyt.in
                </a>
                .
              </p>
            </Section>

            <Section id="s2" title="2. INFORMATION PLANYT COLLECTS">
              <p>
                We want you to understand the types of information we collect as
                you use our services.
              </p>
              <p>
                We collect information to provide better services to all our
                users — from figuring out basic stuff like which language you
                speak, to more complex things like which ads you'll find most
                useful, the people who matter most to you online, or which
                YouTube videos you might like. The information PlanYt collects,
                and how that information is used, depends on how you use our
                services and how you manage your privacy controls.
              </p>
              <p>
                When you're not signed in to a PlanYt Account, we store the
                information as visitor count for services explored. This allows
                us to do things like maintain the most preferred events on the
                platform.
              </p>
              <p>
                When you're signed in, we also collect information that we store
                with your PlanYt Account, which we treat as personal
                information.
              </p>
            </Section>

            <Section id="s3" title="3. Things you create or provide to us">
              <p>
                When you create a PlanYt Account, you provide us with personal
                information that includes your name, email, contact number and a
                password. Even if you aren't signed in to a PlanYt Account, you
                might choose to provide us with information — like an email
                address to communicate with PlanYt or receive updates about our
                services.
              </p>
              <p>
                We also collect the data you create, upload, or receive from
                others when using our services. This includes things like email
                you write and receive, photos and videos you save, docs, PDFs
                and spreadsheets you upload, chats, Q&amp;A, live polls and
                feedback you make on any services.
              </p>
            </Section>

            <Section
              id="s4"
              title="4. Information we collect as you use our services"
            >
              <p style={{ fontWeight: 600 }}>Your activity</p>
              <p>
                We collect information about your activity in our services,
                which we use to do things like recommend a most relevant event.
                The activity information we collect may include:
              </p>
              <ul
                style={{ paddingLeft: "20px", margin: "16px 0", color: "#444" }}
              >
                {[
                  "Terms you search for",
                  "Events you visit",
                  "Views and interactions with content",
                  "Payment mode and related details",
                  "People with whom you communicate or share content",
                  "Activity on third-party sites and apps that use/provide our services",
                ].map((item, i) => (
                  <li key={i} style={{ marginBottom: "6px", fontSize: "15px" }}>
                    {item}
                  </li>
                ))}
              </ul>
              <p>
                If you use our services to send and receive messages, we may
                collect message log information like your phone number,
                interacting-party number, receiving-party number, forwarding
                numbers, sender and recipient email address, time and date of
                messages, routing information, and types and volumes of
                messages.
              </p>
              <p>
                You can visit your PlanYt Account to find and manage activity
                information that's saved in your account.{" "}
                <a href="/dashboard">Go to PlanYt Account</a>
              </p>
              <p style={{ fontWeight: 600, marginTop: "12px" }}>
                Your location information
              </p>
              <p>
                We do not collect location information when you use our
                services.
              </p>
            </Section>

            <Section id="s5" title="5. Why PlanYt collects data">
              <p style={{ fontWeight: 600 }}>Data Collection &amp; Purpose</p>
              <p>
                Your personal data (Name, Contact Details, Institutional
                Affiliation) is collected strictly for managing your
                participation in events (registration, communication,
                certificates, and event facilitation).
              </p>
              <p>
                <strong style={{ fontWeight: 600 }}>No Commercial Use.</strong>{" "}
                The platform acts purely as a facilitator. We will never use
                your information for targeted commercial advertising outside the
                scope of your requested events.
              </p>
              <p>
                <strong style={{ fontWeight: 600 }}>
                  Provide our services.
                </strong>{" "}
                We use your information to deliver our services, like processing
                registrations and helping organizers communicate with attendees.
              </p>
              <p>
                <strong style={{ fontWeight: 600 }}>
                  Maintain &amp; improve our services.
                </strong>{" "}
                We use your information to ensure our services are working as
                intended, such as tracking outages or troubleshooting issues
                that you report to us.
              </p>
              <p>
                <strong style={{ fontWeight: 600 }}>
                  Protect PlanYt, our users, and the public.
                </strong>{" "}
                We use information to help improve the safety and reliability of
                our services. This includes detecting, preventing, and
                responding to fraud, abuse, security risks, and technical
                issues.
              </p>
            </Section>

            <Section id="s6" title="6. Your privacy controls">
              <p>
                You have choices regarding the information we collect and how
                it's used. This section describes key controls for managing your
                privacy across our services. You can also visit account
                settings, which provides an opportunity to review and adjust
                important privacy settings.
              </p>
              <p style={{ fontWeight: 600 }}>
                Managing, reviewing, and updating your information
              </p>
              <p>
                When you're signed in, you can always review and update
                information by visiting the services you use. We also built a
                place for you to review and control information saved in your
                PlanYt Account.
              </p>
              <p style={{ fontWeight: 600 }}>Privacy controls</p>
              <p style={{ fontWeight: 600, color: "#b00000" }}>
                Activity Controls
              </p>
              <p>
                Decide what types of activity you'd like saved in your account.
                For example, if you have History turned on, your access activity
                is saved in your account so you can get better recommendations
                and remember where you left off and used to improve PlanYt
                services.
              </p>
              <p>
                <a href="/dashboard">Go to Activity Controls</a>
              </p>
              <p style={{ fontWeight: 600 }}>About you</p>
              <p>
                Manage personal info in your PlanYt Account and control who can
                see it across PlanYt services.
              </p>
              <p>
                <a href="/profile-setup">Go to About You</a>
              </p>
              <p style={{ fontWeight: 600 }}>Shared endorsements</p>
              <p>
                Choose whether your name and photo appear next to your activity,
                like reviews and recommendations.
              </p>
              <p>
                <a href="#">Go to Shared Endorsements</a>
              </p>
              <p style={{ fontWeight: 600 }}>
                Sites and apps that use PlanYt services
              </p>
              <p>
                Manage information that websites and apps using PlanYt services
                may share with PlanYt when you visit or interact with their
                services.
              </p>
              <p>
                <a href="#">
                  Go to how PlanYt uses information from sites or apps that use
                  our services
                </a>
              </p>
              <p style={{ fontWeight: 600 }}>
                Ways to review &amp; update your information
              </p>
              <p style={{ fontWeight: 600 }}>My Activity</p>
              <p>
                My Activity allows you to review and control data that's saved
                to your PlanYt Account when you're signed in and using PlanYt
                services, like searches you've done or your visits to PlanYt.
                You can browse by date and by topic, and delete all of your
                activity.
              </p>
              <p>
                <a href="/dashboard">Go to My Activity</a>
              </p>
              <p style={{ fontWeight: 600 }}>PlanYt Dashboard</p>
              <p>
                PlanYt Dashboard allows you to manage information associated
                with specific products.
              </p>
              <p>
                <a href="/dashboard">Go to Dashboard</a>
              </p>
              <p style={{ fontWeight: 600 }}>Your personal information</p>
              <p>
                Manage your contact information, such as your name, email, and
                phone number.
              </p>
              <p>
                <a href="/profile-setup">Go to Personal Info</a>
              </p>
              <p style={{ fontWeight: 600 }}>
                Exporting, removing &amp; deleting your information
              </p>
              <p>
                You can export a copy of content in your PlanYt Account if you
                want to back it up or use it with a service outside of PlanYt.
              </p>
              <p>
                <a href="#">Export your data</a>
              </p>
              <p style={{ fontWeight: 600 }}>
                To delete your information, you can:
              </p>
              <ul
                style={{ paddingLeft: "20px", margin: "8px 0", color: "#444" }}
              >
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Delete your content from specific PlanYt services
                </li>
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Search for and then delete specific items from your account
                  using My Activity
                </li>
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Delete specific PlanYt products, including your information
                  associated with those products
                </li>
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Delete your entire PlanYt Account
                </li>
              </ul>
              <p>
                <a href="#">Delete your information</a>
              </p>
            </Section>

            <Section id="s7" title="7. Sharing your information">
              <p style={{ fontWeight: 600 }}>Strict Limitations on Sharing</p>
              <p>
                We do not share your personal information with companies,
                organizations, or individuals outside of PlanYt or the specific
                event organizers you interact with.{" "}
                <strong style={{ fontWeight: 600 }}>
                  Your data will never be sold, marketed, or shared with
                  external third-parties for commercial gain.
                </strong>
              </p>
              <p>
                We will only share personal information in the following limited
                cases:
              </p>
              <p>
                <strong>With Event Organizers (With your consent)</strong>
              </p>
              <p>
                When you register for an event, we share your necessary
                registration information with the respective organizers to
                facilitate the event. We'll get your permission before sharing
                your information.
              </p>
              <p>
                <strong>For external processing</strong>
              </p>
              <p>
                We provide personal information to our trusted infrastructure
                partners (e.g., AWS) to process it for us, based strictly on our
                instructions and in compliance with this Privacy Policy and the
                DPDP Act.
              </p>
              <p>
                <strong>For legal reasons</strong>
              </p>
              <p>
                We will share personal information if we have a good-faith
                belief that disclosure of the information is reasonably
                necessary to:
              </p>
              <ul
                style={{ paddingLeft: "20px", margin: "8px 0", color: "#444" }}
              >
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Respond to any applicable law, regulation, legal process, or
                  enforceable governmental request.
                </li>
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Enforce applicable Terms of Service, including investigation
                  of potential violations.
                </li>
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Detect, prevent, or otherwise address fraud, security, or
                  technical issues.
                </li>
              </ul>
            </Section>

            <Section id="s8" title="8. Keeping your information secure">
              <p>
                We build security into our services to protect your information.
              </p>
              <p>
                All PlanYt products are built with strong security features that
                continuously protect your information. The insights we gain from
                maintaining our services help us detect and automatically block
                security threats from ever reaching you. And if we do detect
                something risky that we think you should know about, we'll
                notify you and help guide you through steps to stay better
                protected.
              </p>
              <ul
                style={{ paddingLeft: "20px", margin: "16px 0", color: "#444" }}
              >
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  We use encryption to keep your data private while in transit
                </li>
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  We offer a range of security features, like Security Checkup,
                  and 2 Step Verification to help you protect your account
                </li>
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  We review our information collection, storage, and processing
                  practices, to prevent unauthorized access to our systems
                </li>
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  We restrict access to personal information to PlanYt
                  employees, contractors, and agents who need that information
                  in order to process it
                </li>
              </ul>
            </Section>

            <Section id="s9" title="9. Exporting & deleting your information">
              <p>
                You can export a copy of your information or delete it from your
                PlanYt Account at any time.
              </p>
              <p>
                You can export a copy of content in your PlanYt Account if you
                want to back it up or use it with a service outside of PlanYt.
              </p>
              <p>
                <a className="text-blue-600 hover:underline" href="#">
                  Export your data
                </a>
              </p>
              <p style={{ fontWeight: 600 }}>
                To delete your information, you can:
              </p>
              <ul
                style={{ paddingLeft: "20px", margin: "8px 0", color: "#444" }}
              >
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Delete your content from specific PlanYt services
                </li>
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Search for and then delete specific items from your account
                  using My Activity
                </li>
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Delete specific PlanYt products, including your information
                  associated with those products
                </li>
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Delete your entire PlanYt Account
                </li>
              </ul>
              <p>
                <a className="text-blue-600 hover:underline" href="#">
                  Delete your information
                </a>
              </p>
            </Section>

            <Section id="s10" title="10. Retaining your information">
              <p>
                We retain the data we collect according to strict deletion
                policies:
              </p>
              <ul
                style={{ paddingLeft: "20px", margin: "8px 0", color: "#444" }}
              >
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  <strong style={{ fontWeight: 600 }}>
                    90-Day Retention Policy:
                  </strong>{" "}
                  Event-specific personal data collected will be permanently
                  deleted from our active servers 90 days after the conclusion
                  of the event, or within 90 days of an account deletion
                  request.
                </li>
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Some data you can delete whenever you like, such as your{" "}
                  <a
                    className="text-blue-600 hover:underline"
                    href="/profile-setup"
                  >
                    personal info
                  </a>
                </li>
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  We keep some basic account data until you delete your PlanYt
                  Account.
                </li>
              </ul>
              <p>
                When you delete data, we follow a deletion process to make sure
                that your data is safely and completely removed from our servers
                or retained only in anonymized form. We try to ensure that our
                services protect information from accidental or malicious
                deletion. Because of this, there may be delays between when you
                delete something and when copies are deleted from our active and
                backup systems.
              </p>
            </Section>

            <Section
              id="s11"
              title="11. Compliance & cooperation with regulators"
            >
              <p>
                We regularly review this Privacy Policy and make sure that we
                process your information in ways that comply with it.
              </p>
              <p style={{ fontWeight: 600 }}>Data transfers</p>
              <p>
                We use AWS cloud service to maintain your information and data
                is stored as per AWS cloud server hosting policy. When we
                receive formal written complaints, we respond by contacting the
                person who made the complaint. We work with the AWS cloud
                service representative, appropriate regulatory authorities,
                including local data protection authorities, to resolve any
                complaints regarding the transfer of your data that we cannot
                resolve with you directly.
              </p>
            </Section>

            <Section id="s12" title="12. About this policy" last>
              <p style={{ fontWeight: 600 }}>When this policy applies</p>
              <p>
                This Privacy Policy applies to all of the services offered by
                PlanYt. This Privacy Policy doesn't apply to services that have
                separate privacy policies that do not incorporate this Privacy
                Policy.
              </p>
              <p>This Privacy Policy doesn't apply to:</p>
              <ul
                style={{ paddingLeft: "20px", margin: "8px 0", color: "#444" }}
              >
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  The information practices of other companies and organizations
                  that advertise our services
                </li>
                <li style={{ marginBottom: "6px", fontSize: "15px" }}>
                  Services offered by other companies or individuals, including
                  products or sites they offer that may include PlanYt services
                  to which the policy applies, or products or sites displayed to
                  you in search results, or linked from our services
                </li>
              </ul>
              <p style={{ fontWeight: 600 }}>Changes to this policy</p>
              <p>
                We change this Privacy Policy from time to time. We will not
                reduce your rights under this Privacy Policy without your
                explicit consent. We always indicate the date the last changes
                were published and we offer access to archived versions for your
                review. If changes are significant, we'll provide a more
                prominent notice (including, for certain services, email
                notification of Privacy Policy changes).
              </p>
            </Section>
          </div>
        </div>

        <div
          style={{
            marginTop: "64px",
            paddingTop: "32px",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.7 }}>
            Questions about this policy? Contact us at{" "}
            <a href="mailto:contact@planyt.in">contact@planyt.in</a>
          </p>
          <p style={{ fontSize: "12px", color: "#bbb", marginTop: "16px" }}>
            © 2025 Planyt. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
