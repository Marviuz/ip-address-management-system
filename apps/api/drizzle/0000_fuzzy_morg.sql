CREATE TABLE "account" (
	"id" integer PRIMARY KEY NOT NULL,
	"publicId" varchar NOT NULL,
	"provider" varchar NOT NULL,
	"providerAccountId" varchar NOT NULL,
	"refresh_token" varchar,
	"access_token" varchar,
	"expires_at" integer,
	"user_id" integer NOT NULL,
	"created_at" timestamp with time zone,
	CONSTRAINT "account_publicId_unique" UNIQUE("publicId")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" integer PRIMARY KEY NOT NULL,
	"publicId" varchar NOT NULL,
	"username" varchar,
	"given_name" varchar,
	"family_name" varchar,
	"email" varchar,
	"created_at" timestamp with time zone,
	CONSTRAINT "user_publicId_unique" UNIQUE("publicId")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;