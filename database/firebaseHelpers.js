import firebaseInstance from '../config/firebase';

export async function readCollection(coll) {
    return await firebaseInstance.firestore().collection(coll);
}; 

export async function readDocument(coll, doc) {
    return await firebaseInstance.firestore().collection(coll).doc(doc);
};

