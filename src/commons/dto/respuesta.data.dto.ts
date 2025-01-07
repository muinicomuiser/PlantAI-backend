import { ApiProperty } from "@nestjs/swagger";

/**Dto para respuestas */
export class GetDataDto<T> {
    @ApiProperty()
    message?: string;

    @ApiProperty()
    totalItems?: number

    @ApiProperty()
    data: T;

    constructor(data: T, message?: string, totalItems?: number) {
        this.totalItems = totalItems
        this.message = message
        this.data = data;
    }

}