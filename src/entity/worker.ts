import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkerAuth } from "./workerAuth";
import { UserRole } from "../core/types/auth";

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true, nullable: true })
  phone: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  password: string;

  @Column()
  passwordSalt: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.WORKER })
  role: UserRole;

  @Column()
  isDeleted: boolean;

  @OneToMany(() => WorkerAuth, (workerAuth) => workerAuth.worker)
  auths: WorkerAuth[];
}
