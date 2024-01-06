CREATE TABLE IF NOT EXISTS "Buy" (
	"buyer_email" varchar NOT NULL,
	"date" timestamp (0) with time zone DEFAULT now() NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"product_sku" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Chat" (
	"date" timestamp (0) with time zone DEFAULT now() NOT NULL,
	"message" varchar NOT NULL,
	"user_receiver_email" varchar NOT NULL,
	"user_sender_email" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Exchange" (
	"date" timestamp (0) with time zone DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"message" varchar NOT NULL,
	"first_product_sku" integer NOT NULL,
	"second_product_sku" integer NOT NULL,
	"resolve_date" timestamp (0) with time zone,
	"status" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Product" (
	"description" varchar(10000) DEFAULT '' NOT NULL,
	"name" varchar(100) DEFAULT '' NOT NULL,
	"owner_email" varchar NOT NULL,
	"price" integer NOT NULL,
	"quantity" integer DEFAULT 0 NOT NULL,
	"sku" serial PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Rating" (
	"comment1" varchar NOT NULL,
	"comment2" varchar NOT NULL,
	"comment3" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"owner_email" varchar NOT NULL,
	"stars1" integer NOT NULL,
	"stars2" integer NOT NULL,
	"stars3" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "User" (
	"address" varchar DEFAULT '' NOT NULL,
	"city" varchar DEFAULT '' NOT NULL,
	"country" varchar DEFAULT '' NOT NULL,
	"email" varchar PRIMARY KEY NOT NULL,
	"name" varchar DEFAULT '' NOT NULL,
	"phone" varchar DEFAULT '' NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Buy" ADD CONSTRAINT "Buy_buyer_email_User_email_fk" FOREIGN KEY ("buyer_email") REFERENCES "User"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Buy" ADD CONSTRAINT "Buy_product_sku_Product_sku_fk" FOREIGN KEY ("product_sku") REFERENCES "Product"("sku") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Chat" ADD CONSTRAINT "Chat_user_receiver_email_User_email_fk" FOREIGN KEY ("user_receiver_email") REFERENCES "User"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Chat" ADD CONSTRAINT "Chat_user_sender_email_User_email_fk" FOREIGN KEY ("user_sender_email") REFERENCES "User"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_first_product_sku_Product_sku_fk" FOREIGN KEY ("first_product_sku") REFERENCES "Product"("sku") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Exchange" ADD CONSTRAINT "Exchange_second_product_sku_Product_sku_fk" FOREIGN KEY ("second_product_sku") REFERENCES "Product"("sku") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Product" ADD CONSTRAINT "Product_owner_email_User_email_fk" FOREIGN KEY ("owner_email") REFERENCES "User"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Rating" ADD CONSTRAINT "Rating_owner_email_User_email_fk" FOREIGN KEY ("owner_email") REFERENCES "User"("email") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
