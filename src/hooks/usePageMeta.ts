import { useEffect } from "react";

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = `${title} | Instructra`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) {
      meta.setAttribute("content", description);
    } else if (description) {
      const el = document.createElement("meta");
      el.name = "description";
      el.content = description;
      document.head.appendChild(el);
    }
  }, [title, description]);
}
