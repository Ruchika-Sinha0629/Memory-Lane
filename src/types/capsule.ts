export interface Capsule {
  _id: string;
  title: string;
  content?: string;
  theme?: string;
  unlockDate: string;
  isUnlocked: boolean;
  reactions?: Record<string, number>;
  createdBy?: string;
}
