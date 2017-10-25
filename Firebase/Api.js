import Firebase from './Firebase';

console.ignoredYellowBox = ['It is used to ignore yellow box in Android'];

const alignChannelName = channel => (channel || 'default').toLowerCase();
/**
 * Save a message
 */
export const save = ({
  channel,
  sender = 'anonymous',
  message = null,
  avatar = null,
}) => {
  console.log('send message: ', message);  
  if (message === '') {
    return Promise.resolve();
  }
  if (message === null) {
    throw new Error('A message body is required');
  }
  const timestamp = new Date().toISOString();
  return Firebase.database()
    .ref(alignChannelName(channel))
    .push({sender, message, avatar, timestamp});
};

/**
 * Subscribe to the message updates
 */

let currentQuery;
let currentCallback;

export const subscribe = (channel, callback, maxMessages = 100) => {
  if (!channel) {
    throw new Error('Channel name required!');
  }

  if (!callback) {
    throw new Error('Subscription callback required!');
  }

  // only allow a single subscription at once a time,
  // unsubscribe from previous channels
  if (currentQuery && currentCallback) {
    currentQuery.off('value', currentCallback);
    currentQuery = null;
    currentCallback = null;
  }

  currentQuery = Firebase.database()
    .ref(alignChannelName(channel))
    .limitToLast(maxMessages);
  currentCallback = callback;

  currentQuery.on('value', snapshot => {
    const data = snapshot.val();
    console.log('data: ', data);
    const messages = [];
    for (const key in data) {
      const {sender, message, avatar, timestamp} = data[key];
      messages.push({
        key,
        sender,
        message,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        avatar: avatar || 'http://www.spacex.com/sites/spacex/files/crs-3_patch.png',
      });
    }
    
    callback(messages);
  });
};