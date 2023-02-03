CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"surname" TEXT NOT NULL,
	"birthday" TIMESTAMP NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL UNIQUE,
	"typeId" int NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"updatedAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.addresses" (
	"id" serial NOT NULL,
	"userId" int NOT NULL,
	"country" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"district" TEXT NOT NULL,
	"street" TEXT,
	"number" TEXT,
	"complement" TEXT,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"updatedAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "addresses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.services" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"statusId" int NOT NULL,
	"requesterId" int NOT NULL,
	"helperId" int NOT NULL,
	"price" int NOT NULL DEFAULT '0',
	"createdAt" time with time zone NOT NULL DEFAULT 'NOW()',
	"updatedAt" time with time zone NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "services_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.sessions" (
	"id" serial NOT NULL,
	"userId" int NOT NULL,
	"token" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"updatedAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.messages" (
	"id" serial NOT NULL,
	"conversationId" int NOT NULL,
	"senderUserId" int NOT NULL,
	"recipientUserId" int NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"updatedAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"statusId" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "messages_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.conversations" (
	"id" serial NOT NULL,
	"firstUserId" int NOT NULL,
	"secondUserId" int NOT NULL,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"updatedAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"serviceId" int NOT NULL,
	CONSTRAINT "conversations_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.userTypes" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"updatedAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "userTypes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.servicesStatus" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"updatedAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "servicesStatus_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.messageStatus" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"updatedAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "messageStatus_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("typeId") REFERENCES "userTypes"("id");

ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "services" ADD CONSTRAINT "services_fk0" FOREIGN KEY ("statusId") REFERENCES "servicesStatus"("id");
ALTER TABLE "services" ADD CONSTRAINT "services_fk1" FOREIGN KEY ("requesterId") REFERENCES "users"("id");
ALTER TABLE "services" ADD CONSTRAINT "services_fk2" FOREIGN KEY ("helperId") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "messages" ADD CONSTRAINT "messages_fk0" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk1" FOREIGN KEY ("senderUserId") REFERENCES "users"("id");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk2" FOREIGN KEY ("recipientUserId") REFERENCES "users"("id");
ALTER TABLE "messages" ADD CONSTRAINT "messages_fk3" FOREIGN KEY ("statusId") REFERENCES "messageStatus"("id");

ALTER TABLE "conversations" ADD CONSTRAINT "conversations_fk0" FOREIGN KEY ("firstUserId") REFERENCES "users"("id");
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_fk1" FOREIGN KEY ("secondUserId") REFERENCES "users"("id");
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_fk2" FOREIGN KEY ("serviceId") REFERENCES "services"("id");













