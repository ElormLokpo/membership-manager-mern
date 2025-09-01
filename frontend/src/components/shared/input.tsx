import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactElement } from "react";
import { Typography } from "./typography";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface IInput<T extends FieldValues>
  extends VariantProps<typeof inputVariants> {
  className?: string;
  inputType: string;
  labelText?: string;
  register?: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  name: Path<T>;
  fieldType?: string;
  placeholder?: string;
  icon?: ReactElement;
}

const inputVariants = cva(
  "border border-stone-200 dark:border-stone-700 focus:outline-stone-300 dark:focus:outline-none w-full rounded-md text-xs px-2",
  {
    variants: {
      variant: {
        auth: `py-3 `,
        form:`py-2`,
        searchTable: `py-1 flex items-center gap-2`,
      },
    },
    defaultVariants: {
      variant: "auth",
    },
  }
);

export const Input = <T extends FieldValues>({
  className,
  variant,
  inputType = "text",
  labelText,
  register,
  name,
  errors,
  fieldType = "text",
  placeholder,
  icon,
}: IInput<T>) => {
  const inputTypes: Record<string, ReactElement> = {
    text: (
      <div className="flex flex-col">
        {labelText && (
          <label>
            <Typography
              size={"xs"}
              text={labelText}
              className={errors?.[name] && "text-red-500"}
            />
          </label>
        )}
        <input
          autoComplete="false"
          type={fieldType}
          {...(register ? register(name) : {})}
          className={cn(
            inputVariants({ variant }),
            className,
            errors?.[name] && "border-red-500 dark:border-red-500"
          )}
          placeholder={placeholder}
        />

        {errors?.[name] && (
          <span className="mt-1">
            <p className="text-xs text-red-500">
              {errors[name]?.message as string}
            </p>
          </span>
        )}
      </div>
    ),
    search: (
      <div className={cn(inputVariants({ variant }), className)}>
        {icon}
        <input className="w-full py-1 focus:outline-none" placeholder={placeholder} />
      </div>
    ),
  };

  return inputTypes[inputType];
};
