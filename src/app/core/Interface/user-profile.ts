export interface UserProfile {
  profileId: number;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  postCode: string;
  drivingLicenseNo: string;
  profileImageUrl: string;
  licenseFrontImage: string;
  licenseBackImage: string;
  createdAt: string;  // ISO date string (e.g., "2025-11-05T13:37:52.446")
  updatedAt: string;  // ISO date string
}
