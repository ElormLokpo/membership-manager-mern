ALTER TABLE "staff" ALTER COLUMN "hireDate" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "establishmentId" uuid;--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "photo" varchar;--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_establishmentId_establishments_id_fk" FOREIGN KEY ("establishmentId") REFERENCES "public"."establishments"("id") ON DELETE cascade ON UPDATE no action;