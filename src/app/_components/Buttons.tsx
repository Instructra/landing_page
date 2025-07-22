export interface IButtonProps {
  text: string | null;
  buttonType: ButtonType;
}
export enum ButtonType {
  Primary = "PRIMARY",
  Secondary = "SECONDARY",
  Other = "Other",
}
export function Buttons(props: IButtonProps) {
  return (
    <button
      className={`${
        props.buttonType == ButtonType.Primary
          ? "bg-primary text-white"
          : props.buttonType == ButtonType.Secondary
            ? "text-text-primary border-border border-2 bg-white"
            : ""
      } rounded-full px-6 py-3`}
    >
      {props.text}
    </button>
  );
}
