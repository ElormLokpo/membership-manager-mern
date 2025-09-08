import { Input } from "@/components/shared/input";
import { ThemeToggler } from "@/components/shared/themeToggler";
import { Typography } from "@/components/shared/typography";
import { useForm, useWatch } from "react-hook-form";
import { useContext, useEffect, useMemo, useState } from "react";
import { CreateEstablishmentTopNav, FormButtons } from "./components";
import { CreateEstContext, useCreateEstContext } from "./context";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactInfoSchema,
  FullEstablishmentFormSchema,
  GeneralInfoSchema,
  OperationInfoSchema,
  type ContactInfoType,
  type FullEstablishmentType,
  type GeneralInfoType,
  type OperationInfoType,
} from "@/schema/establishmentSchema";
import type { CreateEstablishmentType } from "@/types";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux";
import { useCreateEstablishment } from "@/hooks/establishmentHook";
import { Button } from "@/components/shared/button";
import { ModalContext, type IModalContext } from "@/context/ModalContext";
import { ModalTop } from "@/components/shared/sheet";

export const CreateEstablishmentPage = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number>(0);
  const [establishmentData, setEstablishmentData] = useState<
    CreateEstablishmentType | object
  >({});

  const memoContextData = useMemo(
    () => ({
      activeIndex,
      setActiveIndex,
      setCompletedSteps,
      completedSteps,
      establishmentData,
      setEstablishmentData,
    }),
    [activeIndex, setActiveIndex, establishmentData, completedSteps]
  );

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <div className="mb-3">
          <ThemeToggler />
        </div>

        <div className="w-[27rem]">
          <div className="flex flex-col gap-1 mb-2">
            <Typography
              className="font-semibold"
              text="Create new establishment"
            />
            <Typography
              className="dark:text-stone-400"
              text="Kindly fill the form below to create your establishment."
            />
          </div>

          <CreateEstContext.Provider value={memoContextData}>
            <div className="mb-5">
              <CreateEstablishmentTopNav />
            </div>

            <div>
              <GeneralInfoForm />
              <ContactInfoForm />
              <OperationInfoForm />
            </div>
          </CreateEstContext.Provider>
        </div>
      </div>
    </div>
  );
};

const GeneralInfoForm = () => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(GeneralInfoSchema),
  });

  const {
    activeIndex,
    setActiveIndex,
    setEstablishmentData,
    setCompletedSteps,
  } = useCreateEstContext();

  const submitHandler = (data: GeneralInfoType) => {
    if (activeIndex >= 3) {
      return;
    }
    setEstablishmentData((prev: Partial<CreateEstablishmentType>) => ({
      ...prev,
      ...data,
    }));

    setCompletedSteps(1);
    setActiveIndex(activeIndex + 1);
  };

  const formValues = useWatch({ control });

  useEffect(() => {
    setEstablishmentData((prev: Partial<CreateEstablishmentType>) => ({
      ...prev,
      ...formValues,
    }));
  }, [formValues, setEstablishmentData]);

  return (
    <>
      <form
        style={{ display: `${activeIndex == 1 ? " " : "none"}` }}
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="grid grid-cols-2 gap-2">
          <div className="mb-3">
            <Input
              inputType="text"
              variant={"form"}
              placeholder="E.g Wenner Golf Course"
              labelText="Establishment name:"
              register={register}
              errors={errors}
              name="name"
            />
          </div>

          <div className="mb-3">
            <Input
              inputType="text"
              variant={"form"}
              placeholder="E.g Library"
              labelText="Establishment type:"
              register={register}
              errors={errors}
              name="type"
            />
          </div>
        </div>

        <div className="mb-3">
          {" "}
          <div className="">
            <Input
              inputType="text"
              variant={"form"}
              placeholder=""
              labelText="Franchise name:"
              register={register}
              errors={errors}
              name="franchiseName"
            />
          </div>
          <div>
            <Typography
              className="dark:text-stone-400"
              text="If you have multiple establishments under one franchise or administration, kindly enter name above."
              size={"xs"}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <FormButtons />
        </div>
      </form>
    </>
  );
};

const ContactInfoForm = () => {
  const {
    register,
    formState: { errors },

    control,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(ContactInfoSchema),
  });

  const {
    activeIndex,
    setActiveIndex,
    setEstablishmentData,
    setCompletedSteps,
  } = useCreateEstContext();

  const submitHandler = (data: ContactInfoType) => {
    if (activeIndex >= 3) {
      return;
    }
    setActiveIndex(activeIndex + 1);

    setEstablishmentData((prev: Partial<CreateEstablishmentType>) => ({
      ...prev,
      ...data,
    }));

    setCompletedSteps(2);
  };

  const formValues = useWatch({ control });

  useEffect(() => {
    setEstablishmentData((prev: Partial<CreateEstablishmentType>) => ({
      ...prev,
      ...formValues,
    }));
  }, [formValues, setEstablishmentData]);

  return (
    <>
      <form
        style={{ display: `${activeIndex == 2 ? " " : "none"}` }}
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="mb-2">
          <Typography
            size={"xs"}
            className="font-semibold"
            text="Contact information"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="mb-3">
            <Input
              inputType="text"
              variant={"form"}
              placeholder=""
              labelText="Establishment email:"
              register={register}
              errors={errors}
              name="contactInfo.email"
            />
          </div>

          <div className="mb-3">
            <Input
              inputType="text"
              variant={"form"}
              placeholder=""
              labelText="Establishment phone:"
              register={register}
              errors={errors}
              name="contactInfo.phone"
            />
          </div>
        </div>

        <div className="mb-6">
          <Input
            inputType="text"
            variant={"form"}
            placeholder=""
            labelText="Establishment website (if any):"
            register={register}
            errors={errors}
            name="contactInfo.website"
          />
        </div>

        <div className="mb-2">
          <Typography
            size={"xs"}
            className="font-semibold"
            text="Location information"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="mb-3">
            <Input
              inputType="text"
              variant={"form"}
              placeholder=""
              labelText="Country:"
              register={register}
              errors={errors}
              name="locationInfo.country"
            />
          </div>

          <div className="mb-3">
            <Input
              inputType="text"
              variant={"form"}
              placeholder=""
              labelText="City:"
              register={register}
              errors={errors}
              name="locationInfo.city"
            />
          </div>
          <div className="mb-3">
            <Input
              inputType="text"
              variant={"form"}
              placeholder=""
              labelText="Address:"
              register={register}
              errors={errors}
              name="locationInfo.address"
            />
          </div>
        </div>

        <div className="mb-6">
          <Input
            inputType="text"
            variant={"form"}
            placeholder=""
            labelText="Nearest landmark:"
            register={register}
            errors={errors}
            name="locationInfo.landmark"
          />
        </div>

        <div className="flex justify-end">
          <FormButtons />
        </div>
      </form>
    </>
  );
};

const OperationInfoForm = () => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(OperationInfoSchema),
  });

  const ownerId = useSelector((store: RootState) => store.authReducer.user?.id);

  const { activeIndex, establishmentData, setEstablishmentData } =
    useCreateEstContext();

  const { mutate: createEstablishment, isPending } = useCreateEstablishment();

  const submitHandler = async (data: OperationInfoType) => {
    if (ownerId) {
      console.log("DATA", { ...establishmentData, ...data, ownerId });
      createEstablishment({ ...establishmentData, ...data, ownerId });
    }
  };

  const formValues = useWatch({ control });

  useEffect(() => {
    setEstablishmentData((prev: Partial<CreateEstablishmentType>) => ({
      ...prev,
      ...formValues,
    }));
  }, [formValues, setEstablishmentData]);

  return (
    <>
      <form
        style={{ display: `${activeIndex == 3 ? " " : "none"}` }}
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="">
          <div className="mb-3">
            <Input
              inputType="text"
              variant={"form"}
              placeholder="E.g 4pm - 5pm , Mon - Fri "
              labelText="Operating hours and days:"
              register={register}
              errors={errors}
              name="operatingHours"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="mb-3">
            <Input
              inputType="text"
              variant={"form"}
              placeholder=""
              labelText="Maximum number of members:"
              register={register}
              errors={errors}
              name="capacityMetrics.maxMembers"
            />
          </div>

          <div className="mb-3">
            <Input
              inputType="text"
              variant={"form"}
              placeholder=""
              labelText="Maximum daily visitors:"
              register={register}
              errors={errors}
              name="capacityMetrics.maxDailyVisitors"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <FormButtons isLoading={isPending} />
        </div>
      </form>
    </>
  );
};

export const CreateEstablishmentModal = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(FullEstablishmentFormSchema),
  });

  const ownerId = useSelector((store: RootState) => store.authReducer.user?.id);

  const { setModal } = useContext(ModalContext) as IModalContext;

  const { mutate: createEstablishment, isPending } = useCreateEstablishment();

  const submitHandler = async (data: FullEstablishmentType) => {
    if (ownerId) {
      console.log("DATA", { ...data, ownerId });
      createEstablishment({ ...data, ownerId });
      setModal(null);
    }
  };

  return (
    <div
      className="p-5 rounded-md"
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
      }}
    >
      <div>
        <ModalTop
          title="Create Establishment"
          subTitle="Kindly fill the form below with your establishment details."
        />
      </div>
      <>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div>
            <div className="grid grid-cols-2 gap-2">
              <div className="mb-3">
                <Input
                  inputType="text"
                  variant={"form"}
                  placeholder="E.g Wenner Golf Course"
                  labelText="Establishment name:"
                  register={register}
                  errors={errors}
                  name="name"
                />
              </div>

              <div className="mb-3">
                <Input
                  inputType="text"
                  variant={"form"}
                  placeholder="E.g Library"
                  labelText="Establishment type:"
                  register={register}
                  errors={errors}
                  name="type"
                />
              </div>
            </div>

            <div className="mb-3">
              {" "}
              <div className="">
                <Input
                  inputType="text"
                  variant={"form"}
                  placeholder=""
                  labelText="Franchise name:"
                  register={register}
                  errors={errors}
                  name="franchiseName"
                />
              </div>
              <div>
                <Typography
                  className="dark:text-stone-400"
                  text="If you have multiple establishments under one franchise or administration, kindly enter name above."
                  size={"xs"}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2">
              <Typography
                size={"xs"}
                className="font-semibold"
                text="Contact information"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="mb-3">
                <Input
                  inputType="text"
                  variant={"form"}
                  placeholder=""
                  labelText="Establishment email:"
                  register={register}
                  errors={errors}
                  name="contactInfo.email"
                />
              </div>

              <div className="mb-3">
                <Input
                  inputType="text"
                  variant={"form"}
                  placeholder=""
                  labelText="Establishment phone:"
                  register={register}
                  errors={errors}
                  name="contactInfo.phone"
                />
              </div>
            </div>

            <div className="mb-6">
              <Input
                inputType="text"
                variant={"form"}
                placeholder=""
                labelText="Establishment website (if any):"
                register={register}
                errors={errors}
                name="contactInfo.website"
              />
            </div>

            <div className="mb-2">
              <Typography
                size={"xs"}
                className="font-semibold"
                text="Location information"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="mb-3">
                <Input
                  inputType="text"
                  variant={"form"}
                  placeholder=""
                  labelText="Country:"
                  register={register}
                  errors={errors}
                  name="locationInfo.country"
                />
              </div>

              <div className="mb-3">
                <Input
                  inputType="text"
                  variant={"form"}
                  placeholder=""
                  labelText="City:"
                  register={register}
                  errors={errors}
                  name="locationInfo.city"
                />
              </div>
              <div className="mb-3">
                <Input
                  inputType="text"
                  variant={"form"}
                  placeholder=""
                  labelText="Address:"
                  register={register}
                  errors={errors}
                  name="locationInfo.address"
                />
              </div>
            </div>

            <div className="mb-6">
              <Input
                inputType="text"
                variant={"form"}
                placeholder=""
                labelText="Nearest landmark:"
                register={register}
                errors={errors}
                name="locationInfo.landmark"
              />
            </div>
          </div>

          <div>
            <div className="">
              <div className="mb-3">
                <Input
                  inputType="text"
                  variant={"form"}
                  placeholder="E.g 4pm - 5pm , Mon - Fri "
                  labelText="Operating hours and days:"
                  register={register}
                  errors={errors}
                  name="operatingHours"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="mb-3">
                <Input
                  inputType="text"
                  variant={"form"}
                  placeholder=""
                  labelText="Maximum number of members:"
                  register={register}
                  errors={errors}
                  name="capacityMetrics.maxMembers"
                />
              </div>

              <div className="mb-3">
                <Input
                  inputType="text"
                  variant={"form"}
                  placeholder=""
                  labelText="Maximum daily visitors:"
                  register={register}
                  errors={errors}
                  name="capacityMetrics.maxDailyVisitors"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="">
              <Button
                buttonType="submit"
                isLoading={isPending}
                loadingText="Creating establishment"
                variant={"dash-def"}
                text={"Create establishment"}
              />
            </div>
          </div>
        </form>
      </>
    </div>
  );
};
