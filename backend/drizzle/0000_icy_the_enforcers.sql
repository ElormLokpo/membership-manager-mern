CREATE TYPE "public"."role" AS ENUM('ADMIN', 'FRONTDESK', 'MEMBER');--> statement-breakpoint
CREATE TYPE "public"."establishmentStatus" AS ENUM('ACTIVE', 'INACTIVE');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"fullname" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"role" "role" DEFAULT 'ADMIN',
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "establishments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"franchiseName" varchar,
	"type" varchar,
	"contactInfo" jsonb,
	"locationInfo" jsonb,
	"establishmentStatus" "establishmentStatus" DEFAULT 'ACTIVE',
	"operatingHours" varchar,
	"ownerId" uuid,
	"capacityMetrics" jsonb,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
