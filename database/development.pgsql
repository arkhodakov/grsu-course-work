CREATE TYPE "issues_priorities" AS ENUM (
  'HIGH',
  'MEDIUM',
  'LOW'
);

CREATE TYPE "issues_status" AS ENUM (
  'TO_DO',
  'IN_PROGRESS',
  'DONE'
);

CREATE TYPE "notification_status" AS ENUM (
  'CREATED',
  'UPDATED',
  'COMMENTED',
  'ASSIGNED',
  'CLOSED'
);

CREATE TABLE IF NOT EXISTS "accounts" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar UNIQUE NOT NULL,
  "name" varchar NOT NULL,
  "password" varchar NOT NULL,
  "created_at" date DEFAULT (now()),
  "last_login_at" date DEFAULT (now()),
  "role" int
);

CREATE TABLE IF NOT EXISTS "roles" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar NOT NULL,
  "description" varchar
);

CREATE TABLE IF NOT EXISTS "projects" (
  "id" SERIAL PRIMARY KEY,
  "business_id" int UNIQUE NOT NULL,
  "name" varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS "issues" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "content" varchar NOT NULL,
  "priority" issues_priorities,
  "status" issues_status,
  "creator" int,
  "created_at" date DEFAULT (now()),
  "assignee" int,
  "due_date" date DEFAULT (now())
);

CREATE TABLE IF NOT EXISTS "comments" (
  "id" SERIAL PRIMARY KEY,
  "issues_id" int,
  "account_id" int,
  "created_at" date DEFAULT (now()),
  "content" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "notifications" (
  "id" SERIAL PRIMARY KEY,
  "issues_id" int,
  "related_to" int,
  "content" text NOT NULL,
  "status" notification_status
);

CREATE TABLE IF NOT EXISTS "issues_list" (
  "project_id" int,
  "issue_id" int,
  PRIMARY KEY("project_id", "issue_id")
);

ALTER TABLE "accounts" ADD FOREIGN KEY ("role") REFERENCES "roles" ("id");

ALTER TABLE "issues" ADD FOREIGN KEY ("creator") REFERENCES "accounts" ("id");

ALTER TABLE "issues" ADD FOREIGN KEY ("assignee") REFERENCES "accounts" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("issue_id") REFERENCES "issues" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("id");

ALTER TABLE "notifications" ADD FOREIGN KEY ("issue_id") REFERENCES "issues" ("id");

ALTER TABLE "notifications" ADD FOREIGN KEY ("related_to") REFERENCES "accounts" ("id");

ALTER TABLE "issues_list" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "issues_list" ADD FOREIGN KEY ("issue_id") REFERENCES "issues" ("id");