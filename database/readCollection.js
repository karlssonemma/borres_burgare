import firebaseInstance from '../config/firebase';

function readCollection({ collectionName }) {
    const collection = firebaseInstance.firestore().collection(collectionName);
    return collection;
};

export default readCollection;