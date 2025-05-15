import { faker } from '@faker-js/faker/locale/ko'
import mongoose, { Types } from 'mongoose'

import { StoreCategory } from '@/constants/storeCategory'
import { User } from '../models/user'
import { Store } from '../models/store'
import { Menu } from '../models/menu'
import { Review } from '../models/review'
import { connectToDB } from '../mongoClient'
;(async () => {
  await connectToDB()

  const fakeUsers = Array(20)
    .fill(1)
    .map(() => {
      const firstName = faker.name.firstName()
      const lastName = faker.name.lastName()
      return {
        name: `${lastName}${firstName}`,
        email: faker.internet.email(firstName, lastName),
        emailVerified: faker.date.recent().toISOString(),
        createdAt: faker.date.past(3).toISOString(),
        updatedAt: faker.date.recent().toISOString(),
      }
    })

  const users = await User.insertMany(fakeUsers)

  console.log('created random users', users)

  await Store.insertMany([
    {
      name: 'Delicious Chicken',
      images: [
        'https://images.unsplash.com/photo-1600147184950-b0a367a98bc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a29yZWFuJTIwZnJpZWQlMjBjaGlja2VufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1575932444877-5106bee2a599?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a29yZWFuJTIwY2hpY2tlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      ],
      category: StoreCategory.CHICKEN,
      deliveryPrice: 3000,
      minimumOrderPrice: 15000,
    },
    {
      name: 'Killer Pizza',
      images: [
        'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGl6emF8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      ],
      category: StoreCategory.PIZZA,
      deliveryPrice: 2500,
      minimumOrderPrice: 15000,
    },
    {
      name: 'Home Delivery',
      images: [
        'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a29yZWFuJTIwZm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        'https://upload.wikimedia.org/wikipedia/commons/4/4c/Korean_stew-Kimchi_jjigae-01.jpg?20080118030922',
      ],
      category: StoreCategory.KOREAN,
      deliveryPrice: 1000,
      minimumOrderPrice: 5000,
    },
    {
      name: 'Thumb\'s Jjamppong',
      images: [
        'https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MAxzZWFyY2h8Mnx8a29yZWFuJTIwZm9vZHxlbnwwfHwwfHw',
        'https://live.staticflickr.com/3728/13171290065_75e3940d8f_b.jpg',
      ],
      category: StoreCategory.CHINESE,
      deliveryPrice: 0,
      minimumOrderPrice: 5000,
    },
    {
      name: 'Sushi Hitoshi',
      image: [
        'https://images.unsplash.com/photo-1563612116625-3012372fccce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHN1c2hpfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1584583570840-0a3d88497593?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHN1c2hpfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      ],
      category: StoreCategory.JAPANESE,
      deliveryPrice: 4000,
      minimumOrderPrice: 10000,
    },
    {
      name: 'Viet Noodle House',
      images: [
        'https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      ],
      category: StoreCategory.ASIAN,
      deliveryPrice: 2500,
      minimumOrderPrice: 12000,
    },
    {
      name: 'Burrito Brothers',
      images: [
        'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGFjb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
        'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YnVycml0b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      ],
      category: StoreCategory.MEXICAN,
      deliveryPrice: 5000,
      minimumOrderPrice: 12000,
    },
  ])

  console.log('created random stores')

  const chickenStoreQuery = Store.where({ name: 'Delicious Chicken' })
  const chickenStore = await chickenStoreQuery.findOne()

  const chickenStoreId = chickenStore?._id

  await Menu.insertMany([
    {
      store: chickenStoreId,
      name: 'Fried Chicken',
      price: 15000,
      description: 'Crispy and delicious fried chicken',
      images: [
        'https://images.unsplash.com/photo-1575932444877-5106bee2a599?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a29yZWFuJTIwY2hpY2tlbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      ],
      category: 'Fried',
      isRecommended: true,
      orderCount: 235,
      likeCount: 124,
      dislikeCount: 0,
      additionalSelections: [
        {
          title: 'Add Pickled Radish',
          options: [
            {
              title: 'Add Pickled Radish',
              price: 500,
            },
            {
              title: 'No Thanks',
              price: 0,
            },
          ],
          required: true,
          multiple: false,
        },
        {
          title: 'Add Beverage',
          options: [
            {
              title: 'Cola',
              price: 2000,
            },
            {
              title: 'Sprite',
              price: 2000,
            },
          ],
          required: false,
          multiple: true,
        },
      ],
    },
    {
      store: chickenStoreId,
      name: 'Spicy Chicken',
      price: 17000,
      description: 'Classic and very delicious',
      images: [
        'https://live.staticflickr.com/5543/10362831185_cda71f9c86_b.jpg',
      ],
      category: 'Spicy',
      isRecommended: true,
      orderCount: 352,
      likeCount: 243,
      dislikeCount: 13,
    },
    {
      store: chickenStoreId,
      name: 'Honey Garlic Chicken',
      price: 20000,
      category: 'Spicy',
      isRecommended: false,
      orderCount: 232,
      likeCount: 123,
      dislikeCount: 25,
    },
    {
      store: chickenStoreId,
      name: 'Soy Sauce Chicken',
      price: 19000,
      category: 'Spicy',
      isRecommended: false,
      orderCount: 53,
      likeCount: 12,
      dislikeCount: 0,
    },
  ])

  const chickenStoreMenus = await Menu.where({ store: chickenStoreId }).find()
  const chickenStoreMenuIds = chickenStoreMenus?.map((menu) => menu._id)

  await Store.findByIdAndUpdate(chickenStoreId, { menus: chickenStoreMenuIds })

  const pizzaStoreQuery = Store.where({ name: 'Killer Pizza' })
  const pizzaStore = await pizzaStoreQuery.findOne()

  const pizzaStoreId = pizzaStore?._id

  await Menu.insertMany([
    {
      store: pizzaStoreId,
      name: 'Cheese Pizza',
      price: 15000,
      description: 'The basic of basics cheese pizza',
      category: 'Pizza',
      isRecommended: true,
      orderCount: 235,
      likeCount: 124,
      dislikeCount: 0,
    },
    {
      store: pizzaStoreId,
      name: 'Margherita',
      price: 18000,
      images: [
        'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      ],
      category: 'Wood-fired Pizza',
      isRecommended: true,
      orderCount: 352,
      likeCount: 243,
      dislikeCount: 13,
    },
    {
      store: pizzaStoreId,
      name: 'Pepperoni',
      price: 17000,
      category: 'Pizza',
      isRecommended: false,
      orderCount: 232,
      likeCount: 123,
      dislikeCount: 25,
    },
    {
      store: pizzaStoreId,
      name: 'Supreme Pizza',
      price: 20000,
      category: 'Pizza',
      images: [
        'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      ],
      isRecommended: false,
      orderCount: 53,
      likeCount: 12,
      dislikeCount: 0,
    },
  ])

  const pizzaStoreMenus = await Menu.where({ store: pizzaStoreId }).find()
  const pizzaStoreMenuIds = pizzaStoreMenus?.map((menu) => menu._id)

  await Store.findByIdAndUpdate(pizzaStoreId, { menus: pizzaStoreMenuIds })

  const koreanStoreQuery = Store.where({ name: 'Home Delivery' })
  const koreanStore = await koreanStoreQuery.findOne()

  const koreanStoreId = koreanStore?._id

  await Menu.insertMany([
    {
      store: koreanStoreId,
      name: 'Kimchi Stew',
      price: 7000,
      category: 'Stew',
      isRecommended: true,
      orderCount: 235,
      likeCount: 124,
      dislikeCount: 0,
    },
    {
      store: koreanStoreId,
      name: 'Soybean Paste Stew',
      price: 7000,
      category: 'Stew',
      isRecommended: true,
      orderCount: 352,
      likeCount: 243,
      dislikeCount: 13,
    },
    {
      store: koreanStoreId,
      name: 'Stir-fried Pork',
      price: 8000,
      category: 'Meat',
      isRecommended: false,
      orderCount: 232,
      likeCount: 123,
      dislikeCount: 25,
    },
    {
      store: koreanStoreId,
      name: 'Eonyang Bulgogi',
      price: 10000,
      category: 'Meat',
      isRecommended: false,
      orderCount: 53,
      likeCount: 12,
      dislikeCount: 0,
    },
    {
      store: koreanStoreId,
      name: 'Bibimbap',
      price: 9000,
      category: 'Rice',
      isRecommended: true,
      orderCount: 553,
      likeCount: 312,
      dislikeCount: 0,
    },
  ])

  const koreanStoreMenus = await Menu.where({ store: koreanStoreId }).find()
  const koreanStoreMenuIds = koreanStoreMenus?.map((menu) => menu._id)

  await Store.findByIdAndUpdate(koreanStoreId, { menus: koreanStoreMenuIds })

  const chineseStoreQuery = Store.where({ name: 'Thumb\'s Jjamppong' })
  const chineseStore = await chineseStoreQuery.findOne()

  const chineseStoreId = chineseStore?._id

  await Menu.insertMany([
    {
      store: chineseStoreId,
      name: 'Jjajangmyeon',
      price: 7000,
      category: 'Noodles',
      isRecommended: true,
      orderCount: 235,
      likeCount: 124,
      dislikeCount: 0,
    },
    {
      store: chineseStoreId,
      name: 'Jjamppong',
      price: 8000,
      category: 'Noodles',
      isRecommended: true,
      orderCount: 352,
      likeCount: 243,
      dislikeCount: 13,
    },
    {
      store: chineseStoreId,
      name: 'Sweet and Sour Pork',
      price: 15000,
      category: 'Dishes',
      isRecommended: false,
      orderCount: 232,
      likeCount: 123,
      dislikeCount: 25,
    },
    {
      store: chineseStoreId,
      name: 'Fried Dumplings',
      price: 6000,
      category: 'Dishes',
      isRecommended: false,
      orderCount: 53,
      likeCount: 12,
      dislikeCount: 0,
    },
    {
      store: chineseStoreId,
      name: 'Yusansul',
      price: 20000,
      category: 'Dishes',
      isRecommended: true,
      orderCount: 553,
      likeCount: 312,
      dislikeCount: 0,
    },
  ])

  const chineseStoreMenus = await Menu.where({ store: chineseStoreId }).find()
  const chineseStoreMenuIds = chineseStoreMenus?.map((menu) => menu._id)

  await Store.findByIdAndUpdate(chineseStoreId, { menus: chineseStoreMenuIds })

  const japaneseStoreQuery = Store.where({ name: 'Sushi Hitoshi' })
  const japaneseStore = await japaneseStoreQuery.findOne()

  const japaneseStoreId = japaneseStore?._id

  await Menu.insertMany([
    {
      store: japaneseStoreId,
      name: 'Salmon Sushi',
      price: 11000,
      category: 'Sushi',
      isRecommended: true,
      orderCount: 235,
      likeCount: 124,
      dislikeCount: 0,
    },
    {
      store: japaneseStoreId,
      name: 'Flounder Sushi',
      price: 10000,
      category: 'Sushi',
      isRecommended: true,
      orderCount: 352,
      likeCount: 243,
      dislikeCount: 13,
    },
    {
      store: japaneseStoreId,
      name: 'California Roll',
      price: 10000,
      category: 'Roll',
      isRecommended: false,
      orderCount: 232,
      likeCount: 123,
      dislikeCount: 25,
    },
    {
      store: japaneseStoreId,
      name: 'Tuna Sashimi',
      price: 20000,
      category: 'Sashimi',
      isRecommended: false,
      orderCount: 53,
      likeCount: 12,
      dislikeCount: 0,
    },
    {
      store: japaneseStoreId,
      name: 'Assorted Sashimi',
      price: 22000,
      category: 'Sashimi',
      isRecommended: true,
      orderCount: 553,
      likeCount: 312,
      dislikeCount: 0,
    },
  ])

  const japaneseStoreMenus = await Menu.where({ store: japaneseStoreId }).find()
  const japaneseStoreMenuIds = japaneseStoreMenus?.map((menu) => menu._id)

  await Store.findByIdAndUpdate(japaneseStoreId, { menus: japaneseStoreMenuIds })

  const asianStoreQuery = Store.where({ name: 'Viet Noodle House' })
  const asianStore = await asianStoreQuery.findOne()

  const asianStoreId = asianStore?._id

  await Menu.insertMany([
    {
      store: asianStoreId,
      name: 'Pho',
      price: 10000,
      images: [
        'https://images.unsplash.com/photo-1576577445504-6af96477db52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
      ],
      category: 'Noodles',
      isRecommended: true,
      orderCount: 235,
      likeCount: 124,
      dislikeCount: 0,
    },
    {
      store: asianStoreId,
      name: 'Pad Thai',
      price: 12000,
      category: 'Noodles',
      isRecommended: true,
      orderCount: 352,
      likeCount: 243,
      dislikeCount: 13,
    },
    {
      store: asianStoreId,
      name: 'Nasi Goreng',
      price: 11000,
      category: 'Fried Rice',
      isRecommended: false,
      orderCount: 232,
      likeCount: 123,
      dislikeCount: 25,
    },
    {
      store: asianStoreId,
      name: 'Pineapple Fried Rice',
      price: 10000,
      category: 'Fried Rice',
      isRecommended: false,
      orderCount: 53,
      likeCount: 12,
      dislikeCount: 0,
    },
    {
      store: asianStoreId,
      name: 'Banh Mi',
      price: 12000,
      category: 'Sandwich',
      isRecommended: true,
      orderCount: 553,
      likeCount: 312,
      dislikeCount: 0,
    },
  ])

  const asianStoreMenus = await Menu.where({ store: asianStoreId }).find()
  const asianStoreMenuIds = asianStoreMenus?.map((menu) => menu._id)

  await Store.findByIdAndUpdate(asianStoreId, { menus: asianStoreMenuIds })

  const mexicanStoreQuery = Store.where({ name: 'Burrito Brothers' })
  const mexicanStore = await mexicanStoreQuery.findOne()

  const mexicanStoreId = mexicanStore?._id

  await Menu.insertMany([
    {
      store: mexicanStoreId,
      name: 'Chicken Taco',
      price: 6000,
      images: [
        'https://images.unsplash.com/photo-1611699363906-056f01dd1ed8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hpY2tlbiUyMHRhY298ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
      ],
      category: 'Taco',
      isRecommended: true,
      orderCount: 235,
      likeCount: 124,
      dislikeCount: 0,
    },
    {
      store: mexicanStoreId,
      name: 'Shrimp Taco',
      price: 8000,
      images: [
        'https://images.unsplash.com/photo-1611250188496-e966043a0629?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2hyaW1wJTIwdGFjb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      ],
      category: 'Taco',
      isRecommended: true,
      orderCount: 352,
      likeCount: 243,
      dislikeCount: 13,
    },
    {
      store: mexicanStoreId,
      name: 'Burrito',
      price: 12000,
      category: 'Burrito',
      isRecommended: false,
      orderCount: 232,
      likeCount: 123,
      dislikeCount: 25,
    },
    {
      store: mexicanStoreId,
      name: 'Burrito Bowl',
      price: 12000,
      category: 'Burrito',
      isRecommended: false,
      orderCount: 53,
      likeCount: 12,
      dislikeCount: 0,
    },
    {
      store: mexicanStoreId,
      name: 'Quesadilla',
      price: 10000,
      category: 'Quesadilla',
      isRecommended: true,
      orderCount: 553,
      likeCount: 312,
      dislikeCount: 0,
    },
  ])

  const mexicanStoreMenus = await Menu.where({ store: mexicanStoreId }).find()
  const mexicanStoreMenuIds = mexicanStoreMenus?.map((menu) => menu._id)

  await Store.findByIdAndUpdate(mexicanStoreId, { menus: mexicanStoreMenuIds })

  console.log('created random menus')

  const userIds = (await User.find()).map((user) => user._id)

  const storeAndMenus: [Types.ObjectId | undefined, Types.ObjectId[]][] = [
    [chickenStoreId, chickenStoreMenuIds],
    [pizzaStoreId, pizzaStoreMenuIds],
    [koreanStoreId, koreanStoreMenuIds],
    [chineseStoreId, chineseStoreMenuIds],
    [japaneseStoreId, japaneseStoreMenuIds],
    [asianStoreId, asianStoreMenuIds],
    [mexicanStoreId, mexicanStoreMenuIds],
  ]

  const menuMap: Record<string, string> = {}

  for (const [_, menuIds] of storeAndMenus) {
    console.log(menuIds)
    for (const menuId of menuIds) {
      console.log(menuId, menuId.toString())
      const menuQuery = await Menu.findById(menuId)
      console.log(menuId, menuQuery)
      const menuName = menuQuery?.name ?? ''
      console.log(menuId.toString(), menuName)
      menuMap[menuId.toString()] = menuName
    }
  }

  console.log(menuMap)

  const getRandomElement = <T>(arr: T[]) =>
    arr[Math.floor(Math.random() * arr.length)]

  const getRandomNumberOfElements = <T>(arr: T[]) => {
    const num = Math.floor(Math.random() * arr.length)
    return [
      ...new Set(
        Array(num)
          .fill(1)
          .map(() => arr[Math.floor(Math.random() * arr.length)])
      ),
    ]
  }

  const reviews = Array(1000)
    .fill(1)
    .map(() => {
      const userId = getRandomElement(userIds)
      const [storeId, menuIds] = getRandomElement(storeAndMenus)
      const menus = getRandomNumberOfElements(menuIds).map(
        (menuId: Types.ObjectId) => {
          const likeProbability = Math.random()

          const like = likeProbability > 0.5
          const dislike = likeProbability < 0.2

          return {
            _id: menuId,
            name: menuMap[menuId.toString()],
            like,
            dislike,
          }
        }
      )

      return {
        user: userId,
        store: storeId,
        menus,
        rating: Math.floor(Math.random() * 5) + 1,
        review: faker.lorem.paragraph(),
        image: faker.image.food(),
        createdAt: faker.date.past(3).toISOString(),
      }
    })

  await Review.insertMany(reviews)

  console.log('Created Random Reviews')

  await mongoose.disconnect()
  console.log('Disconnected From MongoDB')
})()
