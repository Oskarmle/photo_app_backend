import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/entities/role.entity';
import { Collection } from 'src/collections/entities/collection.entity';
import { Image } from 'src/images/entities/image.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MockService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
  ) {}

  async onApplicationBootstrap() {
    const userCount = await this.userRepository.count();
    if (userCount === 0) {
      console.log('🌱 Seeding database with mock data...');
      await this.seedDatabase();
      console.log('✅ Database seeded successfully!');
    }
  }
  async seedDatabase() {
    // Create roles
    await this.createRoles();

    // Create users
    await this.createUsers();
  }

  async createRoles() {
    const roles = [
      { role_name: 'admin', description: 'Administrator with full access' },
      { role_name: 'user', description: 'Regular user with limited access' },
      { role_name: 'premium_user', description: 'User with premium features' },
    ];

    return await Promise.all(
      roles.map((role) =>
        this.roleRepository.save(this.roleRepository.create(role)),
      ),
    );
  }

  async createUsers() {
    const roles = await this.roleRepository.find();

    const userRole = roles.find((role) => role.role_name === 'user');
    const premiumUserRole = roles.find(
      (role) => role.role_name === 'premium_user',
    );

    const users = this.userRepository.create([
      {
        first_name: 'John',
        last_name: 'Doe',
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        password: 'password123',
        birth_date: new Date('1990-01-01'),
        city: 'New York',
        bio: 'Avid traveler and photographer.',
        role: userRole,
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
        username: 'JaneSmith',
        email: 'janesmith@example.com',
        password: 'securePass456',
        birth_date: new Date('1992-03-14'),
        city: 'Los Angeles',
        bio: 'Coffee lover and tech blogger.',
        role: userRole,
      },
      {
        first_name: 'Michael',
        last_name: 'Brown',
        username: 'MikeB',
        email: 'mikebrown@example.com',
        password: 'pass7890',
        birth_date: new Date('1985-07-22'),
        city: 'Chicago',
        bio: 'Music producer and vinyl collector.',
        role: userRole,
      },
      {
        first_name: 'Emily',
        last_name: 'Davis',
        username: 'EmDavis',
        email: 'emilyd@example.com',
        password: 'emilyRocks',
        birth_date: new Date('1997-11-10'),
        city: 'Austin',
        bio: 'Dog mom and UX designer.',
        role: premiumUserRole,
      },
      {
        first_name: 'Carlos',
        last_name: 'Martinez',
        username: 'CarlosM',
        email: 'carlos.m@example.com',
        password: 'carlos123',
        birth_date: new Date('1990-09-30'),
        city: 'Miami',
        bio: 'Street photographer and salsa dancer.',
        role: premiumUserRole,
      },
      {
        first_name: 'Sofia',
        last_name: 'Lee',
        username: 'SofiaLee',
        email: 'sofia.lee@example.com',
        password: 'leeStrongPass',
        birth_date: new Date('1994-05-08'),
        city: 'Seattle',
        bio: 'Nature enthusiast and bookworm.',
        role: userRole,
      },
    ]);

    return await Promise.all(
      users.map((user) => this.userRepository.save(user)),
    );
  }

  async createImages() {
    const user1 = await this.userRepository.findOne({ where: { user_id: 1 } });
    if (!user1) {
      throw new Error('User with ID 1 not found');
    }
    const user2 = await this.userRepository.findOne({ where: { user_id: 2 } });
    if (!user2) {
      throw new Error('User with ID 2 not found');
    }
    const user3 = await this.userRepository.findOne({ where: { user_id: 3 } });
    if (!user3) {
      throw new Error('User with ID 3 not found');
    }
    const images = this.imageRepository.create([
      {
        title: 'Sunset Over the Mountains',
        description: 'A beautiful sunset captured over the Rocky Mountains.',
        image_url:
          'https://res.cloudinary.com/dt0leqd9w/image/upload/v1752846763/IMG_0701_vkwotb.jpg',
        capture_time: new Date('2023-08-01T18:30:00Z'),
        x_coordinate: 40.7128,
        y_coordinate: -74.006,
        user: user1,
      },
      {
        title: 'City Lights at Night',
        description: 'The vibrant city lights of New York City at night.',
        image_url:
          'https://res.cloudinary.com/dt0leqd9w/image/upload/v1752846762/DSC_0606_gi2xwz.jpg',
        capture_time: new Date('2023-08-02T20:15:00Z'),
        x_coordinate: 40.7128,
        y_coordinate: -74.006,
        user: user1,
      },
      {
        title: 'Forest Path in Autumn',
        description: 'A peaceful walk through a forest with autumn colors.',
        image_url:
          'https://res.cloudinary.com/dt0leqd9w/image/upload/v1752846763/DSC_0614_wcmqrk.jpg',
        capture_time: new Date('2023-09-10T14:20:00Z'),
        x_coordinate: 47.6062,
        y_coordinate: -122.3321,
        user: user2,
      },
      {
        title: 'Snowy Mountain Peaks',
        description: 'Crisp morning view of snow-covered mountains.',
        image_url:
          'https://res.cloudinary.com/dt0leqd9w/image/upload/v1752846763/IMG_0132_twocov.jpg',
        capture_time: new Date('2023-12-15T09:45:00Z'),
        x_coordinate: 39.7392,
        y_coordinate: -104.9903,
        user: user2,
      },
      {
        title: 'Beach Sunrise',
        description: 'Waves crashing under a colorful sunrise sky.',
        image_url:
          'https://res.cloudinary.com/dt0leqd9w/image/upload/v1752846762/DSC_0589_hb8fqb.jpg',
        capture_time: new Date('2023-06-20T06:00:00Z'),
        x_coordinate: 34.0195,
        y_coordinate: -118.4912,
        user: user2,
      },
      {
        title: 'Desert Landscape',
        description: 'Rolling dunes under a blazing sun.',
        image_url:
          'https://res.cloudinary.com/dt0leqd9w/image/upload/v1752846763/IMG_0920_ikdzco.jpg',
        capture_time: new Date('2023-07-05T15:30:00Z'),
        x_coordinate: 36.1699,
        y_coordinate: -115.1398,
        user: user3,
      },
      {
        title: 'Rainy City Street',
        description: 'Reflections of neon lights on wet pavement.',
        image_url:
          'https://res.cloudinary.com/dt0leqd9w/image/upload/v1752846762/DSC_0591_gy4z6j.jpg',
        capture_time: new Date('2023-10-22T21:10:00Z'),
        x_coordinate: 51.5074,
        y_coordinate: -0.1278,
        user: user3,
      },
      {
        title: 'Countryside Cottage',
        description: 'A cozy cottage nestled among green hills.',
        image_url:
          'https://res.cloudinary.com/dt0leqd9w/image/upload/v1752846762/DSC_0622_llhphj.jpg',
        capture_time: new Date('2023-05-12T10:00:00Z'),
        x_coordinate: 48.8566,
        y_coordinate: 2.3522,
        user: user3,
      },
    ] as Partial<Image>[]);
    return await Promise.all(
      images.map((image) => this.imageRepository.save(image)),
    );
  }
}
