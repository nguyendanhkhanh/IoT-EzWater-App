export interface RegisterDevice {
    user_email: string
    devices: RegisterDeviceInfo[]
}
export interface RegisterDeviceInfo {
    mac_address: string
    mac_address_name: string
    id: string
}

export interface MacAddressResponse {
    mac_address: string
    user_email: string
    mac_address_name: string
    id: string
}