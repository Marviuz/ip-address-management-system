CREATE TABLE "account" (
	"id" integer PRIMARY KEY NOT NULL,
	"publicId" varchar NOT NULL,
	"provider" varchar NOT NULL,
	"providerAccountId" varchar NOT NULL,
	"refresh_token" varchar,
	"access_token" varchar,
	"expires_at" integer,
	"userId" integer NOT NULL,
	"created_at" timestamp with time zone,
	CONSTRAINT "account_publicId_unique" UNIQUE("publicId")
);
--> statement-breakpoint
ALTER TABLE "users" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "users_publicId_unique";--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_publicId_unique" UNIQUE("publicId");