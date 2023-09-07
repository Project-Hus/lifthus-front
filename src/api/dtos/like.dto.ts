export class LikeDto {
  constructor(
    public liker: bigint,
    public target: bigint,
    public liked: boolean
  ) {}
}
