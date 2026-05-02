import { DrinksEntity } from "src/drinks/entities/drinks.entities";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    drink_fk: string

    @ManyToOne(
        () => UserEntity,
        (user) => user.id,
        {
            onDelete: 'CASCADE'
        }
    )
    user_fk: string

}
