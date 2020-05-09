CREATE TYPE "tasks_priorities" AS ENUM (
  'HIGH',
  'MEDIUM',
  'LOW'
);

CREATE TYPE "tasks_status" AS ENUM (
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

CREATE TABLE "accounts" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar UNIQUE NOT NULL,
  "name" varchar NOT NULL,
  "password" varchar NOT NULL,
  "created_at" date DEFAULT (now()),
  "last_login_at" date DEFAULT (now()),
  "role" int
);

CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar NOT NULL,
  "description" varchar
);

CREATE TABLE "projects" (
  "id" SERIAL PRIMARY KEY,
  "business_id" int UNIQUE NOT NULL,
  "name" varchar NOT NULL
);

CREATE TABLE "tasks" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "priority" tasks_priorities,
  "status" tasks_status,
  "creator" int,
  "created_at" date DEFAULT (now()),
  "assignee" int,
  "due_date" date DEFAULT (now())
);

CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY,
  "task_id" int,
  "account_id" int,
  "created_at" date DEFAULT (now()),
  "content" text NOT NULL
);

CREATE TABLE "notifications" (
  "id" SERIAL PRIMARY KEY,
  "task_id" int,
  "related_to" int,
  "content" text NOT NULL,
  "status" notification_status
);

CREATE TABLE "tasks_list" (
  "project_id" int,
  "task_id" int,
  PRIMARY KEY("project_id", "task_id")
);

ALTER TABLE "accounts" ADD FOREIGN KEY ("role") REFERENCES "roles" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("creator") REFERENCES "accounts" ("id");

ALTER TABLE "tasks" ADD FOREIGN KEY ("assignee") REFERENCES "accounts" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("task_id") REFERENCES "tasks" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("account_id") REFERENCES "accounts" ("id");

ALTER TABLE "notifications" ADD FOREIGN KEY ("task_id") REFERENCES "tasks" ("id");

ALTER TABLE "notifications" ADD FOREIGN KEY ("related_to") REFERENCES "accounts" ("id");

ALTER TABLE "tasks_list" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("id");

ALTER TABLE "tasks_list" ADD FOREIGN KEY ("task_id") REFERENCES "tasks" ("id");