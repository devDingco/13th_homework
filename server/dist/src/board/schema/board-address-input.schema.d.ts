export declare class BoardAddressInput {
    zoneCode: number;
    address: string;
    detailAddress: string;
}
declare const BoardAddressOutput_base: import("@nestjs/common").Type<Omit<BoardAddressInput, any>>;
export declare class BoardAddressOutput extends BoardAddressOutput_base {
}
export {};
