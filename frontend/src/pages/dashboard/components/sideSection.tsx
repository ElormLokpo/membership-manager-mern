import { Typography } from "@/components/shared/typography";

export const SideSection = () => {
  return (
    <div>
      <div className="mb-3">
        <TransactionsCard />
      </div>

      <div>
        <MonthSummaryCard />
      </div>
    </div>
  );
};

const TransactionsCard = () => {
  return (
    <div className="border p-4 rounded-md">
      <div className="flex flex-col mb-3 border-b py-2">
        <Typography text="Invoices" className="font-semibold" />
        <Typography text="This week" className="" size={"xs"} />
      </div>

      {Array(8)
        .fill(4)
        .map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b py-2"
          >
            <div className="flex flex-col">
              <Typography text="Dr. Lillian Conn" className="mb-1" />
              <Typography text="lillian@gmail.com" />
            </div>

            <div className="flex gap-1">
              <Typography text="1290" />
              <Typography text="GHS" />
            </div>
          </div>
        ))}
    </div>
  );
};

const MonthSummaryCard = () => {
  return (
    <div className="border p-2 rounded-md">
      <div className="flex flex-col mb-3 border-b py-2">
        <Typography text="JULY" className="font-semibold" />
        <Typography text="This month" className="" size={"xs"} />
      </div>

      <div>
        <div className="flex justify-between items-center border-b py-2">
          <div className="flex flex-col">
            <Typography text="Recognized Revenue" className="mb-1" />
            <Typography text="Revenue from billing this month" />
          </div>

          <div className="flex gap-1">
            <Typography text="GHS" />
            <Typography text="12345" />
          </div>
        </div>
      </div>
    </div>
  );
};
