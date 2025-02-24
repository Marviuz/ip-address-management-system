CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_id" varchar NOT NULL,
	"username" varchar,
	"given_name" varchar,
	"middle_name" varchar,
	"family_name" varchar,
	"email" varchar,
	"provider" varchar NOT NULL,
	"provider_id" varchar NOT NULL,
	"refresh_token" varchar,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone,
	CONSTRAINT "user_public_id_unique" UNIQUE("public_id")
);
