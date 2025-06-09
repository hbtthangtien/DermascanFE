import { VietQrData } from "./viet-qr-data";

export interface ResponseVietQr {
    code: string;
    desc: string;
    data: VietQrData;
}
