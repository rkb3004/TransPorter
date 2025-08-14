-- CreateTable
CREATE TABLE "Shipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "containerId" TEXT NOT NULL,
    "originPort" TEXT NOT NULL,
    "destinationPort" TEXT NOT NULL,
    "departureDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "eta" DATETIME NOT NULL,
    "lastKnownLat" REAL,
    "lastKnownLng" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_containerId_key" ON "Shipment"("containerId");
