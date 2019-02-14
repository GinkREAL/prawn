export class Comment {
    comment: string;
    address: string;
    created_utc: string;
    distinguished: string;
    edited: Object;
    comment_id: string;
    score: number;
    stickied: boolean;
    author_fullame: string;
    author: string;
    replies: Comment[];
    targets: string[];
}