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
}: IButton) => {
  return (
    <button className={cn(buttonVariants({ variant }), className)}>
      {isLoading ? (
        <span className="flex gap-2 items-center">
          <Loader loading={true} />
          {loadingText}
        </span>
      ) : (
        <>
          {icon && icon}
          {text && text}
        </>
      )}
    </button>
  );
};
