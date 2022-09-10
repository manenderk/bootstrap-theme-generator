/*
  Warnings:

  - Added the required column `defaultValue` to the `BootstrapVariable` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BootstrapVariable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "variableName" TEXT NOT NULL,
    "description" TEXT,
    "defaultValue" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "isMapItem" BOOLEAN NOT NULL DEFAULT false,
    "mapName" TEXT
);
INSERT INTO "new_BootstrapVariable" ("category", "description", "id", "isMapItem", "mapName", "title", "type", "variableName") SELECT "category", "description", "id", "isMapItem", "mapName", "title", "type", "variableName" FROM "BootstrapVariable";
DROP TABLE "BootstrapVariable";
ALTER TABLE "new_BootstrapVariable" RENAME TO "BootstrapVariable";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
