import { Governorate } from "../domain/Governorate";
import { EconomicRegion } from "../domain/Region";

export const GOVERNORATES: Record<number, Governorate> = {
  
  1: {
    code: 1,
    nameEn: "Cairo",
    nameAr: "القاهرة",
    region: "Cairo",
  },
  21: {
    code: 21,
    nameEn: "Giza",
    nameAr: "الجيزة",
    region: "Cairo",
  },
  14: {
    code: 14,
    nameEn: "Qalyubia",
    nameAr: "القليوبية",
    region: "Cairo",
  },

  
  2: {
    code: 2,
    nameEn: "Alexandria",
    nameAr: "الإسكندرية",
    region: "Alexandria",
  },
  18: {
    code: 18,
    nameEn: "Beheira",
    nameAr: "البحيرة",
    region: "Alexandria",
  },
  33: {
    code: 33,
    nameEn: "Matrouh",
    nameAr: "مطروح",
    region: "Alexandria",
  },

  
  11: {
    code: 11,
    nameEn: "Damietta",
    nameAr: "دمياط",
    region: "Delta",
  },
  12: {
    code: 12,
    nameEn: "Dakahlia",
    nameAr: "الدقهلية",
    region: "Delta",
  },
  13: {
    code: 13,
    nameEn: "Sharqia",
    nameAr: "الشرقية",
    region: "Delta",
  },
  15: {
    code: 15,
    nameEn: "Kafr El Sheikh",
    nameAr: "كفر الشيخ",
    region: "Delta",
  },
  16: {
    code: 16,
    nameEn: "Gharbia",
    nameAr: "الغربية",
    region: "Delta",
  },
  17: {
    code: 17,
    nameEn: "Monufia",
    nameAr: "المنوفية",
    region: "Delta",
  },

  
  3: {
    code: 3,
    nameEn: "Port Said",
    nameAr: "بورسعيد",
    region: "Canal",
  },
  4: {
    code: 4,
    nameEn: "Suez",
    nameAr: "السويس",
    region: "Canal",
  },
  19: {
    code: 19,
    nameEn: "Ismailia",
    nameAr: "الإسماعيلية",
    region: "Canal",
  },
  34: {
    code: 34,
    nameEn: "North Sinai",
    nameAr: "شمال سيناء",
    region: "Canal",
  },
  35: {
    code: 35,
    nameEn: "South Sinai",
    nameAr: "جنوب سيناء",
    region: "Canal",
  },

  
  22: {
    code: 22,
    nameEn: "Beni Suef",
    nameAr: "بني سويف",
    region: "UpperEgyptNorth",
  },
  23: {
    code: 23,
    nameEn: "Fayoum",
    nameAr: "الفيوم",
    region: "UpperEgyptNorth",
  },
  24: {
    code: 24,
    nameEn: "Minya",
    nameAr: "المنيا",
    region: "UpperEgyptNorth",
  },

  
  25: {
    code: 25,
    nameEn: "Asyut",
    nameAr: "أسيوط",
    region: "UpperEgyptMiddle",
  },
  32: {
    code: 32,
    nameEn: "New Valley",
    nameAr: "الوادي الجديد",
    region: "UpperEgyptMiddle",
  },

  
  26: {
    code: 26,
    nameEn: "Sohag",
    nameAr: "سوهاج",
    region: "UpperEgyptSouth",
  },
  27: {
    code: 27,
    nameEn: "Qena",
    nameAr: "قنا",
    region: "UpperEgyptSouth",
  },
  28: {
    code: 28,
    nameEn: "Aswan",
    nameAr: "أسوان",
    region: "UpperEgyptSouth",
  },
  29: {
    code: 29,
    nameEn: "Luxor",
    nameAr: "الأقصر",
    region: "UpperEgyptSouth",
  },

  
  88: {
    code: 88,
    nameEn: "Foreign",
    nameAr: "خارج مصر",
    region: "Foreign",
  },
};
