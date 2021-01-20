export interface SquirtMove {
    id: number;
    name: string;
    direction: string;
}

export interface SquirtBonus {
    id: number;
    name: string;
}

export interface MoveProps {
    key: number;
    move: SquirtMove
}
export interface BonusProps {
    key: number;
    bonus: SquirtBonus
}
