import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    isNormalMode: boolean;
    name: string;
}
export interface backendInterface {
    getProfile(): Promise<UserProfile>;
    setProfile(name: string, isNormalMode: boolean): Promise<void>;
}
