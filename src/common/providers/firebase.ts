import serviceAccount from '../../../serviceAccountKey.json';
import { Firestore } from '@google-cloud/firestore';

export class FireBase {
  // * Conexão com o FireBase
  public static database() {
    const firestore = new Firestore({
      credentials: serviceAccount,
      projectId: ''
    });

    return firestore;
  }
}
