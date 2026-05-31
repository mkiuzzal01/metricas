import { getProfileInfo } from "@/actions/quires/profile.api";

export default async function page() {
  const res = await getProfileInfo();
  console.log(res);
  return (
    <div>
      <h1>Profile</h1>
      <p>Manage your profile information.</p>
    </div>
  );
}
