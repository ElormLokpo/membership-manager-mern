ALTER TABLE "staff" DROP CONSTRAINT "staff_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "staff" ADD CONSTRAINT "staff_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;