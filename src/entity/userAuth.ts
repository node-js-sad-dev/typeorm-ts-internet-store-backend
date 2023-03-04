import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class UserAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({ default: false })
  isExpired: boolean;

  @ManyToOne(() => User, (user) => user.auths)
  user: User;

  @Column()
  userId: number;
}
