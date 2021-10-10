export const enum CardVisibility {
    opened = "opened",
    closed = "closed",
    hidden = "hidden"
}

export const enum CardState {
    unsolved = "unsolved",
    nomatch = "nomatch",
    success = "success"
}

export interface Card {
    pairId: number;
    name: string;
    filename: string;
    version: string;
    animate: string;
    state: CardState;
    visibility: CardVisibility;
}
