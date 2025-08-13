import { db } from "../db";
import { CreateEstablishmentType } from "../dtos";
import { EstablishmentModel } from "../models";

export async function seedEstablishments() {
  const ownerIds = [
    "44ce4244-b010-4386-98c8-cba83bc37b6c",
    "3de80a8e-1275-4c60-a356-24042e8d9658",
    "79b391d1-dbf1-4162-983c-ea57656a3b43",
  ];

  const establishments:CreateEstablishmentType[] = Array.from({ length: 50 }).map((_, i) => ({

    name: `Establishment ${i + 1}`,
    franchiseName: `Franchise ${i + 1}`,
    type: "Gym",
    contactInfo: {
      email: `contact${i + 1}@example.com`,
      phone: `+233-555-${String(i + 1).padStart(4, "0")}`,
      website: `https://establishment${i + 1}.com`,
    },
    locationInfo: {
      country: "Ghana",
      city: "Accra",
      address: `Street ${i + 1}`,
      landmark: `Landmark ${i + 1}`,
    },
    establishmentStatus: "ACTIVE",
    operatingHours: "08:00-20:00",
    ownerId: ownerIds[i % ownerIds.length], // cycle through the 3 owners
    capacityMetrics: {
      maxMembers: String(200 + i), // just for variety
      maxDailyVisitors: String(50 + i),
    }
  }));

  await db.insert(EstablishmentModel).values(establishments);

  console.log("✅ 50 establishments seeded successfully.");
  
}
