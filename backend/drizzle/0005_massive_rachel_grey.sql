CREATE TYPE "public"."billingCycle" AS ENUM('MONTHLY', 'YEARLY');--> statement-breakpoint
CREATE TYPE "public"."membershipStatus" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED');--> statement-breakpoint
CREATE TYPE "public"."paymentStatus" AS ENUM('PAID', 'PENDING', 'OVERDUE');--> statement-breakpoint
CREATE TABLE "membership" (
	"membershipId" uuid PRIMARY KEY NOT NULL,
	"userId" uuid,
	"joinDate" timestamp DEFAULT now(),
	"membershipStatus" "membershipStatus" DEFAULT 'ACTIVE',
	"planName" varchar,
	"billingCycle" "billingCycle" DEFAULT 'MONTHLY',
	"durationMonths" integer DEFAULT 30,
	"pricePerMonth" double precision,
	"currency" varchar,
	"startDate" timestamp DEFAULT now(),
	"endDate" date,
	"autoRenew" boolean,
	"paymentStatus" "paymentStatus" DEFAULT 'PENDING',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "membership" ADD CONSTRAINT "membership_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;