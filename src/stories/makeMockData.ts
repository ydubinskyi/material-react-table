import { faker } from "@faker-js/faker";

const createRandomUser = () => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  username: faker.internet.userName(),
  phone: faker.phone.number('+48 ### ### ###'),
  email: faker.internet.email(),
  carModel: faker.vehicle.vehicle(),
  city: faker.address.cityName(),
  address: faker.address.streetAddress(),
  favoriteColor: faker.color.human(),
  birthDate: faker.date.birthdate(),
  registeredAt: faker.date.past(),
  lastUpdateddAt: faker.date.past(),
});

export type MockUser = ReturnType<typeof createRandomUser>;

export const makeData = (length: number = 500): MockUser[] => {
  const fakeUsers: MockUser[] = [];
  Array.from({ length: length }).forEach(() => {
    fakeUsers.push(createRandomUser());
  });

  return fakeUsers;
};
