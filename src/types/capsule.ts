export interface Capsule {
  _id: string;
  title: string;
  content?: string;
  theme?: string;
  unlockDate: string;
  isUnlocked: boolean;

  createdBy: string;          
  collaborators: string[];    

  media?: {
    url: string;
    type: "image" | "video" | "audio";
  }[];

  reactions?: {
    hearts?: string[]; 
  };
  summary?: string;   
  caption?: string;   
}
