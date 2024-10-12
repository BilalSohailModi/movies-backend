
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, BeforeInsert, } from 'typeorm';
import { iUser } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class UserEntity implements iUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    comparePassword(hash: string) {
        return bcrypt.compare(hash, this.password)
    }

}

