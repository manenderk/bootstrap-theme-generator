-- CreateTable
CREATE TABLE "BootstrapVariable" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "variableName" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "isMapItem" BOOLEAN NOT NULL DEFAULT false,
    "mapName" TEXT
);
