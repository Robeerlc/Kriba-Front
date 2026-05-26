export interface SubscriptionItem {
    externalSourceId: string;
    sourceName: string;
}

export interface SubscriptionResponse {
    subscriptions: SubscriptionItem[];
}