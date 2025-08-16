ALTER TABLE "membership" ALTER COLUMN "startDate" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "membership" ALTER COLUMN "startDate" SET DEFAULT now();