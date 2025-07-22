export enum ButtonType {
  Primary = "PRIMARY",
  Secondary = "SECONDARY",
  Other = "OTHER",
}

export interface IButtonProps {
  text: string | null;
  buttonType: ButtonType;
}

export function Buttons({ text, buttonType }: IButtonProps) {
  const baseClasses = "rounded-full px-6 py-3";
  let variantClasses = "";

  switch (buttonType) {
    case ButtonType.Primary:
      variantClasses = "bg-primary text-white";
      break;
    case ButtonType.Secondary:
      variantClasses = "text-text-primary border-border border-2 bg-white";
      break;
    default:
      variantClasses = "";
  }

  return <button className={`${baseClasses} ${variantClasses}`}>{text}</button>;
}
