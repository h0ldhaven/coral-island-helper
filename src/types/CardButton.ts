export type CardButton = {
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
    isFirst: boolean;
    isLast: boolean;
};