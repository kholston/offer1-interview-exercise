import "dotenv/config";
import mongoose from "mongoose";
import Address from "../models/address";
import Agent from "../models/agent";
import Company from "../models/company";
import Home from "../models/home";
import Item from "../models/item";
import Owner from "../models/owner";
import Property from "../models/property";
import user from "../models/user";
import User from "../models/user";

const initalAddresses = [
  {
    addressLine1: "1234 7 St",
    addressLine2: null,
    city: "San Diego",
    state: "California",
    zip: "92103",
  },
  {
    addressLine1: "500 1st St",
    addressLine2: null,
    city: "Chula Vista",
    state: "California",
    zip: "91910",
  },
  {
    addressLine1: "503 1st St",
    addressLine2: null,
    city: "Chula Vista",
    state: "California",
    zip: "91910",
  },
  {
    addressLine1: "555 Highland Ave",
    addressLine2: null,
    city: "National City",
    state: "California",
    zip: "91950",
  },
  {
    addressLine1: "123 E St",
    addressLine2: null,
    city: "Chula Vista",
    state: "California",
    zip: "91910",
  },
];

const initalUsers = [
  {
    firstName: "Lokesh",
    lastName: "Gupta",
    email: "abc@gmail.com",
    phone: null,
    status: "Active",
  },
  {
    firstName: "Deja",
    lastName: "Vu",
    email: "xyz@email.com",
    phone: null,
    status: "Active",
  },
  {
    firstName: "Captain",
    lastName: "America",
    email: "cap@marvel.com",
    phone: null,
    status: "Active",
  },
  {
    firstName: "Tony",
    lastName: "Stark",
    email: "tony@marvel.com",
    phone: null,
    status: "Pending",
  },
];

const initialAgents = [
  {
    licenseNumber: "123456789",
    licenseState: "California",
    status: "Active",
  },
];

const initalCompanies = [
  {
    name: "Escrow America",
    phone: null,
    email: null,
    officerName: "John Doe",
    type: "Escrow",
  },
  {
    name: "First American Title",
    phone: null,
    email: null,
    officerName: "George Washington",
    type: "Title",
  },
];

const initalItems = [
  {
    name: "dishwasher",
    listing: null,
  },
  {
    name: "dryer",
    listing: null,
  },
  {
    name: "washer",
    listing: null,
  },
];

const initalProperties = [
  {
    propertyType: "SingleFamilyHome",
    squareFeet: 2000,
    numberBedrooms: 4,
    numberBaths: 3,
    description: "Beautiful country home",
    ownerType: "Individual",
    primaryImageUrl:
      "https://dhp.dreeshomes.com/cms/images/EYrud-a6KJ-Ayt63GXIVxF",
  },
  {
    propertyType: "SingleFamilyHome",
    squareFeet: 1200,
    numberBedrooms: 3,
    numberBaths: 2,
    description: "Beautiful city home",
    ownerType: "Individual",
    primaryImageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTGeBf46BD6I3jGBo-tI613n2l5QI6RFPUhjw&usqp=CAU",
  },
  {
    propertyType: "SingleFamilyHome",
    squareFeet: 3500,
    numberBedrooms: 6,
    numberBaths: 5,
    description: "Big home with great views",
    ownerType: "Individual",
    primaryImageUrl:
      "https://dhp.dreeshomes.com/cms/images/EYrud-a6KJ-Ayt63GXIVxF",
  },
];

export const initialHomes = [
  {
    state: "Pending",
    price: 649999,
  },
  {
    state: "Active",
    price: 520000,
  },
  {
    state: "PreSale",
    price: 1250000,
  },
];

export async function clearDb() {
  await Address.deleteMany({});
  await Agent.deleteMany({});
  await Company.deleteMany({});
  await Address.deleteMany({});
  await Owner.deleteMany({});
  await Property.deleteMany({});
  await Item.deleteMany({});
  await Home.deleteMany({});
}

async function createItems() {
  return await Item.insertMany(initalItems);
}

async function createAddresses() {
  return await Address.insertMany(initalAddresses);
}

async function createUsers() {
  return await User.insertMany(initalUsers);
}

async function createOwners() {
  const users = await User.find({});
  const owners = [
    { user: users[0]._id },
    { user: users[1]._id },
    { user: users[2]._id },
  ];
  return await Owner.insertMany(owners);
}

async function createProperties(addresses, owners) {
  const properties = [
    {
      ...initalProperties[0],
      address: addresses[0]._id,
      primaryOwner: owners[0]._id,
    },
    {
      ...initalProperties[1],
      address: addresses[3]._id,
      primaryOwner: owners[1]._id,
    },
    {
      ...initalProperties[2],
      address: addresses[4]._id,
      primaryOwner: owners[2]._id,
    },
  ];
  return await Property.insertMany(properties);
}

async function createCompanies(addresses) {
  const companies = [
    {
      ...initalCompanies[0],
      address: addresses[1]._id,
    },
    {
      ...initalCompanies[1],
      address: addresses[2]._id,
    },
  ];
  return await Company.insertMany(companies);
}

async function createAgents(users) {
  const agents = [
    {
      ...initialAgents[0],
      user: users[1]._id,
    },
  ];
  return await Agent.insertMany(agents);
}

async function createHomes(properties, companies, agents, items) {
  const homes = [
    {
      ...initialHomes[0],
      property: properties[0]._id,
      escrowCompany: companies[0]._id,
      titleCompany: companies[1]._id,
      listingAgent: agents[0]._id,
      includedItems: [items[0]._id],
    },
    {
      ...initialHomes[1],
      property: properties[1]._id,
      escrowCompany: companies[0]._id,
      titleCompany: companies[1]._id,
      listingAgent: agents[0]._id,
      includedItems: [items[1]._id],
      excludedItems: [items[2]._id],
    },
    {
      ...initialHomes[2],
      property: properties[2]._id,
      escrowCompany: companies[0]._id,
      titleCompany: companies[1]._id,
      listingAgent: agents[0]._id,
    },
  ];

  return await Home.insertMany(homes);
}

export async function nonExistingId() {
  const item = new Item({
    name: "remove",
    listing: null,
  });
  await item.save();
  await item.remove();
  return item._id.toString();
}

export async function seedDB() {
  try {
    const items = await createItems();
    const addresses = await createAddresses();
    const users = await createUsers();
    const owners = await createOwners(users);
    const agents = await createAgents(users);
    const companies = await createCompanies(addresses);
    const properties = await createProperties(addresses, owners);
    await createHomes(properties, companies, agents, items);
  } catch (err) {
    console.log(err);
  }
}

export async function testSeed() {
  try {
    await mongoose
      .connect(process.env.MONGODB_TEST_URI)
      .catch((err) => console.log(err));
    await seedDB().catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
}
export async function mainSeed() {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .catch((err) => console.log(err));
    await seedDB()
      .then(async () => {
        await mongoose.connection.close();
        console.log("closed");
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
}

export async function homesInDb() {
  const homes = await Home.find({})
    .populate({
      path: "property",
      populate: [
        {
          path: "address",
        },
        { path: "primaryOwner", populate: { path: "user" } },
      ],
    })
    .populate({
      path: "escrowCompany",
      populate: {
        path: "address",
      },
    })
    .populate({
      path: "titleCompany",
      populate: {
        path: "address",
      },
    })
    .populate({ path: "listingAgent", populate: { path: "user" } })
    .populate("includedItems")
    .populate("excludedItems")
    .exec();
  return homes.map((h) => h.toJSON());
}
