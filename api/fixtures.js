const mongoose = require('mongoose');
const {nanoid} = require('nanoid');
const config = require('./config');
const User = require('./models/User');
const Place = require('./models/Place');

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, admin] = await User.create(
    {
      email: 'user@user',
      password: '123',
      displayName: 'John Doe',
      avatar: 'avatars/user1.png',
      role: 'user',
      token: nanoid(),
    },
    {
      email: 'admin@admin',
      password: '123',
      displayName: 'Admin',
      avatar: 'avatars/user2.jpg',
      role: 'admin',
      token: nanoid(),
    },
  );

  await Place.create(
    {
      user,
      title: 'Cafe',
      description: 'Some description',
      mainImage: 'images/123.jpeg',
      averageRate: 5,
      foodRate: 5,
      serviceRate: 5,
      interiorRate: 5,
      images: [
        {
          user,
          filename: 'images/789.jpg'
        },
        {
          user: admin,
          filename: 'images/456.jpeg'
        }
      ],
      reviews: [
        {
          user,
          description: 'Comment 1',
          foodRate: 5,
          serviceRate: 5,
          interiorRate: 5,
        },{
          user: admin,
          description: 'Comment 2',
          foodRate: 5,
          serviceRate: 5,
          interiorRate: 5,
        },
      ]
    },{
      user: admin,
      title: 'Bar',
      description: 'Some description 2',
      mainImage: 'images/789.jpg',
      averageRate: 5,
      foodRate: 5,
      serviceRate: 5,
      interiorRate: 5,
      images: [
        {
          user,
          filename: 'images/123.jpeg'
        },
        {
          user: admin,
          filename: 'images/456.jpeg'
        }
      ],
      reviews: [
        {
          user,
          description: 'Comment 3',
          foodRate: 5,
          serviceRate: 5,
          interiorRate: 5,
        },{
          user: admin,
          description: 'Comment 4',
          foodRate: 5,
          serviceRate: 5,
          interiorRate: 5,
        },
      ]
    }
  )

  await mongoose.connection.close();
};

run().catch(e => console.error(e));