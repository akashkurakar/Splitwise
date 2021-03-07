import storage from 'redux-persist/lib/storage';
export default function userGroups(state = [], action) {
    switch (action.type) {
      case 'USER_GROUPS_SUCCESS':
        return Object.assign(state,action.payload );
        case 'USER_GROUP_UPDATE':
          return Object.assign([state], [...action.payload ]);
          case 'LOGOUT_USER':
            storage.removeItem('persist:root');
            return state=[];
      default:
        return state;
    }
  }