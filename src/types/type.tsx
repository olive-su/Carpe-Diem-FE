export interface cardData {
    albumId: number;
    cardId: number;
    comment: string;
    createdAt: string;
    expressionLabel: string;
    thumbnailUrl: string;
    updatedAt: string;
    userId: string;
    videoUrl: string;
}

export interface albumData {
    albumId: number;
    cardId: cardData[];
    createdAt: string;
    coverImgUrl: string;
    updatedAt: string;
    userId: string;
    title: string;
}

export interface Notification {
    id: string;
    message: string;
}
