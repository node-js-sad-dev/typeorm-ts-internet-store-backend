import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Worker } from "./worker";

@Entity()
export class WorkerAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({ default: false })
  isExpired: boolean;

  @ManyToOne(() => Worker, (worker) => worker.auths)
  worker: Worker;

  @Column()
  workerId: number;
}
