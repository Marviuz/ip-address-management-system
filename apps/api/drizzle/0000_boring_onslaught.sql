CREATE TABLE "account" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_id" varchar NOT NULL,
	"provider" varchar NOT NULL,
	"provider_account_id" varchar NOT NULL,
	"refresh_token" varchar,
	"access_token" varchar,
	"expires_at" integer,
	"user_id" integer NOT NULL,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	CONSTRAINT "account_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_id" varchar NOT NULL,
	"username" varchar,
	"given_name" varchar,
	"middle_name" varchar,
	"family_name" varchar,
	"email" varchar,
	"created_at" timestamp with time zone,
	"updated_at" timestamp with time zone,
	CONSTRAINT "user_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;