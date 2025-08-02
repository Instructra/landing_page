"use client";

import { useYieldContext } from "~/contexts/YieldContext";
import { Buttons, ButtonType } from "./Buttons";

export default function HowItWorksCallToAction() {
  const { openVideo } = useYieldContext();

  return (
    <Buttons
      text={"What is Instructra"}
      buttonType={ButtonType.Secondary}
      iconText={"arrow_right"}
      classNames={null}
      clickEvent={() =>
        openVideo(
          "https://hncbsyyhcafzhkqlolkd.supabase.co/storage/v1/object/public/landingpage/how_instructra_works.mp4",
        )
      }
    />
  );
}
