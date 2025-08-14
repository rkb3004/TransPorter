import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.shipment.deleteMany();

  // Sample shipments data
  const shipments = [
    {
      containerId: 'MAEU7834567',
      originPort: 'Port of Shanghai',
      destinationPort: 'Port of Los Angeles',
      departureDate: new Date('2024-08-01T08:00:00Z'),
      status: 'In Transit' as const,
      eta: new Date('2024-08-15T14:00:00Z'),
      lastKnownLat: 35.5,
      lastKnownLng: -140.2
    },
    {
      containerId: 'COSCO9876543',
      originPort: 'Port of Rotterdam',
      destinationPort: 'Port of New York',
      departureDate: new Date('2024-08-05T10:30:00Z'),
      status: 'Arrived at Port' as const,
      eta: new Date('2024-08-14T09:00:00Z'),
      lastKnownLat: 40.6892,
      lastKnownLng: -74.0445
    },
    {
      containerId: 'EVER1234567',
      originPort: 'Port of Hamburg',
      destinationPort: 'Port of Miami',
      departureDate: new Date('2024-08-03T15:45:00Z'),
      status: 'Delayed' as const,
      eta: new Date('2024-08-18T11:30:00Z'),
      lastKnownLat: 50.1109,
      lastKnownLng: 8.6821
    },
    {
      containerId: 'HAPAG5555555',
      originPort: 'Port of Singapore',
      destinationPort: 'Port of Long Beach',
      departureDate: new Date('2024-07-28T12:00:00Z'),
      status: 'Delivered' as const,
      eta: new Date('2024-08-12T16:00:00Z'),
      lastKnownLat: 33.7701,
      lastKnownLng: -118.1937
    },
    {
      containerId: 'MSC8888888',
      originPort: 'Port of Antwerp',
      destinationPort: 'Port of Charleston',
      departureDate: new Date('2024-08-06T07:20:00Z'),
      status: 'In Transit' as const,
      eta: new Date('2024-08-19T13:45:00Z'),
      lastKnownLat: 45.8636,
      lastKnownLng: -30.5547
    }
  ];

  // Create shipments
  for (const shipment of shipments) {
    await prisma.shipment.create({
      data: shipment
    });
  }

  console.log(`✅ Created ${shipments.length} sample shipments`);
  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
