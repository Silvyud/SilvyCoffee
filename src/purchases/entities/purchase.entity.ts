import { DrinksEntity } from "src/drinks/entities/drinks.entities";
import { UserEntity } from "src/auth/entities/user.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'purchases'})
export class PurchaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('date')
    fecha_compra: Date

    @Column('decimal')
    total: number

    @ManyToOne(
        () => DrinksEntity,
        (drink) => drink.name,
        {
            onDelete: 'CASCADE'
        }
    )
    drink_fk: DrinksEntity

    @ManyToOne(
        () => UserEntity,
        (user) => user.user_id,
        {
            onDelete: 'CASCADE',
        }
    )
    user_fk: UserEntity

    @BeforeInsert()
    createDate() {
        this.fecha_compra = new Date(Date.now())
    }

}
