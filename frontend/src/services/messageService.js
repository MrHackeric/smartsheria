// messageService.js

import { db } from '../../src/utils/firebase-config'; // Import Firebase config
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// Fetch messages from Firestore
export const fetchMessages = async (setMessages) => {
  try {
    const messagesQuery = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const querySnapshot = await getDocs(messagesQuery);
    const fetchedMessages = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setMessages(fetchedMessages); // Set messages state with fetched messages
  } catch (error) {
    console.error('Error fetching messages: ', error);
  }
};

// Send a new message to Firestore
export const sendMessage = async (message) => {
  try {
    const docRef = await addDoc(collection(db, 'messages'), message);
    console.log('Message sent with ID: ', docRef.id);
  } catch (error) {
    console.error('Error sending message: ', error);
  }
};
