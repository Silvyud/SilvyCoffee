import { PurchaseEntity } from "src/purchases/entities/purchase.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string

    @Column('text')
    email: string

    @Column('text')
    password: string

    @OneToMany(
        () => PurchaseEntity,
        (purchase) => purchase.user_fk,
        {
            cascade: true
        }
    )
    purchases: PurchaseEntity[]


}
