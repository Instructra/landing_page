"use client";

import { useYieldContext } from "~/contexts/YieldContext";
import { Buttons, ButtonType } from "./Buttons";

export default function HomeCallToAction() {
  const { openVideo } = useYieldContext();

  return (
    <div className="tb:flex-row tb:justify-center tb:items-center tb:row-start-3 l:row-start-4 l:row-span-1 l:col-start-1 l:col-span-3 l:justify-start tb:row-span-1 row-span-1 flex flex-col gap-4">
      <Buttons
        text={"Join the wait list"}
        buttonType={ButtonType.Primary}
        iconText={null}
        classNames={null}
        clickEvent={null}
      />
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
    </div>
  );
}
