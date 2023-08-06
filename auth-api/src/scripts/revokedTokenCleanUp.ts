import "reflect-metadata";
import { myDataSource } from "../../app-data-source";
import { RevokedToken } from "../models/revoked-token";
const revokedTokenRepo = myDataSource.getRepository(RevokedToken);

import { User } from "../models/user";
const userRepo = myDataSource.getRepository(User);


(async function() {
  console.log('begin revoked token table clean up...');
  
  await myDataSource
  .initialize()
  .then(() => {
    console.log('data source initialized in token clean up funciton');
  })
  .catch((err) => {
    console.error('error initializing data source:', err);
  });

  console.log(myDataSource.isInitialized);
  const revokedTokens = await revokedTokenRepo.find();

  for ( let revokedToken of revokedTokens ) {
    if (revokedToken.expiresAt < new Date) {
      console.log(revokedToken.expiresAt);
      await revokedTokenRepo.delete(revokedToken.revokedTokenId);
    }
  }

  await myDataSource
  .destroy()
  .then(() => {
    console.log('database connection closed')
  })
  .catch((err => {
    console.log('error closing database connection')
  }));
  console.log('finialize revoked token table clean up');
})();

