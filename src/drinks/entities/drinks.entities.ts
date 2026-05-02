import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { DrinksInterface } from "../interfaces/drinks.interface";
import { PurchaseEntity } from "src/purchases/entities/purchase.entity";

@Entity({name: 'drinks'})
export class DrinksEntity implements DrinksInterface {

    @PrimaryColumn('text')
    name: string;

    @Column('int8')
    ounces: number;

    @Column('text', { array: true })
    aditions: string[];

    @OneToMany(
        () => PurchaseEntity,
        (purchase) => purchase.drink_fk,
        {
            cascade: true
        }
    )
    purchases: PurchaseEntity[]

}