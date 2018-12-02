export class Comment {
    comment: string;
    created_utc: string;
    distinguished: string;
    edited: Object;
    comment_id: string;
    score: number;
    stickied: boolean;
    author_fullame: string;
    author: string;
    replies: Comment[];
}