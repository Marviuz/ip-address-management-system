CREATE TABLE "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"publicId" varchar NOT NULL,
	"username" varchar,
	"given_name" varchar,
	"family_name" varchar,
	"email" varchar,
	"created_at" timestamp with time zone,
	CONSTRAINT "users_publicId_unique" UNIQUE("publicId")
);
