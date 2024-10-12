import { PartialType } from "@nestjs/mapped-types"
import { IsNotEmpty, } from "class-validator"
import { UserEntity } from "src/modules/user/entities/user.entity"
import Multer from 'multer';

export interface iMovie {
    id: string
    title: string
    publishingYear: number
    poster: Multer.File
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

    poster: string

}


export class UpdateMovieDto extends PartialType(CreateMovieDto) {

}