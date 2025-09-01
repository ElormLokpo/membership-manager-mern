import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { ThemeToggler } from "@/components/shared/themeToggler";
import { Typography } from "@/components/shared/typography";
import { routes } from "@/constants";
import { useRegister } from "@/hooks/authHook";
import { RegisterSchema, type RegisterType } from "@/schema/authSchema";
import type { IRegisterRequest } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

export const RegisterPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(RegisterSchema),
  });

  const { mutate: registerMutate, isPending } = useRegister();

  const submitHandler = (data: RegisterType) => {
  
    const finalData: IRegisterRequest = {
      fullname: data.firstname + " " + data.lastname,
      email: data.email,
      password: data.password,
      roles: [],
    };

    registerMutate(finalData);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="mb-8">
        <ThemeToggler />
      </div>

      <div>
        <div className="flex flex-col mb-5 text-center">
          <Typography
            text="Create an account"
            size={"medium-x"}
            className="font-semibold"
          />
          <Typography text="Kindly fill the form below to create an account." />
        </div>

        <div>
          <form onSubmit={handleSubmit(submitHandler)} autoComplete="false">
            <div className="grid grid-cols-2 gap-5 mb-3">
              <div>
                <Input
                  inputType="text"
                  labelText="First Name:"
                  name="firstname"
                  register={register}
                  errors={errors}
                  placeholder="First name"
                />
              </div>
              <div>
                <Input
                  inputType="text"
                  labelText="Last Name:"
                  name="lastname"
                  register={register}
                  errors={errors}
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="mb-3">
              <Input
                inputType="text"
                labelText="Email Address:"
                name="email"
                register={register}
                errors={errors}
                placeholder="someone@gmail.com"
              />
            </div>

            <div className="mb-5">
              <Input
                inputType="text"
                fieldType="password"
                labelText="Password:"
                name="password"
                register={register}
                errors={errors}
                placeholder="At least 6 characters"
              />
            </div>

            <div className="mb-2">
              <div className="mb-3">
                <Button
                  isLoading={isPending}
                  loadingText="Creating your account..."
                  buttonType="submit"
                  variant={"secondary"}
                  text="Create account"
                />
              </div>

              <div className="flex justify-center items-center mb-3">
                <p className="text-xs">Or</p>
              </div>

              <div>
                <Button icon={<FcGoogle />} text="Continue with google" />
              </div>
            </div>

            <div className="text-center">
              <Typography text="Already have an account?" />{" "}
              <Link to={routes["auth.login"]}>
                <Typography text="Login" className="underline" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
