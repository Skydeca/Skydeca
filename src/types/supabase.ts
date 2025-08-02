export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          // add more fields as needed
        };
        Insert: {
          id?: string;
          email: string;
        };
        Update: {
          email?: string;
        };
      };
      // add your other tables here if needed
    };
  };
}
