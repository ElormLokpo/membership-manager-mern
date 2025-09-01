import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginType } from "@/schema/authSchema";
import { Typography } from "@/components/shared/typography";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { FcGoogle } from "react-icons/fc";
import { ThemeToggler } from "@/components/shared/themeToggler";
import { Link } from "@tanstack/react-router";
import { routes } from "@/constants";
import { useLogin } from "@/hooks/authHook";

export const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const { mutate: loginMutate, isPending } = useLogin();

  const submitHandler = (data: LoginType) => {
    loginMutate(data);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="mb-8">
        <ThemeToggler />
      </div>

      <div>
        <div className="flex flex-col mb-5 text-center">
          <Typography
            text="Log into account"
            size={"medium-x"}
            className="font-semibold"
          />
          <Typography text="Kindly fill the form below to log into your account." />
        </div>

        <div>
          <form onSubmit={handleSubmit(submitHandler)} autoComplete="false">
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
                placeholder="Password"
              />
            </div>

            <div className="mb-2">
              <div className="mb-3">
                <Button
                  isLoading={isPending}
                  loadingText="Logging you in..."
                  buttonType="submit"
                  variant={"secondary"}
                  text="Login"
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
              <Typography text="Don't have an account?" />{" "}
              <Link to={routes["auth.register"]}>
                <Typography text="Create one" className="underline" />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
