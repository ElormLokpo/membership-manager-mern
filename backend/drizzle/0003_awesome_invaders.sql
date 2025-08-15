ALTER TABLE "staff" RENAME COLUMN "userid" TO "userId";--> statement-breakpoint
ALTER TABLE "staff" DROP CONSTRAINT "staff_userid_users_id_fk";
--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;