import type { MouseEventHandler } from "react";

export enum ButtonType {
  Primary = "PRIMARY",
  Secondary = "SECONDARY",
  Other = "OTHER",
}

export interface IButtonProps {
  text?: string | null;
  buttonType: ButtonType;
  iconText?: string | null;
  classNames?: string | null;
  clickEvent?: MouseEventHandler<HTMLButtonElement> | null;
  disabled: boolean;
}

export function Buttons({
  text,
  buttonType,
  iconText,
  classNames,
  disabled,
  clickEvent,
}: IButtonProps) {
  let variantClasses = "";

  switch (buttonType) {
    case ButtonType.Primary:
      variantClasses =
        disabled == false
          ? "bg-primary text-white"
          : "bg-disabled-primary text-white";
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
      className={`${variantClasses} flex items-center justify-center rounded-full px-6 py-3 ${classNames ?? ""}`}
      onClick={clickEvent ?? undefined}
      disabled={disabled}
    >
      {(buttonType === ButtonType.Secondary ||
        buttonType === ButtonType.Other) &&
        !!iconText && <span className="material-icons mr-2">{iconText}</span>}
      {!!text && text}
    </button>
  );
}
