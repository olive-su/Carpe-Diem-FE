export default (data: any): any[] => {
    if (data === 0)
        return [
            {
                name: 'Emotion',
                neutral: 0,
                happy: 0,
                sad: 0,
                surprised: 0,
                disgusted: 0,
                angry: 0,
                fearful: 0,
            },
        ];
    else
        return [
            {
                name: 'Emotion',
                neutral: data.neutral,
                happy: data.happy,
                sad: data.sad,
                surprised: data.surprised,
                disgusted: data.disgusted,
                angry: data.angry,
                fearful: data.fearful,
            },
        ];
};
