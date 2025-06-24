import { Role } from 'src/auth/entities/role.entity';
import { Collection } from 'src/collections/entities/collection.entity';
import { Image } from 'src/images/entities/image.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 80 })
  first_name: string;

  @Column({ length: 100 })
  last_name: string;

  @Column({ length: 30, unique: true })
  username: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  birth_date: Date;

  @Column()
  city: string;

  @Column({ length: 300, nullable: true })
  bio?: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Image, (image) => image.user)
  images: Image[];

  @OneToMany(() => Collection, (collection) => collection.user)
  collections: Collection[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
