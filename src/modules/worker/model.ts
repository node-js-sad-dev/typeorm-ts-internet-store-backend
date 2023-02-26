import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../auth/type";

@Entity()
export default class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column()
  passwordSalt: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.WORKER })
  role: UserRole;

  @Column()
  isDeleted: boolean;
}
