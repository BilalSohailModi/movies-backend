import { PartialType } from "@nestjs/mapped-types"
import { IsNotEmpty, } from "class-validator"
import { UserEntity } from "src/modules/user/entities/user.entity"

export interface iMovie {
    id: string
    title: string
    publishingYear: number
    poster: string
    createdBy: UserEntity
    deletedAt: Date
    createdAt: Date
    updatedAt: Date
}

export class CreateMovieDto implements Partial<iMovie> {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    publishingYear: number

    @IsNotEmpty()
    poster: string
}


export class UpdateMovieDto extends PartialType(CreateMovieDto) {

}