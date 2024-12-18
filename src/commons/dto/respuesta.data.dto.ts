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
        this.data = data;
        this.message = message
        this.totalItems = totalItems
    }

}