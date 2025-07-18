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
}
