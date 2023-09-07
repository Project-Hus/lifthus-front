// make commentapi interface function
export interface RelationApi {
  getUserFollowing: ({ uid }: { uid: string }) => Promise<string[]>;
  getUserFollowers: ({ uid }: { uid: string }) => Promise<string[]>;
  followUser: ({ uid }: { uid: string }) => Promise<string[]>;
  unfollowUser: ({ uid }: { uid: string }) => Promise<string[]>;
}
