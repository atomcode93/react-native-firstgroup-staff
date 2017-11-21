const path = require('path');

module.exports = {
  bundleId: 'com.firstgroup.firstgroupstaff',
  displayName: 'First Student Connect',
  developmentTeam: '9BD6VT39FR',
  appleId: 'iphone@utrack.com',
  itcTeamName: 'Firstgroup America Inc',
  itcProvider: '9BD6VT39FR',
  codeSigningIdentity: 'iPhone Distribution: Firstgroup America Inc (9BD6VT39FR)',
  provisioningProfile: path.resolve('config', 'provisioning_profiles', 'FirstGroup_Staff_AppStore.mobileprovision'),
  version: {
    stage: ''
  },
  oneSignal: {
    appId: '1e8ffa37-78e0-4976-98da-b8d29fa4289a',
    googleProjectNumber: '1080448450900'
  },
  match: {
    gitBranch: 'utrack'
  },
  google: {
    iosClientId: '1080448450900-2tnqdmq5om6p40oi44l0ghv28hlorlh7.apps.googleusercontent.com',
    reversedClientId: 'com.googleusercontent.apps.1080448450900-2tnqdmq5om6p40oi44l0ghv28hlorlh7',
    webClientId: '1080448450900-14spp8617kq47f8dc42bkt3altb4jmh6.apps.googleusercontent.com'
  },
  api: {
    baseUrl: 'https://www.firststudentconnect.com/api/v1'
  },
  app: {
    links: {
      newsfeedUrl: 'https://www.firststudentconnect.com/api/v1/newsfeed',
      perkspotUrl: 'https://firstgroup.perkspot.com/login',
      adpUrl: 'https://www.firststudentconnect.com/adp.html',
      wellsfargoUrl: 'https://www.firststudentconnect.com/api/v1/newsfeed'
    }
  }
};
