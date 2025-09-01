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
  disabled?: boolean;
}

const buttonVariants = cva(
  "w-full rounded-lg hover:cursor-pointer disabled:cursor-not-allowed text-sm flex items-center justify-center disabled:opacity-70",
  {
    variants: {
      variant: {
        auth: "dark:bg-stone-900 bg-blue-500 hover:bg-blue-600 dark:hover:bg-stone-800 text-stone-100 py-3 font-semibold",
        secondary:
          "dark:bg-white bg-stone-900 hover:bg-stone-800 text-white dark:text-stone-800 font-semibold py-3 dark:hover:bg-stone-100",
        outline: "border rounded-md px-1",
        ["table-add"]:
          "border rounded-md px-3 py-2 bg-stone-900 text-stone-100 dark:bg-white dark:hover:bg-stone-100 dark:text-black font-semibold text-xs",
        next: "dark:bg-white dark:hover:bg-stone-200 py-2 text-xs rounded-sm dark:text-stone-800 bg-stone-800 hover:bg-stone-700 text-white",
        cancel:
          "border hover:bg-stone-200 dark:hover:bg-stone-700 dark:border-white py-2 text-xs rounded-sm",
        icon: "p-1.5 hover:border border-stone-400 dark:text-stone-400 text-stone-400 dark:border-stone-500 ",
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
  disabled,
}: IButton) => {
  return (
    <button
      onClick={handler}
      type={buttonType}
      disabled={disabled}
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
