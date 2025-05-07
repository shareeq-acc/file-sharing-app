import { UserEntity } from "src/user/model/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('capsule')
export class CapsuleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalName: string;

  @Column()
  fileName: string;

  @Column()
  format: string;

  @Column()
  size: number;

  @Column()
  url: string;

  @Column()
  publicId: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: true })
  isPublic: boolean;

  @ManyToOne(() => UserEntity, user => user.files)
  uploadedBy: UserEntity;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: true })
  isActive: boolean;
}
