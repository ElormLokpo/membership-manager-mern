import { Button } from "../components/shared/button";
import { Typography } from "../components/shared/typography";

export const LandingPage = () => {
  return <div>
      <div className="border-b py-2 flex justify-between px-[20rem]">
        <div>
          <Typography text="MEMBR" className="font-semibold"/>
        </div>

        <div className="flex gap-2 items-center">
            <Button text="Login" variant={"bare"}/>

            <Button className="w-[10rem]" text="Get Started" variant={"dash-def"}/>
        </div>
      </div>
  </div>;
};
