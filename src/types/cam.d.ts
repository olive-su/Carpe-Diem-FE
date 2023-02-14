declare interface RecordInfo {
    userId: string;
    maxValue: number;
    label: string;
    count: number;
    startTime: number;
    maxTime: number;
}

declare interface Expression {
    value: number;
    label: string;
    target: string;
    time: number;
}

export { RecordInfo, Expression };
