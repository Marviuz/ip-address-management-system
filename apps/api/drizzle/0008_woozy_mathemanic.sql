CREATE TABLE "audit_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_id" varchar NOT NULL,
	"user_id" integer NOT NULL,
	"entity" varchar NOT NULL,
	"entity_id" integer NOT NULL,
	"action" varchar NOT NULL,
	"changes" jsonb NOT NULL,
	"ip_address" varchar,
	"user_agent" varchar,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone,
	CONSTRAINT "audit_log_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;