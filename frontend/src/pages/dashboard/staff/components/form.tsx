import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { ModalTop } from "@/components/shared/sheet";
import { Typography } from "@/components/shared/typography";
import { useCreateStaff, useGetStaff } from "@/hooks/staffHook";
import { generatePassword, getProfilePhoto } from "@/lib/utils";
import type { RootState } from "@/redux";
import { staffSchema, type staffType } from "@/schema/staffSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export const AddStaffForm = ({ staffId }: { staffId?: string }) => {
  const [generatedPassword, setGeneratedPassword] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      password: generatePassword(),
    },
  });

  const employmentTypeArr = [
    { display: "Full time", value: "FULL-TIME" },
    { display: "Part time", value: "PART-TIME" },
    { display: "Contract", value: "CONTRACT" },
  ];

  const shiftArr = [
    { display: "Morning shift", value: "MORNING" },
    { display: "Afternoon shift", value: "AFTERNOON" },
    { display: "Evening shift", value: "EVENING" },
  ];

  const staffGetResponse = useGetStaff(staffId as string);

  const staffData = staffGetResponse.data?.data[0];

  console.log("STAFF DATA", staffData);

  const positionArr = [{ display: "Front desk clerk", value: "FRONTDESK" }];

  const currentEstablishmentId = useSelector(
    (state: RootState) => state.establishmentReducer.currentEstablishmentId
  );

  const { mutate: createStaff, isPending: isCreateStaffPending } =
    useCreateStaff();

  const submitHandler = (data: staffType) => {
    const finalData = {
      authData: {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        role: "STAFF",
      },
      staffData: {
        position: data.position,
        employmentType: data.employmentType,
        shift: data.shift,
        establishmentId: currentEstablishmentId,
        photo: getProfilePhoto(),
      },
    };

    createStaff(finalData);

    console.log("FINAL DATA", finalData);
  };

  useEffect(() => {
    console.log("PASSWORD GENERATED", generatedPassword);

    reset({ password: generatedPassword });
  }, [generatedPassword, reset]);

  return (
    <div onClick={(e) => e.stopPropagation()} className="p-3">
      <div>
        <div className="flex flex-col mb-4">
          <div>
            <ModalTop
              title={staffId ? "Edit Staff" : "Create Staff"}
              subTitle="Kindly fill the form below with your staff details."
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="grid grid-cols-2 gap-3">
            <Input
              name="fullname"
              register={register}
              errors={errors}
              variant={"form"}
              labelText="Fullname:"
              placeholder="Enter fullname"
            />
            <Input
              name="email"
              register={register}
              errors={errors}
              variant={"form"}
              labelText="Email:"
              placeholder="Enter valid email"
            />
          </div>

          <div className="grid grid-cols-5 gap-1 items-end mb-2">
            <div className="col-span-4">
              <Input
                name="password"
                register={register}
                errors={errors}
                variant={"form"}
                labelText="Password:"
                // fieldType="password"
                placeholder="Password should be at least 6 characters"
              />
            </div>
            <div className="col-span-1">
              <button
                type="button"
                onClick={() => setGeneratedPassword(generatePassword())}
                className="hover:cursor-pointer"
              >
                <Typography
                  text="Generate Password"
                  className="underline font-semibold text-[0.7rem]"
                  size={"xs"}
                />
              </button>
            </div>
          </div>

          <div className="mb-3">
            <Input
              name="position"
              register={register}
              errors={errors}
              variant={"form"}
              labelText="Position:"
              placeholder="Enter position. Eg. Front desk"
              inputType="select"
              optionsArr={positionArr}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <Input
              name="employmentType"
              register={register}
              errors={errors}
              variant={"form"}
              labelText="Employment Type:"
              inputType="select"
              optionsArr={employmentTypeArr}
            />

            <Input
              name="shift"
              register={register}
              errors={errors}
              variant={"form"}
              labelText="Employment Shift:"
              inputType="select"
              optionsArr={shiftArr}
            />
          </div>

          <div className="flex justify-end">
            <div className="">
              <Button
                buttonType="submit"
                isLoading={isCreateStaffPending}
                loadingText={
                  staffId ? "Updating staff..." : "Creating staff..."
                }
                variant={"dash-def"}
                text={staffId ? "Edit staff" : "Create staff"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
