import jwt from 'jsonwebtoken';
import store from 'store'

// Util function to decode the token
  export const decoder = (customToken) => {
    const token = store.get('pp-token');
    const payload = jwt.decode(token || customToken);

    return payload;
  };
