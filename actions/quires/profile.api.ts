import { api } from "../TApi";

export const getProfileInfo = () =>
  api.get<any>(`/profile-info`, {
    tags: ["profile-info"],
    revalidate: 60,
  });
