CREATE TYPE "public"."employmentType" AS ENUM('FULL-TIME', 'PART-TIME', 'CONTRACT');--> statement-breakpoint
CREATE TYPE "public"."position" AS ENUM('FRONTDESK');--> statement-breakpoint
CREATE TYPE "public"."shift" AS ENUM('MORNING', 'AFTERNOON', 'EVENING');--> statement-breakpoint
CREATE TABLE "staff" (
	"staffId" uuid PRIMARY KEY NOT NULL,
	"userid" uuid,
	"position" "position" DEFAULT 'FRONTDESK',
	"employmentType" "employmentType" DEFAULT 'FULL-TIME',
	"shift" "shift" DEFAULT 'MORNING',
	"hireDate" date,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'ADMIN'::text;--> statement-breakpoint
DROP TYPE "public"."role";--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('ADMIN', 'STAFF', 'MEMBER');--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'ADMIN'::"public"."role";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DATA TYPE "public"."role" USING "role"::"public"."role";--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_userid_users_id_fk" FOREIGN KEY ("userid") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "establishments" ADD CONSTRAINT "establishments_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;