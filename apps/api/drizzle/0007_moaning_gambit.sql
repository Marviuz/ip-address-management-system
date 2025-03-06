CREATE TABLE "network_address" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_id" varchar NOT NULL,
	"network_address" varchar NOT NULL,
	"label" varchar NOT NULL,
	"comments" varchar,
	"added_by" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone,
	CONSTRAINT "network_address_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
ALTER TABLE "network_address" ADD CONSTRAINT "network_address_added_by_user_id_fk" FOREIGN KEY ("added_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;