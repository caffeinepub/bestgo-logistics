import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    id: bigint;
    weight: string;
    customerName: string;
    status: Status;
    goodsType: string;
    userId?: Principal;
    trackingId: string;
    submittedAt: bigint;
    deliveryLocation: string;
    preferredDate: string;
    phone: string;
    pickupLocation: string;
}
export interface ContactMessage {
    id: bigint;
    name: string;
    submittedAt: bigint;
    email: string;
    message: string;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export enum Status {
    cancelled = "cancelled",
    pending = "pending",
    inTransit = "inTransit",
    delivered = "delivered",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyBookings(): Promise<Array<Booking>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitBooking(customerName: string, phone: string, pickupLocation: string, deliveryLocation: string, goodsType: string, weight: string, preferredDate: string): Promise<string>;
    submitBookingAsUser(customerName: string, phone: string, pickupLocation: string, deliveryLocation: string, goodsType: string, weight: string, preferredDate: string): Promise<string>;
    submitContactMessage(name: string, email: string, phone: string, message: string): Promise<string>;
    trackShipment(trackingId: string): Promise<{
        customerName: string;
        status: string;
        trackingId: string;
        deliveryLocation: string;
        preferredDate: string;
        pickupLocation: string;
    } | null>;
    updateBookingStatus(id: bigint, status: string): Promise<string>;
}
