import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

interface ITypography extends VariantProps<typeof typographyVariants> {
  text: string;
  className?: string;
}

const typographyVariants = cva("text-stone-800 dark:text-stone-100", {
  variants: {
    variant: {
      default: "",
    },
    size: {
      ["3xl"]: "text-[48px]",
      ["2xl"]: "text-[40px]",
      ["xl"]: "text-[32px]",
      ["medium"]: "text-[15px]",
      ["medium-x"]: "text-[18px]",

      ["regular"]: "text-sm",
      ["xs"]:"text-xs"
    },
  },
  defaultVariants: {
    size: "regular",
  },
});

export const Typography = ({ variant, text, size, className }: ITypography) => {
  return (
    <span className={cn(typographyVariants({ variant, size }), className)}>
      {text}
    </span>
  );
};
