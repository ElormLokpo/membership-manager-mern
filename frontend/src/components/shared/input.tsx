import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactElement } from "react";
import { Typography } from "./typography";
import type {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface IInput extends VariantProps<typeof inputVariants> {
  className?: string;
  inputTpye: string;
  labelText?: string;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  name: string;
}

const inputVariants = cva(
  "border border-stone-200 focus:outline-stone-300 w-full rounded-md text-xs px-2",
  {
    variants: {
      variant: {
        auth: `py-3 `,
      },
    },
    defaultVariants: {
      variant: "auth",
    },
  }
);

export const Input = ({
  className,
  variant,
  inputTpye = "text",
  labelText,
  register,
  name,
  errors,
}: IInput) => {
  const inputTypes: Record<string, ReactElement> = {
    text: (
      <div className="flex flex-col">
        {labelText && (
          <label className="">
            <Typography size={"xs"} text={labelText} />
          </label>
        )}
        <input
          {...(register ? register(name) : {})}
          className={cn(
            inputVariants({ variant }),
            className,
            errors?.[name] && "border-red-500"
          )}
        />

        {errors?.[name] && (
          <span className="mt-1">
            <p className="text-xs text-red-500">errors[name].message</p>
          </span>
        )}
      </div>
    ),
  };

  return inputTypes[inputTpye];
};
