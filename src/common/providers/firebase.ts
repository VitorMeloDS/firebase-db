import 'dotenv/config';
import { Firestore } from '@google-cloud/firestore';

export class FireBase {
  // * Conexão com o FireBase
  public static database() {
    const firestore = new Firestore({
      credentials: {
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY
      },
      projectId: process.env.FIREBASE_PROJECT_ID
    });

    return firestore;
  }
}
