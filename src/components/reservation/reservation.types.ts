// components/reservation/reservation.types.ts
export type ServiceType = "hotel" | "visit";
export type PetType = "dog" | "cat" | "other";
export type PetSex = "male" | "female";
export type RoomType = "suite" | "deluxe" | "standard";
export type AddOnKey = "premium_stay" | "home_care" | "grooming" | "health_walk";

export const ADD_ONS: { key: AddOnKey; label: string; price: number }[] = [
  { key: "premium_stay", label: "프리미엄 건강체크", price: 100000 },
  { key: "home_care", label: "픽업 서비스", price: 30000 },
  { key: "grooming", label: "목욕/그루밍", price: 30000 },
  { key: "health_walk", label: "산책 및 놀이시설", price: 50000 },
];

export type ReservationData = {
  name: string;
  phone: string;
  startDate: string;
  endDate: string;
  service: ServiceType;
  roomType?: RoomType;
  address?: string;
  addressDetail?: string;
  petName: string;
  petType: PetType;
  breed: string;
  age: string;
  weight: string;
  sex: PetSex;
  neutered: "yes" | "no";
  addOns: AddOnKey[];
  note: string;
};
