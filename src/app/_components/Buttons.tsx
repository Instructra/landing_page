export enum ButtonType {
  Primary = "PRIMARY",
  Secondary = "SECONDARY",
  Other = "OTHER",
}

export interface IButtonProps {
  text: string | null;
  buttonType: ButtonType;
  iconText: string | null;
}

export function Buttons({ text, buttonType, iconText }: IButtonProps) {
  let variantClasses = "";

  switch (buttonType) {
    case ButtonType.Primary:
      variantClasses = "bg-primary text-white";
      break;
    case ButtonType.Secondary:
      variantClasses = "text-text-primary border-border border-2 bg-white";
      break;
    case ButtonType.Other:
      variantClasses = "text-text-primary bg-card px-3 py-[4px]";
      break;
    default:
      variantClasses = "";
  }

  return (
    <button
      className={`${variantClasses} flex justify-center rounded-full px-6 py-3`}
    >
      {buttonType == ButtonType.Secondary || buttonType == ButtonType.Other ? (
        <span className="material-icons">{iconText}</span>
      ) : null}

      {text}
    </button>
  );
}
