import { useEffect } from "react";
import { useTranslation } from "@i18n/useTranslation";

interface Props {
  url: string;
  fileName: string;
  onClose: () => void;
}

export function DocumentViewer({ url, fileName, onClose }: Props) {
  const { t } = useTranslation("common");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 lg:px-6 py-3 bg-[var(--color-bg)] border-b border-[var(--color-border)]"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm font-medium text-[var(--color-text)] truncate mr-4">
          {fileName}
        </span>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={url}
            download
            className="text-xs uppercase tracking-[0.1em] text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            {t("doc_download")} ↓
          </a>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            aria-label={t("doc_close")}
          >
            ✕
          </button>
        </div>
      </div>

      {/* PDF viewer */}
      <div className="flex-1 p-2 lg:p-6" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={url}
          title={fileName}
          className="w-full h-full rounded border border-white/10"
        />
      </div>
    </div>
  );
}
