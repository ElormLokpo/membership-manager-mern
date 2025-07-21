import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactElement } from "react";
import { Loader } from "../ui/loaders";

interface IButton extends VariantProps<typeof buttonVariants> {
  className?: string;
  icon?: ReactElement;
  text?: string;
  isLoading?: boolean;
  loadingText?: string;
  buttonType?: "submit" | "reset" | "button" | undefined;
  handler?: () => void;
}

const buttonVariants = cva(
  "w-full rounded-lg hover:cursor-pointer text-sm flex items-center justify-center",
  {
    variants: {
      variant: {
        auth: "bg-stone-900 hover:bg-stone-800 text-stone-100 py-3 font-semibold",
        secondary:
          "bg-lime-500 text-stone-800 font-semibold py-3 hover:bg-lime-400",
      },
    },
    defaultVariants: {
      variant: "auth",
    },
  }
);

export const Button = ({
  className,
  variant,
  icon,
  text,
  isLoading,
  loadingText,
  buttonType = "button",
  handler,
}: IButton) => {
  return (
    <button
      onClick={handler}
      type={buttonType}
      className={cn(buttonVariants({ variant }), className)}
    >
      {isLoading ? (
        <span className="flex gap-2 items-center">
          <Loader loading={true} />
          {loadingText}
        </span>
      ) : (
        <div className="flex gap-2 items-center">
          {icon && icon}
          {text && text}
        </div>
      )}
    </button>
  );
};
