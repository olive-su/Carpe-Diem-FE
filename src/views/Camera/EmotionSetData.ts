export default (data: any): any[] => {
    if (data === 0)
        return [
            {
                name: 'neutral',
                uv: 0,
            },
            {
                name: 'Happy',
                uv: 0,
            },
            {
                name: 'Sad',
                uv: 0,
            },
            {
                name: 'Surprised',
                uv: 0,
            },
            {
                name: 'disgusted',
                uv: 0,
            },
            {
                name: 'angry',
                uv: 0,
            },
            {
                name: 'fearful',
                uv: 0,
            },
        ];
    else
        return [
            {
                name: 'neutral',
                uv: data.neutral,
            },
            {
                name: 'Happy',
                uv: data.happy,
            },
            {
                name: 'Sad',
                uv: data.sad,
            },
            {
                name: 'Surprised',
                uv: data.surprised,
            },
            {
                name: 'disgusted',
                uv: data.disgusted,
            },
            {
                name: 'angry',
                uv: data.angry,
            },
            {
                name: 'fearful',
                uv: data.fearful,
            },
        ];
};
