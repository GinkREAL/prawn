export class Article {
    id: string;
    subreddit: string;
    name: string;
    title: string;
    upvotes: number;
    downvotes: number;
    score: number;
    locked: boolean;
    num_comments: number;
    url: string;
    last_modified: Date;
    article_id: string;
    archived: boolean;
    author_fullname: string;
    author: string;
    comments: Comment[];
}