yarn install
yarn prisma generate
yarn prisma migrate dev --name 'create migration'
yarn build
yarn start