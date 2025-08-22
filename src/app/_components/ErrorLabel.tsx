export function ErrorLabel(text: string) {
  return (
    <p className="text-error-600 bg-error-100 flex items-center gap-2 rounded-full px-3 py-2 text-sm">
      <span className="icon-[ic--baseline-cancel] text-error-600"></span>
      {text}
    </p>
  );
}
