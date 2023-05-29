// make commentapi interface function
export interface RelationApi {
  getUserFollowing: ({ uid }: { uid: number }) => Promise<number[]>;
  getUserFollowers: ({ uid }: { uid: number }) => Promise<number[]>;
  followUser: ({ uid }: { uid: number }) => Promise<number[]>;
  unfollowUser: ({ uid }: { uid: number }) => Promise<number[]>;
}
