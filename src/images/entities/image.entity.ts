import { Collection } from 'src/collections/entities/collection.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  image_id: number;

  @Column({ length: 80, nullable: true })
  title?: string;

  @Column({ length: 300, nullable: true })
  description?: string;

  @Column({ length: 150, unique: true })
  image_url: string;

  @Column({ type: 'timestamp' })
  capture_time: Date;

  @Column()
  x_coordinate: number;

  @Column()
  y_coordinate: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.images)
  user: User;

  @ManyToOne(() => Collection, (collection) => collection.images, {
    nullable: true,
  })
  collection?: Collection;
}
