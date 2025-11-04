export type EventData = {
  title: string;
  subtitle: string;
  address: string;
  city: string;
  date: string;
  media: string;
  talks?: Talk[] | string;
};

export type Talk = {
  title: string;
  name: string;
};
