import { business, mailtoHref, telHref } from "@/content/business";
import { services } from "@/content/services";
import { isTbd } from "@/content/types";
import { LogoLockup } from "@/design/Logo";
import { Container } from "@/design/Section";
import { DownloadIcon, MailIcon, PhoneIcon, PinIcon } from "@/design/icons";

export function SiteFooter() {
  return (
    <footer className="bg-surface-1 hairline border-t pt-16 pb-28 md:pb-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <LogoLockup />
            <p className="text-ink-muted mt-5 max-w-xs text-pretty">
              {business.tagline}
            </p>
            {/* An "add to contacts" affordance matters when the visitor met
                Kirk in person ninety seconds ago. */}
            <a
              href="/kirk.vcf"
              download
              className="hairline text-ink-muted hover:text-ink mt-6 inline-flex items-center gap-2 border px-4 py-2.5 text-sm transition-colors duration-250"
            >
              <DownloadIcon width={16} height={16} />
              Save Kirk&rsquo;s contact
            </a>
          </div>

          <div>
            <h2 className="mono-label mb-5">Services</h2>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href={`/${service.slug}/`}
                    className="text-ink-muted hover:text-ink text-[0.9375rem] transition-colors duration-250"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mono-label mb-5">Contact</h2>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={telHref}
                  className="text-ink hover:text-alert flex items-center gap-2.5 text-[0.9375rem] transition-colors duration-250"
                >
                  <PhoneIcon width={16} height={16} />
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mailtoHref()}
                  className="text-ink-muted hover:text-ink flex items-center gap-2.5 text-[0.9375rem] transition-colors duration-250"
                >
                  <MailIcon width={16} height={16} />
                  {business.email}
                </a>
              </li>
              <li className="text-ink-muted flex items-center gap-2.5 text-[0.9375rem]">
                <PinIcon width={16} height={16} />
                {business.locality}
              </li>
            </ul>
            {!isTbd(business.hours) && (
              <p className="text-ink-muted mt-4 text-sm">{business.hours}</p>
            )}
          </div>
        </div>

        <div className="hairline text-ink-icon mt-14 flex flex-col gap-3 border-t pt-7 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {business.legalName}
          </p>
          <p className="mono-label">Design · Print · Create · Repeat</p>
        </div>
      </Container>
    </footer>
  );
}
