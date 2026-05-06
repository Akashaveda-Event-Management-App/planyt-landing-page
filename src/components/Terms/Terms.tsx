interface TermsProps {
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
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

export default function Terms({ isModal = false }: TermsProps) {
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
          {isModal ? (
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              PlanYt Terms & Conditions
            </h2>
          ) : (
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
              PlanYt Terms & Conditions
            </h1>
          )}
          <p className="text-sm text-gray-500">
            Last updated: February 3, 2026
          </p>
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
                  href="#qt"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  Quick Terms
                </a>
                <a
                  href="#intro"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  Terms of Use
                </a>
                <a
                  href="#use"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  Use of Website
                </a>
                <a
                  href="#ip"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  Intellectual Property
                </a>
                <a
                  href="#feedback"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  Contact & Feedback
                </a>
                <a
                  href="#liability"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  Limitation of Liability
                </a>
                <a
                  href="#indemnity"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  Indemnification
                </a>
                <a
                  href="#law"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  Governing Law
                </a>
                <a
                  href="#contact"
                  className="block text-gray-700 hover:text-blue-600"
                >
                  Contact
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
            <Section id="qt" title="PlanYt Quick Terms">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  By clicking "Agree" or using PlanYt, you agree to our full
                  Terms and Privacy Policy.
                </li>
                <li>
                  Eligibility: You must be at least 18 years old to use this
                  platform.
                </li>
                <li>
                  <strong className="font-semibold">
                    Data Collection & Facilitation:
                  </strong>{" "}
                  We collect data strictly for managing your participation in
                  events. We act purely as a platform facilitator.
                </li>
                <li>
                  <strong className="font-semibold">
                    Data Retention (90 Days):
                  </strong>{" "}
                  All personal event data is permanently deleted from our active
                  servers 90 days after the event concludes.
                </li>
                <li>
                  <strong className="font-semibold">No Commercial Use:</strong>{" "}
                  Your data will never be sold, marketed, or shared with
                  external third-parties.
                </li>
                <li>
                  Permitted Use: Use PlanYt solely for lawful, internal business
                  or personal purposes.
                </li>
                <li>
                  Prohibited Content: Do not scrape, copy, or export our content
                  into other databases or use it to build a competitive product.
                </li>
                <li>
                  No Warranties: The app is provided "As Is." We do not
                  guarantee it will be error-free or uninterrupted.
                </li>
                <li>
                  Limited Liability: PlanYt is not liable for indirect or
                  consequential damages.
                </li>
              </ul>
            </Section>

            <Section id="intro" title="PlanYt Website Terms of Use">
              <p>
                These Website Terms of Use govern your use of the PlanYt website
                and are a legally binding agreement between you and PlanYt,
                Inc., including its subsidiaries and affiliates. By accessing,
                browsing, or using the Website, you acknowledge that you have
                read, understood, and agree to be bound by these Terms. If you
                do not agree, do not use the Website.
              </p>
              <p className="font-semibold">
                Important: These Terms contain provisions that limit our
                liability to you. We would not be able to make the site
                available without these conditions.
              </p>
            </Section>

            <Section id="use" title="1. Use of the Website">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  1.1 Eligibility: The Website is available to users 18 years of
                  age or older.
                </li>
                <li>
                  1.2 Platform Role: PlanYt functions strictly as an event
                  facilitator. Data collected is solely for registration,
                  communication, and certificates relating to the event you
                  register for.
                </li>
                <li>
                  1.3 Permitted Use: You may use the Website solely for lawful
                  purposes related to event administration and attendance.
                </li>
                <li>
                  1.4 Prohibited Activities: You may not violate laws, infringe
                  intellectual property, engage in fraudulent conduct, create
                  competitive databases, or interfere with server functionality.
                  Prohibited tools include scraping, robots, spiders, or
                  deep-linking.
                </li>
              </ul>
            </Section>

            <Section id="ip" title="2. Intellectual Property Rights">
              <p>
                All text, software, graphics, logos, and icons are the exclusive
                property of PlanYt or its licensors. You may use content solely
                for personal or legitimate internal business purposes. Resale or
                modification of content is strictly prohibited.
              </p>
            </Section>

            <Section id="feedback" title="3. Contact Forms and Feedback">
              <p>
                By submitting feedback or inquiries, you grant PlanYt a
                royalty-free, perpetual, irrevocable, worldwide license to use
                and distribute such content. Personal information is handled
                according to our Privacy Policy.
              </p>
            </Section>

            <Section id="liability" title="4. Limitation of Liability">
              <p className="uppercase tracking-wide text-gray-700 font-semibold">
                The website is provided "as is" without warranties.
              </p>
              <p>
                To the fullest extent of the law, PlanYt shall not be liable for
                any direct, indirect, incidental, or consequential damages
                arising from your use of the Website.
              </p>
            </Section>

            <Section id="indemnity" title="5. Indemnification">
              <p>
                You agree to defend and indemnify PlanYt against any claims
                arising from your use of the Website or violation of these
                Terms.
              </p>
            </Section>

            <Section id="law" title="6. Governing Law and Venue">
              <p>
                These Terms are governed by the laws of India. Any legal action
                shall be brought exclusively in the courts located in Bangalore,
                Karnataka, India.
              </p>
            </Section>

            <Section id="contact" title="7. Contact Information" last>
              <p>
                Email:{" "}
                <a
                  className="text-blue-600 hover:underline"
                  href="mailto:contact@planyt.in"
                >
                  contact@planyt.in
                </a>
              </p>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}
