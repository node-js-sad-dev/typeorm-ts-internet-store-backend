import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkerAuth } from "./workerAuth";
import { UserRole } from "../core/types/auth";

@Entity()
export class Worker {
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

  @OneToMany(() => WorkerAuth, (workerAuth) => workerAuth.worker)
  auths: WorkerAuth[];
}
