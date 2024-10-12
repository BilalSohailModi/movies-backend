
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, } from 'typeorm';
import { iMovie } from '../dto/movie.dto';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Entity({ name: 'movie' })
export class MovieEntity implements iMovie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true, nullable: false })
    title: string;

    @Column({ nullable: false })
    publishingYear: number;

    @Column({ default: true })
    poster: string;

    @ManyToOne(() => UserEntity, user => user.id, { nullable: false })
    createdBy: UserEntity;

    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true, default: null })
    deletedAt: Date | null;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}

