import 'dotenv/config';
import { auth } from './lib/auth.ts';
import { MongoClient } from 'mongodb';

async function seedUsers() {
  const demoUsers = [
    {
      name: 'System Admin',
      email: 'admin@pizzahub.com',
      password: 'Admin123!',
      role: 'admin',
    },
    {
      name: 'Artisan Woodfire Vendor',
      email: 'woodfire@pizzahub.com',
      password: 'Vendor123!',
      role: 'vendor',
      businessName: 'Artisan Woodfire Pizzeria',
    },
    {
      name: 'John Customer',
      email: 'customer@pizzahub.com',
      password: 'Customer123!',
      role: 'customer',
    },
  ];

  for (const u of demoUsers) {
    try {
      console.log(`Seeding user ${u.email}...`);
      await auth.api.signUpEmail({
        body: {
          name: u.name,
          email: u.email,
          password: u.password,
          role: u.role,
          businessName: u.businessName,
        },
      });
      console.log(`Created user ${u.email}`);
    } catch (err) {
      console.log(`User ${u.email} might already exist:`, err.message || err);
    }
  }

  // Also ensure their roles in PizzaHub DB (both user and users collections)
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db('PizzaHub');

    // Admin
    await db.collection('users').updateOne(
      { email: 'admin@pizzahub.com' },
      {
        $set: {
          name: 'System Admin',
          email: 'admin@pizzahub.com',
          role: 'admin',
          isBlocked: false,
          subscriptionPlan: 'premium',
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
    await db.collection('user').updateOne(
      { email: 'admin@pizzahub.com' },
      { $set: { role: 'admin' } }
    );

    // Vendor
    await db.collection('users').updateOne(
      { email: 'woodfire@pizzahub.com' },
      {
        $set: {
          name: 'Artisan Woodfire Pizzeria',
          email: 'woodfire@pizzahub.com',
          role: 'vendor',
          businessName: 'Artisan Woodfire Pizzeria',
          isBlocked: false,
          subscriptionPlan: 'premium',
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
    await db.collection('user').updateOne(
      { email: 'woodfire@pizzahub.com' },
      { $set: { role: 'vendor', businessName: 'Artisan Woodfire Pizzeria' } }
    );

    // Customer
    await db.collection('users').updateOne(
      { email: 'customer@pizzahub.com' },
      {
        $set: {
          name: 'John Customer',
          email: 'customer@pizzahub.com',
          role: 'customer',
          isBlocked: false,
          subscriptionPlan: 'free',
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
    await db.collection('user').updateOne(
      { email: 'customer@pizzahub.com' },
      { $set: { role: 'customer' } }
    );

    console.log('Successfully synced user roles in MongoDB!');
    await client.close();
  } catch (err) {
    console.error('Role sync error:', err);
  }
}

seedUsers();
