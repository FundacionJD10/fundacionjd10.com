import { useState, type FormEvent } from "react";
import { useTranslation } from "@i18n/useTranslation";

export function ContactPage() {
  const { t } = useTranslation("contact");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const endpoint =
        import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT || "/api/contact";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="flex-1">
      {/* Hero band */}
      <section className="bg-[var(--color-bg-accent)] text-white px-6 lg:px-12 pb-16 lg:pb-24 pt-32">
        <div className="max-w-[1800px] mx-auto">
          <h1 className="font-heading text-display max-w-[10ch]">
            {t("page_title")}
          </h1>
        </div>
      </section>

      {/* Form section - asymmetric split */}
      <section className="py-section px-6 lg:px-12">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
          <div>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8">
              {t("intro")}
            </p>
            <div className="space-y-4 text-sm text-[var(--color-text-muted)]">
              <p>Cúcuta, Colombia</p>
              <p>contacto@fundacionjd10.com</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-2"
                >
                  {t("form_name")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full border-b border-[var(--color-border)] bg-transparent px-0 py-3 text-[var(--color-text)] focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-2"
                >
                  {t("form_email")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full border-b border-[var(--color-border)] bg-transparent px-0 py-3 text-[var(--color-text)] focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-2"
              >
                {t("form_subject")}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full border-b border-[var(--color-border)] bg-transparent px-0 py-3 text-[var(--color-text)] focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--color-text-muted)] mb-2"
              >
                {t("form_message")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full border-b border-[var(--color-border)] bg-transparent px-0 py-3 text-[var(--color-text)] focus:outline-none focus:border-primary-500 transition-colors resize-y"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-text)] text-[var(--color-bg)] text-sm font-medium tracking-wide hover:opacity-80 transition-opacity disabled:opacity-50"
            >
              {status === "sending" ? "..." : t("form_submit")}
              <span aria-hidden="true">→</span>
            </button>

            {status === "success" && (
              <p className="text-green-600 dark:text-green-400 text-sm">
                {t("form_success")}
              </p>
            )}
            {status === "error" && (
              <p className="text-red-600 dark:text-red-400 text-sm">
                {t("form_error")}
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
