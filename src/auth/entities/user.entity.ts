import { PurchaseEntity } from "src/purchases/entities/purchase.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "../enums/roles.enums";

@Entity({name: 'users'})
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column('text', { unique: true })
    email: string

    @Column('text', { nullable: false })
    password: string

    @Column({ type: 'enum', enum: Roles, default: Roles.USER })
    role: Roles

    @OneToMany(
        () => PurchaseEntity,
        (purchase) => purchase.user_fk
    )
    purchases?: PurchaseEntity[];
    
}
